import React, { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Art, Avatar, BiometricModal, Button, Card, Checkbox, Field, Label, OptionModal, OtpRow, Screen, Select, SuccessBlock, T,
} from '../components/ui';
import { art, avatars, banks, branches, quickBeneficiaries, words } from '../data';
import { colors, fonts, shadow } from '../theme';
import { useNav } from '../navigation/useNav';
import type { RootProps } from '../navigation/types';
import { BeneType, TypeChips } from './beneficiary';

const SOURCES = ['VISA **** **** **** 1234', 'Account 1234 5678 5689'];

/* Horizontal row: [+] Emma Justin (shared by Transfer + Mobile prepaid) */
export function BeneficiaryStrip({
  selected,
  onSelect,
  label = 'Choose beneficiary',
}: {
  selected?: string;
  onSelect: (b: (typeof quickBeneficiaries)[number]) => void;
  label?: string;
}) {
  const nav = useNav();
  return (
    <View style={{ marginTop: 18 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Label>{label}</Label>
        <Pressable onPress={() => nav.navigate('Beneficiary')}>
          <T style={{ fontSize: 11, color: colors.primary, fontFamily: fonts.medium }}>Find beneficiary</T>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingVertical: 6, paddingRight: 6 }}>
        <Pressable onPress={() => nav.navigate('AddBeneficiary')} style={[{ width: 100, height: 100, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }, shadow]}>
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: colors.tint, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="add" size={30} color="#fff" />
          </View>
        </Pressable>
        {quickBeneficiaries.map((b) => {
          const on = selected === b.id;
          return (
            <Pressable key={b.id} onPress={() => onSelect(b)} style={[{ width: 100, height: 100, borderRadius: 12, backgroundColor: on ? colors.primary : '#fff', alignItems: 'center', justifyContent: 'center' }, shadow]}>
              <Avatar source={avatars[b.avatar]} size={60} />
              <T style={{ fontSize: 12, marginTop: 6, color: on ? '#fff' : colors.text, fontFamily: fonts.medium }}>{b.name}</T>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

/* ─────────── Transfer ─────────── */
export function TransferScreen() {
  const nav = useNav();
  const [source, setSource] = useState('');
  const [type, setType] = useState<BeneType>('card');
  const [bene, setBene] = useState<string | undefined>();
  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [amount, setAmount] = useState('');
  const [content, setContent] = useState('');
  const [save, setSave] = useState(false);
  const [pick, setPick] = useState<null | 'src' | 'bank' | 'branch'>(null);

  const ready = source && name && card && amount && (type !== 'other' || (bank && branch));
  return (
    <Screen title="Transfer">
      <Select
        placeholder="Choose account / card"
        value={source}
        onPress={() => setPick('src')}
        icon="swap-vertical"
        hint={source ? 'Available balance : 10,000$' : undefined}
        wrapStyle={{ marginBottom: 4 }}
      />
      <Label style={{ marginTop: 10 }}>Choose transaction</Label>
      <TypeChips value={type} onChange={setType} />
      <BeneficiaryStrip
        selected={bene}
        onSelect={(b) => {
          setBene(b.id);
          setName(b.name === 'Emma' ? 'Emma' : 'Justin Biber');
          setCard(b.number);
        }}
      />
      <Card style={{ marginTop: 14 }}>
        {type === 'other' ? (
          <>
            <Select placeholder="Choose bank" value={bank} onPress={() => setPick('bank')} />
            <Select placeholder="Choose branch" value={branch} onPress={() => setPick('branch')} />
          </>
        ) : null}
        <Field placeholder="Name" value={name} onChangeText={setName} />
        <Field placeholder="Card number" value={card} onChangeText={setCard} keyboardType="number-pad" />
        <Field
          placeholder="Amount"
          value={amount}
          onChangeText={(t) => setAmount(t.replace(/[^0-9.]/g, ''))}
          keyboardType="decimal-pad"
          hint={amount ? words(parseFloat(amount)) : undefined}
        />
        <Field placeholder={type === 'other' ? 'Note' : 'Content'} value={content} onChangeText={setContent} />
        <Checkbox checked={save} onChange={setSave} label="Save to directory of beneficiary" />
        <Button
          title="Confirm"
          disabled={!ready}
          onPress={() => nav.navigate('TransferConfirm', { to: name, cardNumber: card, amount, content, bank: type === 'other' ? bank : undefined })}
        />
      </Card>
      <OptionModal visible={pick === 'src'} title="Choose account / card" options={SOURCES} selected={source} onSelect={setSource} onClose={() => setPick(null)} />
      <OptionModal visible={pick === 'bank'} title="Choose beneficiary bank" options={banks} selected={bank} onSelect={setBank} onClose={() => setPick(null)} searchable />
      <OptionModal visible={pick === 'branch'} title="Choose branch" options={branches} selected={branch} onSelect={setBranch} onClose={() => setPick(null)} />
    </Screen>
  );
}

/* ─────────── Transfer confirm ─────────── */
export function TransferConfirmScreen({ route }: RootProps<'TransferConfirm'>) {
  const nav = useNav();
  const p = route.params ?? { to: 'Amanda', cardNumber: '0123456789', amount: '1000', content: 'From Jimy' };
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  const [bio, setBio] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const verified = otp.length >= 4 || bio;
  return (
    <Screen title="Confirm">
      <Label>Confirm transaction information</Label>
      <Field label="From" value="**** **** 6789" readOnlyField />
      <Field label="To" value={p.to} readOnlyField />
      {p.bank ? <Field label="Beneficiary bank" value={p.bank} readOnlyField /> : null}
      <Field label="Card number" value={p.cardNumber} readOnlyField />
      <Field label="Transaction fee" value="10$" readOnlyField />
      <Field label="Content" value={p.content || '—'} readOnlyField />
      <Field label="Amount" value={`$${p.amount}`} readOnlyField />
      <OtpRow value={otp} onChange={setOtp} onGetOtp={() => setSent(true)} otpSent={sent} />
      <Pressable onPress={() => setShowBio(true)} style={{ alignSelf: 'center', marginVertical: 10 }}>
        <Image source={art.fingerprint} style={{ width: 54, height: 54, opacity: bio ? 1 : 0.35 }} />
      </Pressable>
      <Button title="Confirm" disabled={!verified} onPress={() => nav.replace('TransferSuccess', { to: p.to, amount: p.amount })} style={{ marginTop: 10 }} />
      <BiometricModal visible={showBio} onCancel={() => setShowBio(false)} onSuccess={() => { setBio(true); setShowBio(false); }} />
    </Screen>
  );
}

/* ─────────── Transfer success ─────────── */
export function TransferSuccessScreen({ route }: RootProps<'TransferSuccess'>) {
  const nav = useNav();
  return (
    <Screen title="Confirm">
      <SuccessBlock
        art={art.wallet}
        title="Transfer successful!"
        lines={
          <>
            You have successfully transferred{'\n'}
            <T style={{ color: colors.red, fontFamily: fonts.medium, fontSize: 13 }}>${route.params?.amount ?? '1,000'}</T> to{' '}
            <T style={{ color: colors.primary, fontFamily: fonts.medium, fontSize: 13 }}>{route.params?.to ?? 'Amanda'}</T>!
          </>
        }
        button="Confirm"
        onPress={() => nav.reset({ index: 0, routes: [{ name: 'Tabs' }] })}
      />
    </Screen>
  );
}

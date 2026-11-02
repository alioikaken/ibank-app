import React, { useState } from 'react';
import { Image, Pressable } from 'react-native';
import { BiometricModal, Button, Field, Label, OptionModal, Screen, Select, SuccessBlock } from '../components/ui';
import { art } from '../data';
import { useNav } from '../navigation/useNav';
import type { RootProps } from '../navigation/types';
import { BeneficiaryStrip } from './transfer';
import { AmountGrid } from './withdraw';

const SOURCES = ['VISA **** **** **** 1234', 'Account 1234 5678 5689'];

export function MobilePrepaidScreen() {
  const nav = useNav();
  const [src, setSrc] = useState('');
  const [open, setOpen] = useState(false);
  const [bene, setBene] = useState<string | undefined>();
  const [phone, setPhone] = useState('');
  const [amt, setAmt] = useState('');
  return (
    <Screen title="Mobile prepaid">
      <Select label="Choose account/ card" placeholder="Choose account / card" value={src} onPress={() => setOpen(true)} hint={src ? 'Available balance : 10,000$' : undefined} />
      <BeneficiaryStrip
        label="Directory"
        selected={bene}
        onSelect={(b) => {
          setBene(b.id);
          setPhone(b.phone);
        }}
      />
      <Field label="Phone number" placeholder="Phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" wrapStyle={{ marginTop: 14 }} />
      <Label>Choose amount</Label>
      <AmountGrid options={['$10', '$20', '$30']} value={amt} onChange={setAmt} />
      <Button
        title="Confirm"
        disabled={!src || phone.length < 6 || !amt}
        onPress={() => nav.navigate('MobilePrepaidConfirm', { phone, amount: amt.replace('$', '') })}
        style={{ marginTop: 30 }}
      />
      <OptionModal visible={open} title="Choose account / card" options={SOURCES} selected={src} onSelect={setSrc} onClose={() => setOpen(false)} />
    </Screen>
  );
}

export function MobilePrepaidConfirmScreen({ route }: RootProps<'MobilePrepaidConfirm'>) {
  const nav = useNav();
  const [bio, setBio] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <Screen title="Confirm">
      <Label>Confirm transaction information</Label>
      <Field label="From" value="**** **** 6789" readOnlyField />
      <Field label="To" value={route.params?.phone ?? '+8564757899'} readOnlyField />
      <Field label="Amount" value={`$${route.params?.amount ?? '1000'}`} readOnlyField />
      <Label style={{ marginTop: 4 }}>Use Touch ID to verify transaction</Label>
      <Pressable onPress={() => setShow(true)} style={{ alignSelf: 'center', marginVertical: 16 }}>
        <Image source={art.fingerprint} style={{ width: 54, height: 54, opacity: bio ? 1 : 0.5 }} />
      </Pressable>
      <Button title="Confirm" disabled={!bio} onPress={() => nav.replace('MobilePrepaidSuccess')} style={{ marginTop: 160 }} />
      <BiometricModal visible={show} onCancel={() => setShow(false)} onSuccess={() => { setBio(true); setShow(false); }} />
    </Screen>
  );
}

export function MobilePrepaidSuccessScreen() {
  const nav = useNav();
  return (
    <Screen title="" back={false}>
      <SuccessBlock
        art={art.success}
        title="Payment success!"
        lines="You have successfully paid mobile prepaid!"
        button="Confirm"
        onPress={() => nav.reset({ index: 0, routes: [{ name: 'Tabs' }] })}
      />
    </Screen>
  );
}

import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Art, Button, Field, Label, OptionModal, Screen, Select, SuccessBlock, T } from '../components/ui';
import { accountNumbers, art } from '../data';
import { colors, fonts, shadow } from '../theme';
import { useNav } from '../navigation/useNav';

export function AmountGrid({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
      {options.map((o) => {
        const on = o === value;
        return (
          <Pressable
            key={o}
            onPress={() => onChange(o)}
            style={[{ width: '31%', height: 56, borderRadius: 10, backgroundColor: on ? colors.primary : '#fff', alignItems: 'center', justifyContent: 'center' }, shadow]}
          >
            <T style={{ color: on ? '#fff' : colors.grey, fontFamily: fonts.medium, fontSize: 14 }}>{o}</T>
          </Pressable>
        );
      })}
    </View>
  );
}

export function WithdrawScreen() {
  const nav = useNav();
  const [acc, setAcc] = useState('');
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [amt, setAmt] = useState('');
  const [custom, setCustom] = useState('');
  const amount = amt === 'Other' ? custom : amt.replace('$', '');
  const ready = acc && phone.length >= 6 && amount;
  return (
    <Screen title="Withdraw">
      <Art source={art.wallet} style={{ marginBottom: 20 }} />
      <Select placeholder="Choose account/ card" value={acc} onPress={() => setOpen(true)} hint={acc ? 'Available balance : 10,000$' : undefined} />
      <Field placeholder="Phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Label style={{ marginTop: 4 }}>Choose amount</Label>
      <AmountGrid options={['$10', '$50', '$100', '$150', '$200', 'Other']} value={amt} onChange={setAmt} />
      {amt === 'Other' ? <Field placeholder="Amount" value={custom} onChangeText={setCustom} keyboardType="decimal-pad" wrapStyle={{ marginTop: 14 }} /> : null}
      <Button title="Verify" disabled={!ready} onPress={() => nav.replace('WithdrawSuccess')} style={{ marginTop: 28 }} />
      <OptionModal visible={open} title="Choose account:" options={accountNumbers} selected={acc || '4411 0000 1234'} onSelect={setAcc} onClose={() => setOpen(false)} />
    </Screen>
  );
}

export function WithdrawSuccessScreen() {
  const nav = useNav();
  return (
    <Screen title="" back={false}>
      <SuccessBlock
        art={art.wallet}
        title="Successful withdrawal!"
        lines={'You have successfully withdrawn money!\nPlease check the balance in the card\nmanagement section.'}
        button="Confirm"
        onPress={() => nav.reset({ index: 0, routes: [{ name: 'Tabs' }] })}
      />
    </Screen>
  );
}

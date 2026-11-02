import React, { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { Art, Button, Card, Field, OptionModal, Screen, Select, SuccessBlock, T } from '../components/ui';
import { accountNumbers, art, depositTerms } from '../data';
import { colors, fonts } from '../theme';
import { useNav } from '../navigation/useNav';

export function SaveOnlineScreen() {
  const nav = useNav();
  const items = [
    { t: 'Add', s: 'Add new save online account', img: art.soAdd, go: () => nav.navigate('SaveOnlineAdd') },
    { t: 'Management', s: 'Manage your save online account', img: art.soManage, go: () => nav.navigate('AccountManagement') },
  ];
  return (
    <Screen title="Save online">
      {items.map((it) => (
        <Pressable key={it.t} onPress={it.go} style={{ marginBottom: 14 }}>
          <Card style={{ flexDirection: 'row', alignItems: 'center', height: 90, paddingVertical: 6 }}>
            <View style={{ flex: 1 }}>
              <T style={{ fontFamily: fonts.medium, fontSize: 14 }}>{it.t}</T>
              <T style={{ fontSize: 10, color: colors.grey, marginTop: 6 }}>{it.s}</T>
            </View>
            <Image source={it.img} style={{ width: 92, height: 78 }} resizeMode="contain" />
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

export function SaveOnlineAddScreen() {
  const nav = useNav();
  const [acc, setAcc] = useState('');
  const [term, setTerm] = useState('');
  const [amount, setAmount] = useState('');
  const [pick, setPick] = useState<null | 'acc' | 'term'>(null);
  const ok = acc && term && parseFloat(amount) >= 1000;
  return (
    <Screen title="Add">
      <Art source={art.piggy} style={{ marginBottom: 16 }} />
      <Card>
        <Select
          placeholder="Choose account/ card"
          value={acc ? `Account ${acc}` : ''}
          onPress={() => setPick('acc')}
          hint={acc ? 'Available balance: 10000$' : undefined}
        />
        <Select
          placeholder="Choose time deposit"
          value={term ? term.split(' (')[0] : ''}
          onPress={() => setPick('term')}
          hint={term ? `Interest rate ${term.match(/(\d+(\.\d+)?)%/)?.[1]}%/ ${term.split(' (')[0]}` : undefined}
        />
        <Field placeholder="Amount (At least $1000)" value={amount} onChangeText={(t) => setAmount(t.replace(/[^0-9.]/g, ''))} keyboardType="decimal-pad" />
        <Button title="Verify" disabled={!ok} onPress={() => nav.replace('SaveOnlineSuccess')} style={{ marginTop: 6 }} />
      </Card>
      <OptionModal visible={pick === 'acc'} title="Choose account:" options={accountNumbers} selected={acc || '4411 0000 1234'} onSelect={setAcc} onClose={() => setPick(null)} />
      <OptionModal visible={pick === 'term'} title="Choose time deposit" options={depositTerms} selected={term} onSelect={setTerm} onClose={() => setPick(null)} />
    </Screen>
  );
}

export function SaveOnlineSuccessScreen() {
  const nav = useNav();
  return (
    <Screen title="" back={false}>
      <SuccessBlock
        art={art.piggy}
        title="Save online successfully!"
        lines={'Congratulations!\nYou have save money online successfully!'}
        button="Confirm"
        onPress={() => nav.reset({ index: 0, routes: [{ name: 'Tabs' }] })}
      />
    </Screen>
  );
}

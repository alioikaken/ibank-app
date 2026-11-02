import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Button, Card, Field, OptionModal, RoundButton, Screen, Select, T } from '../components/ui';
import { avatars, banks, beneficiaryGroups, branches } from '../data';
import { colors, fonts } from '../theme';
import { useNav } from '../navigation/useNav';
import type { RootProps } from '../navigation/types';

export type BeneType = 'card' | 'same' | 'other';

/* Reusable three-way chip row (also used by Transfer) */
export function TypeChips({ value, onChange }: { value: BeneType; onChange: (v: BeneType) => void }) {
  const items: { k: BeneType; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
    { k: 'card', icon: 'card', label: 'Transfer via\ncard number' },
    { k: 'same', icon: 'person', label: 'Transfer to\nthe same bank' },
    { k: 'other', icon: 'business', label: 'Transfer to\nanother bank' },
  ];
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {items.map((it) => {
        const on = it.k === value;
        const bg = on ? (it.k === 'other' ? colors.orange : colors.primary) : colors.line;
        return (
          <Pressable key={it.k} onPress={() => onChange(it.k)} style={{ flex: 1, height: 80, borderRadius: 12, backgroundColor: bg, padding: 10, justifyContent: 'space-between' }}>
            <Ionicons name={it.icon} size={20} color="#fff" />
            <T style={{ color: '#fff', fontSize: 8.5, lineHeight: 12, fontFamily: fonts.medium }}>{it.label}</T>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ─────────── Beneficiary directory ─────────── */
export function BeneficiaryScreen() {
  const nav = useNav();
  return (
    <Screen
      title="Beneficiary"
      right={<Ionicons name="search" size={20} color={colors.grey} />}
      bg="#fff"
      contentStyle={{ paddingBottom: 100 }}
    >
      {beneficiaryGroups.map((g) => (
        <View key={g.title} style={{ marginBottom: 16 }}>
          <T style={{ fontSize: 11, color: colors.grey, marginBottom: 8 }}>{g.title}</T>
          <Card style={{ padding: 12 }}>
            {g.items.map((b, i) => (
              <Pressable
                key={b.id}
                onPress={() => nav.navigate('BeneficiaryDetail', { name: b.name, avatar: b.avatar })}
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: i < g.items.length - 1 ? 1 : 0, borderBottomColor: colors.line }}
              >
                <Avatar source={avatars[b.avatar]} size={40} />
                <View style={{ marginLeft: 12 }}>
                  <T style={{ fontFamily: fonts.medium, fontSize: 14 }}>{b.name}</T>
                  <T style={{ fontSize: 10, color: colors.grey }}>{b.number}</T>
                </View>
              </Pressable>
            ))}
          </Card>
        </View>
      ))}
      <View style={{ position: 'absolute', right: 20, bottom: 0 }} />
      <FloatingAdd onPress={() => nav.navigate('AddBeneficiary')} />
    </Screen>
  );
}

function FloatingAdd({ onPress }: { onPress: () => void }) {
  return (
    <View style={{ position: 'absolute', right: 6, bottom: 20 }}>
      <RoundButton onPress={onPress} />
    </View>
  );
}

/* ─────────── Add beneficiary ─────────── */
export function AddBeneficiaryScreen() {
  const nav = useNav();
  const [type, setType] = useState<BeneType>('other');
  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [pick, setPick] = useState<null | 'bank' | 'branch'>(null);
  const ready = name && card && (type !== 'other' || (bank && branch));
  return (
    <Screen title="Add new">
      <View style={{ alignItems: 'center', marginBottom: 14 }}>
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: colors.tint, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="person" size={52} color="#fff" />
          <View style={{ position: 'absolute', right: 4, bottom: 4, width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="add" size={16} color="#fff" />
          </View>
        </View>
        {name ? <T style={{ color: colors.primary, fontFamily: fonts.medium, marginTop: 8 }}>{name}</T> : null}
      </View>
      <TypeChips value={type} onChange={setType} />
      <Card style={{ marginTop: 18 }}>
        {type === 'other' ? (
          <>
            <Select placeholder="Choose bank" value={bank} onPress={() => setPick('bank')} icon="swap-vertical" />
            <Select placeholder="Choose branch" value={branch} onPress={() => setPick('branch')} icon="swap-vertical" />
          </>
        ) : null}
        <Field placeholder="Transaction name" value={name} onChangeText={setName} />
        <Field placeholder="Card number" value={card} onChangeText={setCard} keyboardType="number-pad" />
        <Button title="Save to directory" disabled={!ready} onPress={() => nav.goBack()} style={{ marginTop: 8 }} />
      </Card>
      <OptionModal visible={pick === 'bank'} title="Choose beneficiary bank" options={banks} selected={bank} onSelect={setBank} onClose={() => setPick(null)} searchable />
      <OptionModal visible={pick === 'branch'} title="Choose branch" options={branches} selected={branch} onSelect={setBranch} onClose={() => setPick(null)} />
    </Screen>
  );
}

/* ─────────── Beneficiary detail ─────────── */
export function BeneficiaryDetailScreen({ route }: RootProps<'BeneficiaryDetail'>) {
  const nav = useNav();
  const { name = 'Push Puttichai', avatar = 'push' } = route.params ?? {};
  const [bank, setBank] = useState('Citibank');
  const [branch, setBranch] = useState('New York');
  const [tName, setTName] = useState(name);
  const [card, setCard] = useState('1235 6478 990');
  const [pick, setPick] = useState<null | 'bank' | 'branch'>(null);
  return (
    <Screen
      title="Beneficiary"
      dark
      hero={
        <View style={{ alignItems: 'center', paddingTop: 20, marginBottom: -52 }}>
          <Avatar source={avatars[avatar as keyof typeof avatars]} size={100} />
        </View>
      }
      contentStyle={{ paddingTop: 66 }}
    >
      <T style={{ color: colors.primary, fontFamily: fonts.medium, textAlign: 'center', marginBottom: 16 }}>{name}</T>
      <Card>
        <Select label="Choose bank" placeholder="Choose bank" value={bank} onPress={() => setPick('bank')} icon="chevron-down" />
        <Select label="Choose branch" placeholder="Choose branch" value={branch} onPress={() => setPick('branch')} icon="chevron-down" />
        <Field label="Transaction name" value={tName} onChangeText={setTName} />
        <Field label="Card number" value={card} onChangeText={setCard} keyboardType="number-pad" />
        <Button title="Confirm" onPress={() => nav.navigate('Transfer')} style={{ marginTop: 14 }} />
      </Card>
      <OptionModal visible={pick === 'bank'} title="Choose beneficiary bank" options={banks} selected={bank} onSelect={setBank} onClose={() => setPick(null)} searchable />
      <OptionModal visible={pick === 'branch'} title="Choose branch" options={branches} selected={branch} onSelect={setBranch} onClose={() => setPick(null)} />
    </Screen>
  );
}

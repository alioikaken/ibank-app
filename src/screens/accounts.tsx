import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BankCard from '../components/BankCard';
import { Art, Avatar, Button, Card, Field, KV, OptionModal, OtpRow, Screen, Segment, Select, SuccessBlock, T } from '../components/ui';
import { accountNumbers, accounts, art, avatars, deposits, purchases, transactions } from '../data';
import { colors, fonts } from '../theme';
import { useNav } from '../navigation/useNav';
import type { RootProps } from '../navigation/types';

/* ─────────── Account & card ─────────── */
export function AccountCardScreen({ route }: RootProps<'AccountCard'>) {
  const nav = useNav();
  const [tab, setTab] = useState<'Account' | 'Card'>(route.params?.tab ?? 'Account');
  return (
    <Screen title="Account and card">
      <Segment items={['Account', 'Card']} value={tab} onChange={(v) => setTab(v as 'Account' | 'Card')} />
      {tab === 'Account' ? (
        <>
          <View style={{ alignItems: 'center', marginVertical: 18 }}>
            <Avatar source={avatars.pushbig} size={100} />
            <T style={{ color: colors.primary, fontFamily: fonts.medium, marginTop: 10 }}>Push Puttichai</T>
          </View>
          {accounts.map((a) => (
            <Pressable key={a.id} onPress={() => nav.navigate('AccountManagement')} style={{ marginBottom: 14 }}>
              <Card style={{ paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <T style={{ fontFamily: fonts.medium, fontSize: 14 }}>{a.name}</T>
                  <T style={{ fontFamily: fonts.medium, fontSize: 14 }}>{a.number}</T>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <T style={{ fontSize: 10, color: colors.grey }}>Avalable balance</T>
                  <T style={{ fontSize: 10, color: colors.primary, fontFamily: fonts.medium }}>{a.balance}</T>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                  <T style={{ fontSize: 10, color: colors.grey }}>Branch</T>
                  <T style={{ fontSize: 10, color: colors.primary, fontFamily: fonts.medium }}>{a.branch}</T>
                </View>
              </Card>
            </Pressable>
          ))}
        </>
      ) : (
        <>
          <BankCard variant="blue" onPress={() => nav.navigate('CardDetail')} style={{ marginTop: 18 }} />
          <BankCard variant="orange" onPress={() => nav.navigate('CardDetail')} style={{ marginTop: 18 }} />
          <Button title="Add card" onPress={() => nav.navigate('CardDetail')} style={{ marginTop: 28 }} />
        </>
      )}
    </Screen>
  );
}

/* ─────────── Account management ─────────── */
export function AccountManagementScreen() {
  return (
    <Screen title="Management">
      {deposits.map((d) => (
        <Card key={d.number} style={{ marginBottom: 14 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <T style={{ fontFamily: fonts.medium, fontSize: 14 }}>Account</T>
            <T style={{ fontFamily: fonts.medium, fontSize: 14 }}>{d.number}</T>
          </View>
          {[['From', d.from], ['To', d.to], ['Time deposit', d.time], ['Interest rate', d.rate]].map(([k, v]) => (
            <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 }}>
              <T style={{ fontSize: 10, color: colors.grey }}>{k}</T>
              <T style={{ fontSize: 10, color: colors.primary, fontFamily: fonts.medium }}>{v}</T>
            </View>
          ))}
        </Card>
      ))}
    </Screen>
  );
}

/* ─────────── Card detail ─────────── */
export function CardDetailScreen() {
  const nav = useNav();
  const rows: [string, string][] = [
    ['Name', 'Push Puttichai'],
    ['Card number', '**** **** 9018'],
    ['Valid from', '10/15'],
    ['Good thru', '10/20'],
    ['Available balance', '$10,000'],
  ];
  return (
    <Screen title="Card">
      {rows.map(([k, v]) => (
        <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.line }}>
          <T style={{ color: colors.grey, fontSize: 14 }}>{k}</T>
          <T style={{ color: colors.primary, fontFamily: fonts.medium, fontSize: 14 }}>{v}</T>
        </View>
      ))}
      <Pressable onPress={() => nav.goBack()} style={{ alignSelf: 'center', marginTop: 200 }}>
        <T style={{ color: colors.red, fontFamily: fonts.medium, fontSize: 14 }}>Delete card</T>
      </Pressable>
    </Screen>
  );
}

/* ─────────── Credit card (pay) ─────────── */
function PurchaseList({ compact }: { compact?: boolean }) {
  return (
    <Card style={{ padding: 12 }}>
      {purchases.map((p, i) => (
        <View key={p.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: colors.line }}>
          <View style={{ width: compact ? 36 : 40, height: compact ? 36 : 40, borderRadius: 10, backgroundColor: p.color, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={p.icon === 'camera' ? 'camera' : 'tv-outline'} size={18} color="#fff" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <T style={{ fontFamily: fonts.medium, fontSize: 13 }}>{p.title}</T>
            <T style={{ fontSize: 10, color: colors.grey }}>{p.date}</T>
          </View>
          <T style={{ color: colors.red, fontFamily: fonts.medium, fontSize: 13 }}>{p.amount}</T>
        </View>
      ))}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12 }}>
        <T style={{ fontFamily: fonts.semi, fontSize: 13 }}>TOTAL</T>
        <T style={{ color: colors.red, fontFamily: fonts.medium, fontSize: 22 }}>-$3100</T>
      </View>
    </Card>
  );
}

export function CreditCardScreen() {
  const nav = useNav();
  const [acc, setAcc] = useState('');
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <Screen
      title="Credit card"
      dark
      contentStyle={{ paddingTop: 30 }}
    >
      <View style={{ marginBottom: 48 }}>
        <BankCard compact />
        <View style={{ position: 'absolute', left: 20, right: 20, bottom: -8, height: 12, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: colors.red, zIndex: -2 }} />
        <View style={{ position: 'absolute', left: 34, right: 34, bottom: -16, height: 12, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: colors.primary2, zIndex: -3 }} />
      </View>
      <PurchaseList />
      <Select placeholder="Choose account/ card" value={acc} onPress={() => setOpen(true)} wrapStyle={{ marginTop: 20 }} />
      <OtpRow value={otp} onChange={setOtp} onGetOtp={() => setSent(true)} otpSent={sent} />
      <Button title="Pay" disabled={!acc || otp.length < 4} onPress={() => nav.navigate('CreditCardSuccess')} style={{ marginTop: 30 }} />
      <OptionModal visible={open} title="Choose account:" options={accountNumbers} selected={acc || '4411 0000 1234'} onSelect={setAcc} onClose={() => setOpen(false)} />
    </Screen>
  );
}

export function CreditCardSuccessScreen() {
  const nav = useNav();
  return (
    <Screen title="" onBack={() => nav.navigate('Tabs')}>
      <SuccessBlock
        art={art.success}
        title="Transaction successfully!"
        lines="You have successfully traded!"
        button="Confirm"
        onPress={() => nav.reset({ index: 0, routes: [{ name: 'Tabs' }] })}
      />
    </Screen>
  );
}

/* ─────────── Transaction report ─────────── */
export function TransactionReportScreen() {
  const bars = [
    { m: 'Jan', up: 22, down: 30 },
    { m: 'Feb', up: 50, down: 60 },
    { m: 'Mar', up: 28, down: 36 },
    { m: 'Apr', up: 74, down: 90 },
    { m: 'May', up: 16, down: 28 },
    { m: 'Jun', up: 40, down: 24 },
  ];
  const [active, setActive] = useState(3);
  return (
    <Screen
      title="Transaction report"
      dark
      hero={<View style={{ paddingTop: 20, marginBottom: -112 }}><BankCard compact /><View style={{ position: 'absolute', left: 20, right: 20, bottom: -8, height: 12, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: colors.red, zIndex: -2 }} /><View style={{ position: 'absolute', left: 34, right: 34, bottom: -16, height: 12, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: colors.primary2, zIndex: -3 }} /></View>}
      contentStyle={{ paddingTop: 162 }}
    >
      <Card style={{ marginBottom: 16 }}>
        <T style={{ fontSize: 10, fontFamily: fonts.medium }}>Balance</T>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <T style={{ fontSize: 28, fontFamily: fonts.medium, lineHeight: 36 }}>1000</T>
          <T style={{ fontSize: 8, color: colors.grey, marginLeft: 4, marginBottom: 8 }}>USD</T>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 150, alignItems: 'center', marginTop: 14 }}>
          {bars.map((b, i) => (
            <Pressable key={b.m} onPress={() => setActive(i)} style={{ alignItems: 'center', flex: 1 }}>
              <View style={{ height: 126, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 4, height: b.up * 0.8, backgroundColor: colors.primary, borderRadius: 2, marginBottom: 2 }} />
                <View style={{ width: 4, height: b.down * 0.8, backgroundColor: colors.red, borderRadius: 2 }} />
              </View>
              <T style={{ fontSize: 9, color: i === active ? colors.primary : colors.border, fontFamily: i === active ? fonts.bold : fonts.regular }}>{b.m}</T>
            </Pressable>
          ))}
        </View>
      </Card>
      {transactions.map((t, i) => (
        <View key={i}>
          {t.day ? <T style={{ fontSize: 10, color: colors.grey, marginTop: 8, marginBottom: 6 }}>{t.day}</T> : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <View style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: t.color, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={t.icon as keyof typeof Ionicons.glyphMap} size={16} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <T style={{ fontFamily: fonts.medium, fontSize: 14 }}>{t.title}</T>
              {t.status ? <T style={{ fontSize: 10, color: colors.grey }}>{t.status}</T> : null}
            </View>
            <T style={{ color: t.neg ? colors.red : colors.primary, fontFamily: fonts.medium, fontSize: 14 }}>{t.amount}</T>
          </View>
        </View>
      ))}
    </Screen>
  );
}

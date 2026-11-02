import React, { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { Art, BillCard, Button, Card, Field, OptionModal, OtpRow, Screen, Select, SuccessBlock, T } from '../components/ui';
import { accountNumbers, art, paymentHistory } from '../data';
import { colors, fonts } from '../theme';
import { useNav } from '../navigation/useNav';
import type { RootProps } from '../navigation/types';

/* ─────────── Pay the bill (category list) ─────────── */
export function PayTheBillScreen() {
  const nav = useNav();
  const items = [
    { t: 'Electric bill', s: 'Pay electric bill this month', img: art.bElectric, go: () => nav.navigate('ElectricBillCode') },
    { t: 'Water bill', s: 'Pay water bill this month', img: art.bWater, go: () => nav.navigate('PaymentHistory', { tab: 'Water' }) },
    { t: 'Mobile bill', s: 'Pay mobile bill this month', img: art.bMobile, go: () => nav.navigate('MobilePrepaid') },
    { t: 'Internet bill', s: 'Pay internet bill this month', img: art.bInternet, go: () => nav.navigate('InternetBillCode') },
  ];
  return (
    <Screen
      title="Pay the bill"
      right={
        <Pressable onPress={() => nav.navigate('PaymentHistory')} hitSlop={10}>
          <T style={{ color: colors.primary, fontSize: 12, fontFamily: fonts.medium }}>History</T>
        </Pressable>
      }
    >
      {items.map((it) => (
        <Pressable key={it.t} onPress={it.go} style={{ marginBottom: 14 }}>
          <Card style={{ flexDirection: 'row', alignItems: 'center', height: 108, paddingVertical: 6 }}>
            <View style={{ flex: 1 }}>
              <T style={{ fontFamily: fonts.medium, fontSize: 14 }}>{it.t}</T>
              <T style={{ fontSize: 10, color: colors.grey, marginTop: 6 }}>{it.s}</T>
            </View>
            <Image source={it.img} style={{ width: 80, height: 82 }} resizeMode="contain" />
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

/* ─────────── Payment history ─────────── */
type Tab = keyof typeof paymentHistory;
export function PaymentHistoryScreen({ route }: RootProps<'PaymentHistory'>) {
  const [tab, setTab] = useState<Tab>(route.params?.tab ?? 'Electric');
  const tabs = Object.keys(paymentHistory) as Tab[];
  return (
    <Screen title="Payment history">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, marginBottom: 14 }} contentContainerStyle={{ gap: 12 }}>
        {tabs.map((t) => {
          const on = t === tab;
          return (
            <Pressable key={t} onPress={() => setTab(t)} style={{ minWidth: 92, height: 36, borderRadius: 8, backgroundColor: on ? colors.primary : colors.tint, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 }}>
              <T style={{ color: on ? '#fff' : colors.grey, fontFamily: fonts.medium }}>{t}</T>
            </Pressable>
          );
        })}
      </ScrollView>
      {paymentHistory[tab].map((r, i) => {
        const ok = r[2] === 'Successfully';
        return (
          <Card key={i} style={{ marginBottom: 14, paddingVertical: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <T style={{ fontFamily: fonts.medium, fontSize: 14 }}>{r[0]}</T>
              <T style={{ fontSize: 10, color: colors.grey }}>{r[1]}</T>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <T style={{ fontSize: 10, color: colors.grey }}>Status <T style={{ fontSize: 10, color: ok ? colors.primary : colors.red, fontFamily: fonts.medium }}>  {r[2]}</T></T>
              <T style={{ fontSize: 10, color: colors.grey }}>Amount  <T style={{ fontSize: 10, color: colors.primary, fontFamily: fonts.medium }}>{r[3]}</T></T>
            </View>
            {r[4] ? (
              <T style={{ fontSize: 10, color: colors.grey, marginTop: 4 }}>Company  <T style={{ fontSize: 10, color: colors.primary, fontFamily: fonts.medium }}>{r[4]}</T></T>
            ) : null}
          </Card>
        );
      })}
    </Screen>
  );
}

/* ─────────── Bill: enter code ─────────── */
function BillCode({ kind, withCompany }: { kind: 'electric' | 'internet'; withCompany?: boolean }) {
  const nav = useNav();
  const [company, setCompany] = useState('');
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const ready = code.length >= 4 && (!withCompany || company);
  return (
    <Screen title="Pay the bill">
      <Card>
        {withCompany ? <Select placeholder="Choose company" value={company} onPress={() => setOpen(true)} /> : null}
        <Field label={`Type ${kind} bill code`} placeholder="Bill code" value={code} onChangeText={setCode} keyboardType="number-pad" />
        <T style={{ fontSize: 13, color: colors.grey, lineHeight: 20, marginBottom: 16 }}>
          Please enter the correct bill code to check information.
        </T>
        <Button
          title="Check"
          disabled={!ready}
          onPress={() => nav.navigate(kind === 'electric' ? 'ElectricBillDetail' : 'InternetBillDetail')}
        />
      </Card>
      <OptionModal
        visible={open}
        title="Choose company"
        options={['Capi Telecom', 'Viettel', 'FPT Telecom', 'VNPT']}
        selected={company}
        onSelect={setCompany}
        onClose={() => setOpen(false)}
      />
    </Screen>
  );
}
export const ElectricBillCodeScreen = () => <BillCode kind="electric" />;
export const InternetBillCodeScreen = () => <BillCode kind="internet" withCompany />;

/* ─────────── Bill: detail + OTP + pay ─────────── */
function BillDetail({ title, feeLabel, fee, tax, total, onPaid, image }: {
  title: string; feeLabel: string; fee: string; tax: string; total: string; onPaid: () => void; image: number;
}) {
  const [acc, setAcc] = useState('');
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <Screen title={title}>
      <Art source={image} width="80%" style={{ marginBottom: 4 }} />
      <T style={{ textAlign: 'center', fontSize: 10, color: colors.grey, marginBottom: 14 }}>01/10/2019 - 01/11/2019</T>
      <BillCard feeLabel={feeLabel} fee={fee} tax={tax} total={total} />
      <Select placeholder="Choose account/ card" value={acc} onPress={() => setOpen(true)} wrapStyle={{ marginTop: 22 }} />
      <OtpRow value={otp} onChange={setOtp} onGetOtp={() => setSent(true)} otpSent={sent} />
      <Button title="Pay the bill" disabled={!acc || otp.length < 4} onPress={onPaid} style={{ marginTop: 18 }} />
      <OptionModal visible={open} title="Choose account:" options={accountNumbers} selected={acc || '4411 0000 1234'} onSelect={setAcc} onClose={() => setOpen(false)} />
    </Screen>
  );
}

export function ElectricBillDetailScreen() {
  const nav = useNav();
  return <BillDetail title="Electric bill" feeLabel="Electric fee" fee="$470" tax="$10" total="$480" image={art.wallet} onPaid={() => nav.replace('ElectricBillSuccess')} />;
}
export function InternetBillDetailScreen() {
  const nav = useNav();
  return <BillDetail title="Internet bill" feeLabel="Internet fee" fee="$50" tax="$10" total="$60" image={art.wallet} onPaid={() => nav.replace('InternetBillSuccess')} />;
}

/* ─────────── Bill: success ─────────── */
function BillSuccess({ title, text }: { title: string; text: string }) {
  const nav = useNav();
  return (
    <Screen title={title}>
      <SuccessBlock
        art={art.success}
        title="Transaction successfully!"
        lines={text}
        button="Confirm"
        onPress={() => nav.reset({ index: 0, routes: [{ name: 'Tabs' }] })}
      />
    </Screen>
  );
}
export const ElectricBillSuccessScreen = () => <BillSuccess title="Electric bill" text="You 've pay your electric bill!" />;
export const InternetBillSuccessScreen = () => <BillSuccess title="Internet bill" text="You 've pay your internet bill!" />;

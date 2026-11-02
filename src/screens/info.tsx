import React, { useMemo, useState } from 'react';
import { Image, Pressable, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Rect } from 'react-native-svg';
import { Art, Button, Card, OptionModal, Screen, T } from '../components/ui';
import { art, bankBranches, flags, interestRates, rates } from '../data';
import { colors, fonts } from '../theme';

/* ─────────── Branch search (map + list) ─────────── */
function FakeMap() {
  const pins = [
    { x: 24, y: 24 }, { x: 205, y: 56 }, { x: 28, y: 180 }, { x: 160, y: 168 }, { x: 258, y: 214 },
  ];
  return (
    <View style={{ height: 300, backgroundColor: '#EEEEEE', overflow: 'hidden' }}>
      <Svg width="100%" height="100%" viewBox="0 0 375 300" preserveAspectRatio="xMidYMid slice">
        <Rect width={375} height={300} fill="#EDEDED" />
        <Path d="M0 120 C 80 90, 140 150, 230 110 S 330 90, 375 130 L 375 300 L 0 300 Z" fill="#F7F7F7" />
        <Path d="M0 60 L 375 90" stroke="#fff" strokeWidth={6} />
        <Path d="M60 0 L 120 300" stroke="#fff" strokeWidth={5} />
        <Path d="M230 0 L 200 300" stroke="#fff" strokeWidth={5} />
        <Path d="M0 200 L 375 170" stroke="#fff" strokeWidth={4} />
        <Path d="M300 0 L 340 300" stroke="#fff" strokeWidth={3} />
        <Path d="M20 20 C 90 30 150 100 250 180" stroke="#DCDCDC" strokeWidth={10} fill="none" />
      </Svg>
      {pins.map((p, i) => (
        <Ionicons key={i} name="location-sharp" size={22} color={colors.primary} style={{ position: 'absolute', left: p.x, top: p.y }} />
      ))}
      <Ionicons name="navigate" size={22} color={colors.red} style={{ position: 'absolute', left: 150, top: 118 }} />
    </View>
  );
}

export function BranchScreen() {
  const [q, setQ] = useState('Bank');
  const list = bankBranches.filter((b) => b.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Screen title="Branch" scroll={false} contentStyle={{ padding: 0 }}>
      <FakeMap />
      <View style={{ flex: 1, marginTop: -16, backgroundColor: '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18, paddingHorizontal: 20, paddingTop: 10 }}>
        <View style={{ alignSelf: 'center', width: 36, height: 3, borderRadius: 2, backgroundColor: colors.line, marginBottom: 12 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.line, borderRadius: 8, paddingHorizontal: 12, height: 40 }}>
          <Ionicons name="search" size={16} color={colors.text} />
          <TextInput value={q} onChangeText={setQ} placeholder="Search" placeholderTextColor={colors.border} style={{ flex: 1, marginLeft: 10, fontFamily: fonts.regular, fontSize: 13 }} />
          {q ? (
            <Pressable onPress={() => setQ('')} hitSlop={10}>
              <Ionicons name="close" size={16} color={colors.border} />
            </Pressable>
          ) : null}
        </View>
        <View style={{ marginTop: 10 }}>
          {list.map((b, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', height: 46, borderBottomWidth: 1, borderBottomColor: colors.line }}>
              <Ionicons name="location-sharp" size={18} color={colors.primary} />
              <T style={{ flex: 1, marginLeft: 10, fontSize: 14 }}>{b.name}</T>
              <T style={{ fontSize: 10, color: colors.grey }}>{b.dist}</T>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

/* ─────────── Interest rate ─────────── */
export function InterestRateScreen() {
  return (
    <Screen title="Interest rate" contentStyle={{ paddingTop: 6 }}>
      <View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
        <T style={{ flex: 1, fontSize: 13, color: colors.grey }}>Interest kind</T>
        <T style={{ width: 64, fontSize: 13, color: colors.grey }}>Deposit</T>
        <T style={{ width: 52, fontSize: 13, color: colors.grey, textAlign: 'right' }}>Rate</T>
      </View>
      {interestRates.map((r, i) => (
        <View key={i} style={{ flexDirection: 'row', height: 55, alignItems: 'center' }}>
          <T style={{ flex: 1, fontSize: 14 }}>{r[0]}</T>
          <T style={{ width: 64, fontSize: 13 }}>{r[1]}</T>
          <T style={{ width: 52, fontSize: 14, color: colors.primary, fontFamily: fonts.medium, textAlign: 'right' }}>{r[2]}</T>
        </View>
      ))}
    </Screen>
  );
}

/* ─────────── Exchange rate ─────────── */
export function ExchangeRateScreen() {
  return (
    <Screen title="Exchange rate" contentStyle={{ paddingTop: 6 }}>
      <View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
        <T style={{ flex: 1, fontSize: 13, color: colors.grey }}>Country</T>
        <T style={{ width: 70, fontSize: 13, color: colors.grey }}>Buy</T>
        <T style={{ width: 50, fontSize: 13, color: colors.grey, textAlign: 'right' }}>Sell</T>
      </View>
      {rates.map((r, i) => (
        <View key={i} style={{ flexDirection: 'row', height: 56, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line }}>
          <Image source={flags[r.flag]} style={{ width: 32, height: 32 }} resizeMode="contain" />
          <T style={{ flex: 1, marginLeft: 12, fontSize: 14 }}>{r.country}</T>
          <T style={{ width: 70, fontSize: 14 }}>{r.buy}</T>
          <T style={{ width: 50, fontSize: 14, textAlign: 'right' }}>{r.sell}</T>
        </View>
      ))}
    </Screen>
  );
}

/* ─────────── Exchange ─────────── */
const CURRENCIES: { code: string; name: string; perUsd: number }[] = [
  { code: 'USD', name: 'Dollar', perUsd: 1 },
  { code: 'KRW', name: 'Korean Won', perUsd: 1122 },
  { code: 'VND', name: 'Viet Nam Dong', perUsd: 23000 },
  { code: 'HK$', name: 'Hong Kong Dollar', perUsd: 7.8 },
  { code: 'NT$', name: 'Taiwan Dollar', perUsd: 31 },
  { code: 'J$', name: 'Jamaika Dollar', perUsd: 150 },
];
const label = (c: { code: string; name: string }) => `${c.code} ( ${c.name} )`;

export function ExchangeScreen() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState(CURRENCIES[0]);
  const [to, setTo] = useState(CURRENCIES[1]);
  const [picker, setPicker] = useState<null | 'from' | 'to'>(null);
  const [done, setDone] = useState(false);
  const rate = to.perUsd / from.perUsd;
  const result = useMemo(() => {
    const n = parseFloat(amount);
    return isFinite(n) ? (n * rate).toLocaleString('en-US', { maximumFractionDigits: 2 }) : '';
  }, [amount, rate]);

  const box = (children: React.ReactNode, code: string, onPick: () => void) => (
    <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: colors.border, borderRadius: 8, height: 38, alignItems: 'center' }}>
      <View style={{ flex: 1 }}>{children}</View>
      <Pressable onPress={onPick} style={{ flexDirection: 'row', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: colors.border, height: '100%', paddingHorizontal: 12, width: 96, justifyContent: 'space-between' }}>
        <T style={{ fontSize: 13, color: colors.grey, fontFamily: fonts.medium }}>{code}</T>
        <Ionicons name="swap-vertical" size={16} color={colors.grey} />
      </Pressable>
    </View>
  );

  return (
    <Screen title="Exchange">
      <Art source={art.exchange} style={{ marginBottom: 14 }} />
      <Card>
        <T style={{ fontSize: 11, color: colors.grey, fontFamily: fonts.medium, marginBottom: 6 }}>From</T>
        {box(
          <TextInput value={amount} onChangeText={setAmount} placeholder="Amount" placeholderTextColor={colors.border} keyboardType="decimal-pad" style={{ paddingHorizontal: 10, fontFamily: fonts.regular, fontSize: 13 }} />,
          from.code,
          () => setPicker('from'),
        )}
        <Pressable
          onPress={() => { setFrom(to); setTo(from); }}
          style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 18 }}
        >
          <Ionicons name="arrow-down" size={22} color={colors.primary} />
          <Ionicons name="arrow-up" size={22} color={colors.red} />
        </Pressable>
        <T style={{ fontSize: 11, color: colors.grey, fontFamily: fonts.medium, marginBottom: 6 }}>To</T>
        {box(
          <T style={{ paddingHorizontal: 10, fontSize: 13, color: result ? colors.text : colors.border }}>{result || 'Amount'}</T>,
          to.code,
          () => setPicker('to'),
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 14 }}>
          <T style={{ color: colors.primary, fontSize: 11, fontFamily: fonts.medium }}>Currency rate</T>
          <T style={{ fontSize: 11, fontFamily: fonts.medium }}>{`1 ${from.code} = ${rate.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${to.code}`}</T>
        </View>
        {done ? <T style={{ color: colors.primary, fontSize: 12, textAlign: 'center', marginBottom: 10 }}>Exchanged {amount} {from.code} → {result} {to.code}</T> : null}
        <Button title="Exchange" disabled={!result} onPress={() => setDone(true)} />
      </Card>
      <OptionModal
        visible={picker !== null}
        title="Select the currency"
        options={CURRENCIES.map(label)}
        selected={picker === 'from' ? label(from) : picker === 'to' ? label(to) : undefined}
        onSelect={(v) => {
          const c = CURRENCIES.find((x) => label(x) === v)!;
          if (picker === 'from') setFrom(c); else setTo(c);
          setDone(false);
        }}
        onClose={() => setPicker(null)}
      />
    </Screen>
  );
}

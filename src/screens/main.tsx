import React, { useState } from 'react';
import { Alert, Image, Linking, Pressable, ScrollView, Switch, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useInsets as useSafeAreaInsets } from '../useInsets';
import BankCard from '../components/BankCard';
import { Art, Avatar, Card, Screen, T } from '../components/ui';
import { art, avatars, categoryIcons, chat, flags, languages, messages } from '../data';
import { colors, fonts, shadow } from '../theme';
import { useNav } from '../navigation/useNav';
import type { RootProps } from '../navigation/types';

/* ─────────── Home ─────────── */
export function HomeScreen() {
  const nav = useNav();
  const insets = useSafeAreaInsets();
  const tiles = [
    { key: 'wallet', label: 'Account\nand Card', go: () => nav.navigate('AccountCard') },
    { key: 'transfer', label: 'Transfer', go: () => nav.navigate('Transfer') },
    { key: 'withdraw', label: 'Withdraw', go: () => nav.navigate('Withdraw') },
    { key: 'prepaid', label: 'Mobile\nprepaid', go: () => nav.navigate('MobilePrepaid') },
    { key: 'paybill', label: 'Pay the\nbill', go: () => nav.navigate('PayTheBill') },
    { key: 'saveonline', label: 'Save\nonline', go: () => nav.navigate('SaveOnline') },
    { key: 'creditcard', label: 'Credit\ncard', go: () => nav.navigate('CreditCard') },
    { key: 'report', label: 'Transaction\nreport', go: () => nav.navigate('TransactionReport') },
    { key: 'beneficiary', label: 'Beneficiary', go: () => nav.navigate('Beneficiary') },
  ] as const;
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <View style={{ paddingTop: insets.top + 13, paddingHorizontal: 24, paddingBottom: 23, flexDirection: 'row', alignItems: 'center' }}>
        <Avatar source={avatars.home} size={50} />
        <T style={{ color: '#fff', fontFamily: fonts.medium, fontSize: 14, flex: 1, marginLeft: 18 }}>Hi, Push Puttichai</T>
        <Pressable onPress={() => nav.navigate('Tabs', { screen: 'Messages' })} hitSlop={10}>
          <Ionicons name="notifications" size={24} color="#fff" />
          <View style={{ position: 'absolute', top: -4, right: -4, backgroundColor: colors.red, minWidth: 14, height: 14, borderRadius: 7, alignItems: 'center', justifyContent: 'center' }}>
            <T style={{ color: '#fff', fontSize: 8, fontFamily: fonts.bold }}>3</T>
          </View>
        </Pressable>
      </View>
      <View style={{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 23, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 0 }}>
            <BankCard onPress={() => nav.navigate('CardDetail')} style={shadow} />
            <View style={{ height: 6, marginHorizontal: 18, backgroundColor: colors.red, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: -6, zIndex: -1 }} />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 42, rowGap: 16 }}>
            {tiles.map((t) => (
              <Pressable
                key={t.key}
                onPress={t.go}
                style={[{ width: 99, height: 100, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 }, shadow]}
              >
                <Image source={categoryIcons[t.key]} style={{ width: 31, height: 31 }} resizeMode="contain" />
                <T style={{ fontSize: 10, color: colors.grey, textAlign: 'center', marginTop: 8, lineHeight: 14 }}>{t.label}</T>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

/* ─────────── Search ─────────── */
export function SearchScreen() {
  const nav = useNav();
  const items = [
    { t: 'Branch', s: 'Search for branch', img: art.sBranch, go: () => nav.navigate('Branch') },
    { t: 'Interest rate', s: 'Search for interest rate', img: art.sInterest, go: () => nav.navigate('InterestRate') },
    { t: 'Exchange rate', s: 'Search for exchange rate', img: art.sExchangeRate, go: () => nav.navigate('ExchangeRate') },
    { t: 'Exchange', s: 'Exchange amount of money', img: art.sExchange, go: () => nav.navigate('Exchange') },
  ];
  return (
    <Screen title="Search" back={false} tabBarSpace contentStyle={{ gap: 14 }}>
      {items.map((it) => (
        <Pressable key={it.t} onPress={it.go}>
          <Card style={{ flexDirection: 'row', alignItems: 'center', height: 108, paddingVertical: 8 }}>
            <View style={{ flex: 1 }}>
              <T style={{ fontFamily: fonts.medium, fontSize: 14 }}>{it.t}</T>
              <T style={{ fontSize: 11, color: colors.grey, marginTop: 6 }}>{it.s}</T>
            </View>
            <Image source={it.img} style={{ width: 100, height: 82 }} resizeMode="contain" />
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

/* ─────────── Messages ─────────── */
export function MessagesScreen() {
  const nav = useNav();
  return (
    <Screen title="Message" back={false} tabBarSpace>
      <Card style={{ padding: 10 }}>
        {messages.map((m, i) => (
          <Pressable
            key={m.id}
            onPress={() => nav.navigate('Chat', { title: m.title })}
            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: i < messages.length - 1 ? 0 : 0 }}
          >
            <View style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: m.color, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={m.icon as keyof typeof Ionicons.glyphMap} size={20} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <T style={{ fontFamily: fonts.medium, fontSize: 14 }}>{m.title}</T>
              <T style={{ fontSize: 10, color: colors.grey }} numberOfLines={1}>{m.text}</T>
            </View>
            <T style={{ fontSize: 10, color: colors.grey, alignSelf: 'flex-start', marginTop: 4 }}>{m.date}</T>
          </Pressable>
        ))}
      </Card>
    </Screen>
  );
}

/* ─────────── Chat ─────────── */
export function ChatScreen({ route }: RootProps<'Chat'>) {
  const [list, setList] = useState<{ id: string; me: boolean; text: string; date?: string }[]>([...chat]);
  const [text, setText] = useState('');
  const send = () => {
    if (!text.trim()) return;
    setList((l) => [...l, { id: String(Date.now()), me: true, text: text.trim() }]);
    setText('');
  };
  return (
    <Screen
      title={route.params?.title ?? 'Bank of America'}
      scroll={false}
      contentStyle={{ padding: 0 }}
    >
      <ScrollView contentContainerStyle={{ padding: 20, gap: 14 }} style={{ flex: 1 }}>
        {list.map((m) => (
          <View key={m.id} style={{ alignItems: m.me ? 'flex-end' : 'flex-start' }}>
            {m.date ? <T style={{ alignSelf: 'center', fontSize: 11, color: colors.grey, marginBottom: 10 }}>{m.date}</T> : null}
            <View
              style={{
                maxWidth: '82%',
                backgroundColor: m.me ? colors.primary : colors.tint,
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 12,
                borderBottomRightRadius: m.me ? 4 : 12,
                borderBottomLeftRadius: m.me ? 12 : 4,
              }}
            >
              <T style={{ color: m.me ? '#fff' : colors.text, fontSize: 13, lineHeight: 19, fontFamily: m.me ? fonts.medium : fonts.regular }}>
                {m.text}
              </T>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, gap: 10 }}>
        <View style={{ flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12 }}>
          <TextInput
            value={text}
            onChangeText={setText}
            onSubmitEditing={send}
            placeholder="Type something..."
            placeholderTextColor={colors.border}
            style={{ fontFamily: fonts.regular, fontSize: 13, paddingVertical: 9, color: colors.text }}
          />
        </View>
        <Pressable
          onPress={send}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: text.trim() ? colors.primary : colors.primaryDisabled, alignItems: 'center', justifyContent: 'center' }}
        >
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </Pressable>
      </View>
    </Screen>
  );
}

/* ─────────── Settings ─────────── */
export function SettingsScreen() {
  const nav = useNav();
  const [touch, setTouch] = useState(true);
  const row = (label: string, onPress: () => void, right?: React.ReactNode) => (
    <Pressable key={label} onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', height: 42, borderBottomWidth: 1, borderBottomColor: colors.line }}>
      <T style={{ flex: 1, fontSize: 14 }}>{label}</T>
      {right ?? <Ionicons name="chevron-forward" size={14} color={colors.border} />}
    </Pressable>
  );
  return (
    <Screen
      title="Setting"
      dark
      back={false}
      tabBarSpace
      hero={
        <View style={{ alignItems: 'center', marginBottom: -22, zIndex: 2 }}>
          <Avatar source={avatars.pushbig} size={100} />
        </View>
      }
    >
      <T style={{ color: colors.primary, fontFamily: fonts.medium, fontSize: 14, textAlign: 'center', marginTop: 28, marginBottom: 26 }}>
        Push Puttichai
      </T>
      {row('Password', () => nav.navigate('ChangePassword'))}
      {row('Touch ID', () => setTouch((v) => !v), <Switch value={touch} onValueChange={setTouch} trackColor={{ true: colors.primary, false: colors.line }} thumbColor="#fff" />)}
      {row('Languages', () => nav.navigate('Language'))}
      {row('App information', () => nav.navigate('AppInformation'))}
      {row('Customer care', () => Linking.openURL('tel:19008989').catch(() => Alert.alert('Customer care', '19008989')),
        <T style={{ fontSize: 10, color: colors.grey }}>19008989</T>)}
      <Pressable onPress={() => nav.reset({ index: 0, routes: [{ name: 'SignIn' }] })} style={{ marginTop: 30, alignSelf: 'center' }}>
        <T style={{ color: colors.red, fontFamily: fonts.medium }}>Sign out</T>
      </Pressable>
    </Screen>
  );
}

/* ─────────── Language ─────────── */
export function LanguageScreen() {
  const [sel, setSel] = useState('English');
  return (
    <Screen title="Language">
      {languages.map((l) => {
        const on = l.name === sel;
        return (
          <Pressable key={l.name} onPress={() => setSel(l.name)} style={{ flexDirection: 'row', alignItems: 'center', height: 50, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <Image source={flags[l.flag]} style={{ width: 28, height: 28 }} resizeMode="contain" />
            <T style={{ flex: 1, marginLeft: 12, color: on ? colors.text : colors.grey, fontFamily: on ? fonts.medium : fonts.regular }}>{l.name}</T>
            {on ? <Ionicons name="checkmark" size={18} color={colors.primary} /> : null}
          </Pressable>
        );
      })}
    </Screen>
  );
}

/* ─────────── App information ─────────── */
export function AppInformationScreen() {
  const rows = [['Date of manufacture', 'Dec 2019'], ['Version', '9.0.2'], ['Language', 'English']];
  return (
    <Screen title="App information">
      <T style={{ fontFamily: fonts.medium, fontSize: 18, textAlign: 'center', marginVertical: 22 }}>iBank E-mobile Banking</T>
      {rows.map(([k, v]) => (
        <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.line }}>
          <T style={{ fontSize: 14 }}>{k}</T>
          <T style={{ color: colors.primary, fontFamily: fonts.medium, fontSize: 13 }}>{v}</T>
        </View>
      ))}
    </Screen>
  );
}

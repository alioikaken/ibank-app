import React, { ReactNode, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useInsets as useSafeAreaInsets } from '../useInsets';
import { colors, fonts, shadow } from '../theme';
import { ratios } from '../data';

/* ───────────── Typography ───────────── */
const FONT_SCALE = 1.14; // matches the mock-up type scale
export const T = ({ style, children, ...rest }: React.ComponentProps<typeof Text>) => {
  const flat = (StyleSheet.flatten(style) ?? {}) as TextStyle;
  const size = Math.round((flat.fontSize ?? 14) * FONT_SCALE * 2) / 2;
  const lh = flat.lineHeight ? Math.round(flat.lineHeight * FONT_SCALE) : undefined;
  return (
    <Text {...rest} style={[{ fontFamily: fonts.regular, color: colors.text }, style, { fontSize: size }, lh ? { lineHeight: lh } : null]}>
      {children}
    </Text>
  );
};

/* ───────────── Screen scaffold ───────────── */
type ScreenProps = {
  title?: string;
  dark?: boolean;
  back?: boolean;
  onBack?: () => void;
  right?: ReactNode;
  hero?: ReactNode;
  footer?: ReactNode;
  scroll?: boolean;
  tabBarSpace?: boolean;
  children?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  bg?: string;
};

export function Screen({
  title,
  dark,
  back = true,
  onBack,
  right,
  hero,
  footer,
  scroll = true,
  tabBarSpace,
  children,
  contentStyle,
  bg = colors.white,
}: ScreenProps) {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const goBack = onBack ?? (() => (nav.canGoBack() ? nav.goBack() : undefined));
  const headerColor = dark ? colors.white : colors.text;

  const header = (
    <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 17 }, dark && { backgroundColor: colors.primary }]}>
      <View style={styles.headerRow}>
        {back ? (
          <Pressable onPress={goBack} hitSlop={12} style={styles.backBtn} accessibilityLabel="Back">
            <Ionicons name="chevron-back" size={24} color={headerColor} />
          </Pressable>
        ) : null}
        <T style={{ fontFamily: fonts.medium, fontSize: 18, color: headerColor, flex: 1, marginLeft: back ? 6 : 0 }}>
          {title}
        </T>
        {right}
      </View>
      {hero}
    </View>
  );

  const body = scroll ? (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[{ padding: 24, paddingBottom: (tabBarSpace ? 96 : 28) + (footer ? 0 : 0) }, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[{ flex: 1, padding: 24 }, contentStyle]}>{children}</View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: dark ? colors.primary : bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {header}
      <View
        style={[
          { flex: 1, backgroundColor: bg },
          dark && { borderTopLeftRadius: 30, borderTopRightRadius: 30, overflow: 'hidden' },
        ]}
      >
        {body}
        {footer ? <View style={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 16 }}>{footer}</View> : null}
      </View>
    </KeyboardAvoidingView>
  );
}

/* ───────────── Card ───────────── */
export const Card = ({ children, style }: { children?: ReactNode; style?: StyleProp<ViewStyle> }) => (
  <View style={[styles.card, style]}>{children}</View>
);

/* ───────────── Buttons ───────────── */
export function Button({
  title,
  onPress,
  disabled,
  style,
  variant = 'primary',
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'orange';
}) {
  const active = variant === 'orange' ? colors.orange : colors.primary;
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: disabled ? colors.primaryDisabled : active, opacity: pressed ? 0.85 : 1 },
        style,
      ]}
    >
      <T style={{ color: colors.white, fontFamily: fonts.medium, fontSize: 15 }}>{title}</T>
    </Pressable>
  );
}

export function RoundButton({ onPress, icon = 'add' }: { onPress?: () => void; icon?: keyof typeof Ionicons.glyphMap }) {
  return (
    <Pressable onPress={onPress} style={[styles.round, shadow]}>
      <Ionicons name={icon} size={26} color={colors.white} />
    </Pressable>
  );
}

export function Segment({
  items,
  value,
  onChange,
}: {
  items: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', gap: 14 }}>
      {items.map((it) => {
        const on = it === value;
        return (
          <Pressable
            key={it}
            onPress={() => onChange(it)}
            style={[styles.segment, { backgroundColor: on ? colors.primary : colors.tint }]}
          >
            <T style={{ color: on ? colors.white : colors.grey, fontFamily: fonts.medium }}>{it}</T>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ───────────── Form controls ───────────── */
export const Label = ({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) => (
  <T style={[{ fontSize: 11, color: colors.grey, fontFamily: fonts.medium, marginBottom: 6 }, style]}>{children}</T>
);

type FieldProps = TextInputProps & {
  label?: string;
  hint?: string;
  right?: ReactNode;
  readOnlyField?: boolean;
  wrapStyle?: StyleProp<ViewStyle>;
};

export function Field({ label, hint, right, readOnlyField, wrapStyle, style, secureTextEntry, ...rest }: FieldProps) {
  const [focus, setFocus] = useState(false);
  const [hide, setHide] = useState(!!secureTextEntry);
  return (
    <View style={[{ marginBottom: 14 }, wrapStyle]}>
      {label ? <Label>{label}</Label> : null}
      <View style={[styles.input, focus && { borderColor: colors.primary }]}>
        <TextInput
          {...rest}
          editable={!readOnlyField && rest.editable !== false}
          secureTextEntry={hide}
          onFocus={(e) => {
            setFocus(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            rest.onBlur?.(e);
          }}
          placeholderTextColor={colors.border}
          style={[styles.inputText, style as TextStyle]}
        />
        {secureTextEntry ? (
          <Pressable onPress={() => setHide((h) => !h)} hitSlop={10}>
            <Ionicons name={hide ? 'eye-outline' : 'eye-off-outline'} size={18} color={colors.grey} />
          </Pressable>
        ) : (
          right
        )}
      </View>
      {hint ? <T style={{ fontSize: 10, color: colors.primary, fontFamily: fonts.medium, marginTop: 4, marginLeft: 4 }}>{hint}</T> : null}
    </View>
  );
}

export function Select({
  label,
  placeholder,
  value,
  onPress,
  hint,
  icon = 'chevron-down',
  wrapStyle,
}: {
  label?: string;
  placeholder: string;
  value?: string;
  onPress: () => void;
  hint?: string;
  icon?: 'chevron-down' | 'swap-vertical' | 'chevron-forward';
  wrapStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{ marginBottom: 14 }, wrapStyle]}>
      {label ? <Label>{label}</Label> : null}
      <Pressable onPress={onPress} style={styles.input}>
        <T style={[styles.inputText, { paddingVertical: 9, color: value ? colors.text : colors.border }]}>
          {value || placeholder}
        </T>
        <Ionicons name={icon} size={icon === 'chevron-forward' ? 16 : 18} color={value ? colors.text : colors.border} />
      </Pressable>
      {hint ? <T style={{ fontSize: 10, color: colors.primary, fontFamily: fonts.medium, marginTop: 4, marginLeft: 4 }}>{hint}</T> : null}
    </View>
  );
}

export function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <Pressable onPress={() => onChange(!checked)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
      <View
        style={[
          styles.check,
          checked && { borderColor: colors.primary },
        ]}
      >
        {checked ? <Ionicons name="checkmark" size={14} color={colors.primary} /> : null}
      </View>
      <T style={{ marginLeft: 10, fontSize: 12, color: checked ? colors.primary : colors.grey2 }}>{label}</T>
    </Pressable>
  );
}

export function OtpRow({
  value,
  onChange,
  onGetOtp,
  otpSent,
  caption = 'Get OTP to verify transaction',
}: {
  value: string;
  onChange: (v: string) => void;
  onGetOtp: () => void;
  otpSent: boolean;
  caption?: string;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Label>{caption}</Label>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={[styles.input, { flex: 1 }]}>
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="OTP"
            placeholderTextColor={colors.border}
            keyboardType="number-pad"
            style={styles.inputText}
          />
        </View>
        <Pressable
          onPress={onGetOtp}
          style={[styles.otpBtn, { backgroundColor: otpSent ? colors.primary : colors.primaryDisabled }]}
        >
          <T style={{ color: colors.white, fontFamily: fonts.medium }}>{otpSent ? 'Resend' : 'Get OTP'}</T>
        </Pressable>
      </View>
    </View>
  );
}

/* ───────────── Option modal (Choose account etc.) ───────────── */
export function OptionModal({
  visible,
  title,
  options,
  selected,
  onSelect,
  onClose,
  searchable,
  caption,
}: {
  visible: boolean;
  title: string;
  options: string[];
  selected?: string;
  onSelect: (v: string) => void;
  onClose: () => void;
  searchable?: boolean;
  caption?: string;
}) {
  const [q, setQ] = useState('');
  const list = options.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.dialog} onPress={() => undefined}>
          <View style={{ alignItems: 'center', marginBottom: 12 }}>
            <T style={{ fontFamily: fonts.medium, fontSize: 15 }}>{title}</T>
            <Pressable onPress={onClose} hitSlop={12} style={{ position: 'absolute', right: 0, top: -2 }}>
              <Ionicons name="close" size={22} color={colors.text} />
            </Pressable>
          </View>
          {searchable ? (
            <View style={[styles.input, { marginBottom: 6 }]}>
              <Ionicons name="search" size={16} color={colors.text} />
              <TextInput
                value={q}
                onChangeText={setQ}
                placeholder="Search"
                placeholderTextColor={colors.border}
                style={[styles.inputText, { marginLeft: 8 }]}
              />
            </View>
          ) : null}
          <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
            {list.map((o, i) => {
              const on = o === selected;
              return (
                <Pressable
                  key={o + i}
                  onPress={() => {
                    onSelect(o);
                    setQ('');
                    onClose();
                  }}
                  style={[styles.optionRow, searchable && { justifyContent: 'flex-start' }]}
                >
                  <T
                    style={{
                      flex: searchable ? 1 : 0,
                      color: on ? colors.primary : colors.grey,
                      fontFamily: on ? fonts.medium : fonts.regular,
                      fontSize: 14,
                    }}
                  >
                    {o}
                  </T>
                  {on ? <Ionicons name="checkmark" size={18} color={colors.primary} style={searchable ? undefined : { position: 'absolute', right: 0 }} /> : null}
                </Pressable>
              );
            })}
          </ScrollView>
          {caption ? <T style={{ fontSize: 10, color: colors.primary, marginTop: 8 }}>{caption}</T> : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/* ───────────── Biometric prompt ───────────── */
export function BiometricModal({
  visible,
  onCancel,
  onSuccess,
  title = 'Touch ID for iBank',
}: {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  title?: string;
}) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={[styles.overlay, { justifyContent: 'center' }]}>
        <View style={[styles.dialog, { padding: 0, width: 270, borderRadius: 14, overflow: 'hidden', alignItems: 'center' }]}>
          <Pressable onPress={onSuccess} style={{ padding: 20, alignItems: 'center', width: '100%' }}>
            <Image source={require('../../assets/img/fingerprint.png')} style={{ width: 40, height: 40, tintColor: colors.red, opacity: 0.8 }} />
            <T style={{ fontFamily: fonts.medium, fontSize: 15, marginTop: 8 }}>{title}</T>
            <T style={{ fontSize: 12, marginTop: 2 }}>Access to the application</T>
          </Pressable>
          <Pressable onPress={onCancel} style={styles.cancelBtn}>
            <T style={{ color: colors.blue, fontFamily: fonts.medium, fontSize: 16 }}>Cancel</T>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

/* ───────────── Images ───────────── */
export function Art({ source, width, style }: { source: ImageSourcePropType; width?: number | string; style?: StyleProp<ViewStyle> }) {
  const { width: sw } = useWindowDimensions();
  const full = Math.min(sw, 480) - 48;
  const w = typeof width === 'number' ? width : typeof width === 'string' ? (parseFloat(width) / 100) * full : full;
  const ratio = ratios.get(source) ?? 1.5;
  return <Image source={source} resizeMode="contain" style={[{ width: w, height: w / ratio, alignSelf: 'center' }, style as object]} />;
}

export function Avatar({ source, size = 44 }: { source: ImageSourcePropType; size?: number }) {
  return <Image source={source} style={{ width: size, height: size, borderRadius: size / 2 }} />;
}

/* ───────────── Key/value rows & bill summary ───────────── */
export function KV({ k, v, big }: { k: string; v: string; big?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: big ? 6 : 5 }}>
      <T style={{ color: colors.grey, fontSize: big ? 14 : 11, fontFamily: fonts.medium }}>{k}</T>
      <T style={{ fontSize: big ? 14 : 11, fontFamily: fonts.medium, flexShrink: 1, textAlign: 'right', marginLeft: 20 }}>{v}</T>
    </View>
  );
}

export function BillCard({
  feeLabel,
  fee,
  tax,
  total,
  from = '01/10/2019',
  to = '01/11/2019',
}: {
  feeLabel: string;
  fee: string;
  tax: string;
  total: string;
  from?: string;
  to?: string;
}) {
  return (
    <Card>
      <T style={{ fontFamily: fonts.medium, fontSize: 14, marginBottom: 8 }}>All the Bills</T>
      <KV k="Name" v="Jackson Maine" />
      <KV k="Address" v={'403 East 4th Street,\nSanta Ana'} />
      <KV k="Phone number" v="+8424599721" />
      <KV k="Code" v="#2343543" />
      <KV k="From" v={from} />
      <KV k="To" v={to} />
      <View style={styles.billRow}>
        <T style={{ color: colors.grey, fontSize: 14 }}>{feeLabel}</T>
        <T style={{ color: colors.primary, fontFamily: fonts.medium }}>{fee}</T>
      </View>
      <View style={styles.billRow}>
        <T style={{ color: colors.grey, fontSize: 14 }}>Tax</T>
        <T style={{ color: colors.primary, fontFamily: fonts.medium }}>{tax}</T>
      </View>
      <View style={[styles.billRow, { borderBottomWidth: 0, paddingTop: 12 }]}>
        <T style={{ color: colors.grey, fontFamily: fonts.medium }}>TOTAL</T>
        <T style={{ color: colors.red, fontFamily: fonts.medium, fontSize: 22 }}>{total}</T>
      </View>
    </Card>
  );
}

/* ───────────── Success block ───────────── */
export function SuccessBlock({
  art,
  title,
  lines,
  button,
  onPress,
  extra,
}: {
  art: ImageSourcePropType;
  title: string;
  lines: ReactNode;
  button: string;
  onPress: () => void;
  extra?: ReactNode;
}) {
  return (
    <View style={{ flex: 1 }}>
      <Art source={art} style={{ marginTop: -3 }} />
      <T style={{ color: colors.primary, fontFamily: fonts.medium, fontSize: 15, textAlign: 'center', marginTop: 17 }}>{title}</T>
      <T style={{ textAlign: 'center', fontSize: 13, marginTop: 22, lineHeight: 20 }}>{lines}</T>
      {extra}
      <Button title={button} onPress={onPress} style={{ marginTop: 28 }} />
    </View>
  );
}

/* ───────────── Styles ───────────── */
const styles = StyleSheet.create({
  header: { paddingHorizontal: 24, paddingBottom: 14, zIndex: 2, elevation: 2 },
  headerRow: { flexDirection: 'row', alignItems: 'center', minHeight: 36 },
  backBtn: { width: 28, height: 32, justifyContent: 'center' },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 16, ...shadow },
  btn: { height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  round: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segment: { flex: 1, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: colors.white,
  },
  inputText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.text,
    paddingVertical: Platform.OS === 'ios' ? 9 : 5,
    // @ts-expect-error web-only
    outlineStyle: 'none',
  },
  check: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBtn: { height: 40, minWidth: 82, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', alignItems: 'center', padding: 20 },
  dialog: { width: '100%', backgroundColor: colors.white, borderRadius: 14, padding: 20 },
  optionRow: { paddingVertical: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  cancelBtn: { borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.border, width: '100%', alignItems: 'center', paddingVertical: 12 },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.line,
  },
});

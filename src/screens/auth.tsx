import React, { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Checkbox, Field, Label, Screen, T, SuccessBlock } from '../components/ui';
import { art } from '../data';
import { colors, fonts } from '../theme';
import { useNav } from '../navigation/useNav';
import type { RootProps } from '../navigation/types';

/* Decorative hero used on Sign in / Sign up */
function AuthHero({ icon }: { icon: keyof typeof Ionicons.glyphMap }) {
  const dot = (c: string, size: number, top: number, left: number) => (
    <View style={{ position: 'absolute', top, left, width: size, height: size, borderRadius: size / 2, backgroundColor: c }} />
  );
  return (
    <View style={{ height: 160, alignItems: 'center', justifyContent: 'center', marginVertical: 14 }}>
      <View style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: '#E8E5FA', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 52, height: 74, borderRadius: 10, backgroundColor: colors.primary2, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name={icon} size={30} color="#fff" />
        </View>
      </View>
      {dot(colors.red, 20, 14, 218)}
      {dot(colors.orange, 16, 112, 118)}
      {dot(colors.blue, 8, 106, 206)}
      {dot(colors.teal, 8, 70, 90)}
      {dot(colors.primary, 8, 24, 160)}
    </View>
  );
}

export function SignInScreen() {
  const nav = useNav();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  return (
    <Screen title="Sign in" dark back={false}>
      <T style={{ color: colors.primary, fontFamily: fonts.semi, fontSize: 24 }}>Welcome Back</T>
      <T style={{ fontSize: 12, marginBottom: 4 }}>Hello there, sign in to continue</T>
      <AuthHero icon="lock-closed" />
      <Field placeholder="Text input" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Field placeholder="Password" value={pw} onChangeText={setPw} secureTextEntry />
      <Pressable onPress={() => nav.navigate('ForgotPhone')} style={{ alignSelf: 'flex-end', marginTop: -6 }}>
        <T style={{ fontSize: 11, color: colors.grey2 }}>Forgot your password ?</T>
      </Pressable>
      <Button
        title="Sign in"
        disabled={!email || !pw}
        onPress={() => nav.reset({ index: 0, routes: [{ name: 'Tabs' }] })}
        style={{ marginTop: 28 }}
      />
      <Pressable onPress={() => nav.reset({ index: 0, routes: [{ name: 'Tabs' }] })} style={{ alignSelf: 'center', marginTop: 20 }}>
        <Image source={art.fingerprint} style={{ width: 54, height: 54 }} />
      </Pressable>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
        <T style={{ fontSize: 12 }}>Don't have an account? </T>
        <Pressable onPress={() => nav.navigate('SignUp')}>
          <T style={{ fontSize: 12, color: colors.primary, fontFamily: fonts.medium }}>Sign Up</T>
        </Pressable>
      </View>
    </Screen>
  );
}

export function SignUpScreen() {
  const nav = useNav();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pw, setPw] = useState('');
  const [agree, setAgree] = useState(false);
  return (
    <Screen title="Sign up" dark>
      <T style={{ color: colors.primary, fontFamily: fonts.semi, fontSize: 24 }}>Welcome to us,</T>
      <T style={{ fontSize: 12, marginBottom: 4 }}>Hello there, create New account</T>
      <AuthHero icon="people" />
      <Field placeholder="Name" value={name} onChangeText={setName} />
      <Field placeholder="Text input" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Field placeholder="Password" value={pw} onChangeText={setPw} secureTextEntry />
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Checkbox checked={agree} onChange={setAgree} label="" />
        <T style={{ fontSize: 12, marginLeft: -2, flex: 1, color: colors.text }}>
          By creating an account your aggree to our{' '}
          <T style={{ color: colors.primary, fontFamily: fonts.medium, fontSize: 12 }}>Term and Condtions</T>
        </T>
      </View>
      <Button
        title="Sign up"
        disabled={!name || !phone || !pw || !agree}
        onPress={() => nav.reset({ index: 0, routes: [{ name: 'Tabs' }] })}
        style={{ marginTop: 6 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
        <T style={{ fontSize: 12 }}>Have an account? </T>
        <Pressable onPress={() => nav.navigate('SignIn')}>
          <T style={{ fontSize: 12, color: colors.primary, fontFamily: fonts.medium }}>Sign In</T>
        </Pressable>
      </View>
    </Screen>
  );
}

export function ForgotPhoneScreen() {
  const nav = useNav();
  const [phone, setPhone] = useState('');
  return (
    <Screen title="Forgot password">
      <Card>
        <Field label="Type your phone number" placeholder="(+84)" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <T style={{ fontSize: 13, color: colors.grey, lineHeight: 20, marginBottom: 14 }}>
          We texted you a code to verify your phone number
        </T>
        <Button title="Send" disabled={phone.length < 5} onPress={() => nav.navigate('ForgotCode', { phone })} />
      </Card>
    </Screen>
  );
}

export function ForgotCodeScreen({ route }: RootProps<'ForgotCode'>) {
  const nav = useNav();
  const [code, setCode] = useState('');
  const phone = route.params?.phone || '(+84) 0398829xxx';
  return (
    <Screen title="Forgot password">
      <Card>
        <Label>Type a code</Label>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 14 }}>
          <View style={{ flex: 1 }}>
            <Field placeholder="Code" value={code} onChangeText={setCode} keyboardType="number-pad" maxLength={6} wrapStyle={{ marginBottom: 0 }} />
          </View>
          <Pressable style={{ backgroundColor: colors.primary, borderRadius: 8, minWidth: 82, height: 40, alignItems: 'center', justifyContent: 'center' }}>
            <T style={{ color: '#fff', fontFamily: fonts.medium, fontSize: 12 }}>Resend</T>
          </Pressable>
        </View>
        <T style={{ fontSize: 13, color: colors.grey, lineHeight: 20 }}>
          We texted you a code to verify your phone number{' '}
          <T style={{ color: colors.primary, fontFamily: fonts.medium, fontSize: 13 }}>{phone}</T>
        </T>
        <T style={{ fontSize: 13, color: colors.grey, lineHeight: 20, marginVertical: 12 }}>
          This code will expired 10 minutes after this message. If you don't get a message.
        </T>
        <Button title="Change password" disabled={code.length < 4} onPress={() => nav.navigate('ChangePassword', { forgot: true })} />
      </Card>
      <Pressable onPress={() => nav.goBack()} style={{ alignSelf: 'center', marginTop: 40 }}>
        <T style={{ color: colors.primary, fontFamily: fonts.medium, fontSize: 12 }}>Change your phone number</T>
      </Pressable>
    </Screen>
  );
}

export function ChangePasswordScreen({ route }: RootProps<'ChangePassword'>) {
  const nav = useNav();
  const forgot = route.params?.forgot;
  const [oldPw, setOld] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const valid = (forgot || oldPw.length > 0) && pw.length >= 6 && pw === pw2;
  return (
    <Screen title="Change password">
      <Card>
        {!forgot ? (
          <Field label="Recent password" placeholder="Recent password" value={oldPw} onChangeText={setOld} secureTextEntry />
        ) : null}
        <Field label={forgot ? 'Type your new password' : 'New password'} placeholder="New password" value={pw} onChangeText={setPw} secureTextEntry />
        <Field label="Confirm password" placeholder="Confirm new password" value={pw2} onChangeText={setPw2} secureTextEntry />
        {pw2.length > 0 && pw !== pw2 ? (
          <T style={{ color: colors.red, fontSize: 11, marginTop: -8, marginBottom: 12 }}>Passwords do not match</T>
        ) : null}
        <Button title="Change password" disabled={!valid} onPress={() => nav.navigate('ChangePasswordSuccess')} style={{ marginTop: 10 }} />
      </Card>
    </Screen>
  );
}

export function ChangePasswordSuccessScreen() {
  const nav = useNav();
  return (
    <Screen title="" onBack={() => nav.reset({ index: 0, routes: [{ name: 'Tabs' }] })}>
      <SuccessBlock
        art={art.security}
        title="Change password successfully!"
        lines={'You have successfully change password.\nPlease use the new password when Sign in.'}
        button="Ok"
        onPress={() => nav.reset({ index: 0, routes: [{ name: 'SignIn' }] })}
      />
    </Screen>
  );
}

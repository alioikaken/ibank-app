import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Circle, ClipPath, Defs, Path, Rect } from 'react-native-svg';
import { T } from './ui';
import { fonts } from '../theme';

type Props = {
  variant?: 'blue' | 'orange';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
};

const W = 327;
const H = 205;

export default function BankCard({ variant = 'blue', onPress, style, compact }: Props) {
  const blue = variant === 'blue';
  return (
    <Pressable onPress={onPress} style={[{ width: '100%', aspectRatio: W / H, borderRadius: 16, overflow: 'hidden' }, style]}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} style={StyleSheet.absoluteFill} preserveAspectRatio="xMidYMid slice">
        <Defs>
          <ClipPath id={`clip-${variant}`}>
            <Rect width={W} height={H} rx={16} />
          </ClipPath>
        </Defs>
        {blue ? (
          <>
            <Rect width={W} height={H} fill="#2A1C9C" />
            <Path d={`M190 ${H} C 230 120, 290 80, ${W} 70 L ${W} ${H} Z`} fill="#1B7BFF" />
            <Circle cx={W - 38} cy={20} r={78} fill="#46A7FF" opacity={0.95} />
          </>
        ) : (
          <>
            <Rect width={W} height={H} fill="#FFB52E" />
            <Circle cx={60} cy={30} r={80} fill="#FFC863" opacity={0.7} />
            <Circle cx={W - 80} cy={H - 40} r={34} fill="#FFC863" opacity={0.9} />
            <Circle cx={W - 25} cy={H - 30} r={13} fill="#FFFFFF" opacity={0.9} />
            <Circle cx={W - 38} cy={H - 30} r={13} fill="#FFD27F" opacity={0.9} />
            <Circle cx={W - 120} cy={32} r={10} fill="#FFC863" />
          </>
        )}
      </Svg>
      <View style={styles.content} pointerEvents="none">
        <T style={{ color: '#fff', fontFamily: fonts.medium, fontSize: 22, opacity: blue ? 1 : 0.85 }}>John Smith</T>
        <View style={{ flex: 1 }} />
        <T style={{ color: '#fff', fontSize: 12, fontFamily: fonts.medium }}>Amazon Platinium</T>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <T style={{ color: '#fff', fontSize: 13 }}>4756</T>
          <T style={{ color: '#fff', fontSize: 13, letterSpacing: 2, marginHorizontal: 12 }}>●●●●  ●●●●</T>
          <T style={{ color: '#fff', fontSize: 13 }}>9018</T>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 6 }}>
          <T style={{ color: '#fff', fontFamily: fonts.semi, fontSize: compact ? 16 : 18 }}>$3.469.52</T>
          {blue ? (
            <T style={{ color: '#fff', fontFamily: fonts.bold, fontStyle: 'italic', fontSize: 20, letterSpacing: -0.5 }}>VISA</T>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: 16, paddingTop: 18 },
});

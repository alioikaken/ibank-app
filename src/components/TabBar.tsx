import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useInsets as useSafeAreaInsets } from '../useInsets';
import { T } from './ui';
import { colors, fonts } from '../theme';

const meta: Record<string, { label: string; icon: keyof typeof Ionicons.glyphMap; on: keyof typeof Ionicons.glyphMap }> = {
  Home: { label: 'Home', icon: 'home-outline', on: 'home' },
  Search: { label: 'Search', icon: 'search-outline', on: 'search' },
  Messages: { label: 'Message', icon: 'mail-outline', on: 'mail' },
  Settings: { label: 'Setting', icon: 'settings-outline', on: 'settings' },
};

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const m = meta[route.name];
        const press = () => {
          const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !e.defaultPrevented) navigation.navigate(route.name as never);
        };
        return (
          <Pressable key={route.key} onPress={press} style={styles.item} accessibilityLabel={m.label}>
            {focused ? (
              <View style={styles.pill}>
                <Ionicons name={m.on} size={18} color="#fff" />
                <T style={{ color: '#fff', fontSize: 11, fontFamily: fonts.medium, marginLeft: 6 }}>{m.label}</T>
              </View>
            ) : (
              <Ionicons name={m.icon} size={24} color={colors.grey2} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', height: 36 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 32,
  },
});

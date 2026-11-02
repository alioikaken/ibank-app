import React from 'react';
import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Navigation from './src/navigation';

// On web there are no device safe-area insets, so emulate an iPhone (375x812) for pixel-accurate preview.
const WEB_METRICS = { frame: { x: 0, y: 0, width: 375, height: 812 }, insets: { top: 44, left: 0, right: 0, bottom: 34 } };

export default function App() {
  const [loaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold });
  if (!loaded) return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
  return (
    <SafeAreaProvider initialMetrics={Platform.OS === 'web' ? WEB_METRICS : undefined}>
      <StatusBar style="dark" />
      <Navigation />
    </SafeAreaProvider>
  );
}

import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// On web there are no device safe-area insets, so emulate an iPhone (top 44 / bottom 34) for pixel-accurate preview.
export function useInsets() {
  const i = useSafeAreaInsets();
  if (Platform.OS === 'web') return { top: 44, bottom: 34, left: 0, right: 0 };
  return i;
}

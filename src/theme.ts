import { Platform } from 'react-native';

export const colors = {
  primary: '#3629B7',
  primary2: '#5655B9',
  primaryLight: '#A8A3D7',
  primaryDisabled: '#E9E7F8',
  tint: '#F2F1F9',
  orange: '#FFAF2A',
  deepOrange: '#FB6B18',
  red: '#FF4267',
  teal: '#52D5BA',
  blue: '#0890FE',
  text: '#343434',
  grey: '#898989',
  grey2: '#989898',
  border: '#CACACA',
  line: '#E0E0E0',
  white: '#FFFFFF',
  overlay: 'rgba(0,0,0,0.35)',
};

export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semi: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
};

export const shadow = Platform.select({
  ios: {
    shadowColor: '#3629B7',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 3 },
  default: { boxShadow: '0px 4px 14px rgba(54,41,183,0.08)' } as object,
}) as object;

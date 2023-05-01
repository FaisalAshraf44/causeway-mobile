import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
export const defaultTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#EE2F3F',
    accent: 'white',
    background: '#050505',
    text: 'white',
    inactive: '#4D4D4D',
    glossyBlack: '#1B1B1B',
  },
  fonts: {
    lightFont: 'Oxygen-Light',
    regularFont: 'Oxygen-Regular',
    boldFont: 'Oxygen-Bold',
  },
};

export default defaultTheme;

import { DarkTheme as PaperDarkTheme } from 'react-native-paper';

const darkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#EE2F3F',
    accent: 'black',
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

export default darkTheme;

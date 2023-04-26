import { DarkTheme as PaperDarkTheme } from 'react-native-paper';

const darkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#EE2F3F',
    accent: 'black',
    background: '#050505',
    text: 'white',
  },
  fonts: {
    lightFont: 'Oxygen-Light',
    regularFont: 'Oxygen-Regular',
    boldFont: 'Oxygen-Bold',
  },
};

export default darkTheme;

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
    borderColor: '#2E2E2E',
    lightgrey: '#787878',
    darkgrey: '#131313',
    dullWhite: '#D1D1D1',
    grey: '#9B9B9B',
  },
  fonts: {
    lightFont: 'Oxygen-Light',
    regularFont: 'Oxygen-Regular',
    boldFont: 'Oxygen-Bold',
  },
};

export default darkTheme;

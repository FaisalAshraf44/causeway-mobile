import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
export const defaultTheme = {
    ...PaperDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        primary: 'black',
        accent: 'white',
        background: 'darkgray',
    },
    fonts: {
        lightFont: 'Oxygen-Light',
        regularFont: 'Oxygen-Regular',
        boldFont: 'Oxygen-Bold',
    },
};

export default defaultTheme;

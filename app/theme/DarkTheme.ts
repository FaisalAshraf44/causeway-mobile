import { DarkTheme as PaperDarkTheme } from 'react-native-paper';

const darkTheme = {
    ...PaperDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        primary: 'white',
        accent: 'black',
        background: 'black',
    },
    fonts: {
        lightFont: 'Oxygen-Light',
        regularFont: 'Oxygen-Regular',
        boldFont: 'Oxygen-Bold',
    },
};

export default darkTheme;

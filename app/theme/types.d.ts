import 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      background: string;
      text: string;
    }

    interface ThemeFonts {
      regularFont: string;
      mediumFont: string;
      semiBoldFont: string;
      boldFont: string;
    }
    interface Theme {
      myOwnProperty: boolean;
    }
  }
}
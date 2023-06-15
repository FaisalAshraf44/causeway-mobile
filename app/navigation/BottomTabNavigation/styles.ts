import { RootState } from 'app/store/slice';
import { isTablet } from 'app/utils/extras';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

export const useStyle = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = useTheme();
  const styles = () =>
    StyleSheet.create({
      tabbarIcon: {
        fontSize: widthPercentageToDP(20),
      },
      tabbar: {
        backgroundColor: theme.colors.glossyBlack,
        height:
          Platform.OS == 'ios'
            ? heightPercentageToDP(8.5)
            : heightPercentageToDP(8),
        paddingBottom: heightPercentageToDP(1),
      },
      tabbarLabel: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

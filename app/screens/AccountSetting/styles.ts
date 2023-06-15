import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { RootState } from 'app/store/slice';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import themeSlice from 'app/store/slice/themeSlice';

export const useStyle = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      subContainer: {
        paddingTop: heightPercentageToDP(7),
        paddingHorizontal: widthPercentageToDP(4),
      },
      notificationsubText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.2),
        color: '#D1D1D1',
      },
      paddingVer: {
        paddingTop: heightPercentageToDP(2),
      },
      loginText: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.text,
        paddingVertical: heightPercentageToDP(1.3),
        paddingBottom: heightPercentageToDP(2),
      },
      lineInnerView: {
        borderWidth: widthPercentageToDP(0.2),
        borderColor: theme.colors.glossyBlack,
      },
      lineOuterView: {
        paddingVertical: heightPercentageToDP(1.8),
      },
      titleSubText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        color: theme.colors.lightgrey,
      },
      titleText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.dullWhite,
        paddingVertical: heightPercentageToDP(0.5),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

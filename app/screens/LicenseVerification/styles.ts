import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { RootState } from 'app/store/slice';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { isTablet } from 'react-native-device-info';

export const useStyle = () => {
  const { colors } = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = useTheme();

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      subContainer: {
        flex: 1,
        paddingHorizontal: widthPercentageToDP(4),
        paddingTop: heightPercentageToDP(4),
      },
      controller: { marginVertical: heightPercentageToDP(0.7) },
      error: {
        color: 'red',
        paddingVertical: heightPercentageToDP(0.5),
        fontSize: isTablet() ? widthPercentageToDP(2) : undefined,
      },
      socialImage: {
        height: heightPercentageToDP(3.5),
        width: widthPercentageToDP(7),
      },
      buttonsContainer: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingVertical: heightPercentageToDP(3),
      },
      button: {
        borderRadius: widthPercentageToDP(1.7),
      },
      txtstyle: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.7),
      },
      guideText: {
        paddingVertical: heightPercentageToDP(2),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.7),
        color: theme.colors.lightgrey,
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

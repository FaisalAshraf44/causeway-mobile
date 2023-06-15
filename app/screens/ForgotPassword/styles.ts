import { RootState } from 'app/store/slice';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { isTablet } from 'react-native-device-info';
export const useStyle = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: heightPercentageToDP(7),
      },
      contentContainer: { paddingBottom: heightPercentageToDP(20) },
      Img: {
        height: heightPercentageToDP(11),
        width: widthPercentageToDP(22),
        alignSelf: 'center',
      },
      subcontainer: {
        paddingTop: heightPercentageToDP(4),
        paddingHorizontal: widthPercentageToDP(3),
      },
      text1: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      text2: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
      },
      text3: {
        paddingTop: heightPercentageToDP(3),
        color: theme.colors.lightgrey,
        width: widthPercentageToDP(80),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
      },
      controller: {
        // backgroundColor: "red",
        marginVertical: heightPercentageToDP(4),
      },
      error: {
        color: 'red',
        paddingVertical: heightPercentageToDP(0.5),
        fontSize: isTablet() ? widthPercentageToDP(2) : undefined,
      },
      input: {
        width: '100%',
      },
      inputtext: {
        fontSize: widthPercentageToDP(3.6),
        color: theme.colors.lightgrey,
      },
      button: {
        marginTop: heightPercentageToDP(9),
        width: '100%',
        borderRadius: widthPercentageToDP(1.5),
      },
      txtstyle: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.7),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

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
      Img: {
        paddingTop: heightPercentageToDP(10),
        height: heightPercentageToDP(11),
        width: widthPercentageToDP(22),
        alignSelf: 'center',
      },
      subcontainer: {
        paddingTop: heightPercentageToDP(5),
        paddingHorizontal: widthPercentageToDP(3),
      },
      text1: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      text2: {
        paddingTop: heightPercentageToDP(1),
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
      },
      button: {
        marginTop: heightPercentageToDP(12),
        alignSelf: 'center',
        borderRadius: widthPercentageToDP(1.5),
      },
      txtstyle: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.7),
      },
      resendContainer: {
        paddingTop: heightPercentageToDP(6),
        flexDirection: 'row',
        justifyContent: 'center',
      },
      containerStyle: {
        backgroundColor: theme.colors.background,
        marginVertical: heightPercentageToDP(3),
      },
      otpTextInput: {
        fontSize: widthPercentageToDP(4.3),
        // paddingHorizontal: widthPercentageToDP(10),
        // paddingVertical: heightPercentageToDP(3.25),
        width: widthPercentageToDP(20),
        color: theme.colors.lightgrey,
        borderRadius: widthPercentageToDP(2),
        backgroundColor: theme.colors.darkgrey,
        fontFamily: theme.fonts.regularFont,
        borderBottomWidth: widthPercentageToDP(0.26),
        borderWidth: widthPercentageToDP(0.26),
      },
      didntreceived: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
      },
      resend: {
        color: 'red',
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        paddingLeft: widthPercentageToDP(1.7),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

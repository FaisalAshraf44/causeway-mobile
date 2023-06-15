import { RootState } from 'app/store/slice';
import React, { useState } from 'react';
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
      },
      subContainer: {
        paddingHorizontal: widthPercentageToDP(3),
        paddingTop: widthPercentageToDP(7),
      },
      cardContainer: { paddingTop: heightPercentageToDP(3) },

      confirmationText: {
        color: '#EE2F3F',
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      button: {
        width: '100%',
        marginVertical: heightPercentageToDP(2.7),
        paddingVertical: heightPercentageToDP(1.8),
        borderRadius: widthPercentageToDP(1.5),
      },
      txtstyle: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.9),
      },
      temp: {
        marginTop: heightPercentageToDP(30),
      },
      bottomText: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        width: widthPercentageToDP(70),
        paddingVertical: widthPercentageToDP(1),
      },
      bottomContainer: {
        position: 'absolute',
        bottom: heightPercentageToDP(2),
        paddingHorizontal: widthPercentageToDP(4),
        width: widthPercentageToDP(100),
        left: 0,
      },
      bottomSubContainer: {
        paddingVertical: heightPercentageToDP(2),
        paddingHorizontal: widthPercentageToDP(3),
        backgroundColor: theme.colors.glossyBlack,
        borderRadius: widthPercentageToDP(2),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

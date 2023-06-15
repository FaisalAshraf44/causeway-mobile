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
        flex: 1,
        paddingHorizontal: widthPercentageToDP(4),
        paddingTop: widthPercentageToDP(7),
      },
      optionSubContainer: {
        marginTop: heightPercentageToDP(2),
        paddingVertical: heightPercentageToDP(1),
        paddingHorizontal: widthPercentageToDP(4),
        borderRadius: widthPercentageToDP(2.5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.glossyBlack,
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
      outerRadio: {
        padding: widthPercentageToDP(0.7),
        borderWidth: widthPercentageToDP(0.3),
        borderColor: theme.colors.lightgrey,
        borderRadius: widthPercentageToDP(5),
      },
      innerRadio: {
        padding: widthPercentageToDP(1.4),
        borderRadius: widthPercentageToDP(10),
      },
      paymentImg: {
        width: widthPercentageToDP(12.5),
        height: heightPercentageToDP(5.6),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

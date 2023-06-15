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
        paddingHorizontal: widthPercentageToDP(4),
        paddingTop: widthPercentageToDP(3),
      },
      headingContainer: {
        position: 'absolute',
        bottom: heightPercentageToDP(2),
        paddingHorizontal: widthPercentageToDP(4),
        width: widthPercentageToDP(100),
        left: 0,
      },
      headingText: {
        color: '#EE2F3F',
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(6),
      },
      headingSubText: {
        paddingVertical: heightPercentageToDP(1),
        lineHeight: 29,
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.1),
        width: widthPercentageToDP(75),
      },
      skipText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(5.1),
        // width:widthPercentageToDP(75),
      },
      optionMainContainer: {
        paddingTop: heightPercentageToDP(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      optionSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      outerRadio: {
        padding: widthPercentageToDP(0.9),
        borderWidth: widthPercentageToDP(0.3),
        borderColor: theme.colors.text,
        borderRadius: widthPercentageToDP(5),
      },
      innerRadio: {
        padding: widthPercentageToDP(1.1),
        borderRadius: widthPercentageToDP(10),
      },
      nameText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
        paddingLeft: widthPercentageToDP(3),
      },
      priceText: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(2.6),
      },
      buttonMainContainer: {
        paddingTop: heightPercentageToDP(3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      button: {
        width: widthPercentageToDP(30),
        borderRadius: widthPercentageToDP(1.5),
        // paddingVertical: heightPercentageToDP(1.7),
      },
      txtstyle: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.9),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

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
      empty: {
        width: widthPercentageToDP(40),
        height: heightPercentageToDP(30),
        alignSelf: 'center',
      },
      subheader: {
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(5),
        paddingHorizontal: widthPercentageToDP(5),
        fontFamily: theme.fonts.regularFont,
        color: theme.colors.text,
        paddingTop: heightPercentageToDP(0.7),
      },
      promoContainer: { flex: 1, backgroundColor: theme.colors.background },
      iconView: {
        position: 'absolute',
        right: widthPercentageToDP(2.5),
        top: heightPercentageToDP(1.2),
      },
      tabBar: {
        backgroundColor: theme.colors.background,
        paddingTop: heightPercentageToDP(3),
      },
      tabbarIndicator: {
        backgroundColor: 'red',
      },
      tabBarLabel: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

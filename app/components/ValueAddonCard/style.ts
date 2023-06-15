import { Platform, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/slice';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
export const useStyle = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const styles = () =>
    StyleSheet.create({
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
    });
  return React.useMemo(() => styles(), [isDark]);
};

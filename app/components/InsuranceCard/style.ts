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
      main: {
        backgroundColor: theme.colors.background,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: widthPercentageToDP(3),
        marginVertical: heightPercentageToDP(2),
      },
      outerRadio: {
        padding: widthPercentageToDP(1),
        borderWidth: widthPercentageToDP(0.3),
        borderColor: theme.colors.text,
        borderRadius: widthPercentageToDP(5),
      },
      subContainer: {
        paddingHorizontal: widthPercentageToDP(3),
      },
      cardsubContainer: {
        width: widthPercentageToDP(85),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      nametext: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
        paddingHorizontal: widthPercentageToDP(2),
      },
      free: {
        color: '#EE2F3F',
        backgroundColor: '#FFC5CA',
        paddingHorizontal: widthPercentageToDP(5),
        paddingVertical: heightPercentageToDP(0.8),
        borderRadius: widthPercentageToDP(1),
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(2.3),
      },
      recommended: {
        color: '#178173',
        backgroundColor: '#E8FBFE',
        paddingHorizontal: widthPercentageToDP(2),
        paddingVertical: heightPercentageToDP(0.9),
        borderRadius: widthPercentageToDP(1),
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(2.2),
      },
      innerRadio: {
        padding: widthPercentageToDP(2),
        borderRadius: widthPercentageToDP(10),
      },
      pricetext: {
        paddingTop: widthPercentageToDP(1),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.2),
        color: theme.colors.text,
        alignSelf: 'flex-end',
      },
      discriptioncheader: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.8),
        color: theme.colors.text,
      },
      discriptiontext: {
        color: theme.colors.lightgrey,
        width: widthPercentageToDP(85),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

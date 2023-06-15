import { RootState } from 'app/store/slice';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
export const useStyle = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const styles = () =>
    StyleSheet.create({
      mainView: {
        backgroundColor: theme.colors.glossyBlack,
        borderRadius: widthPercentageToDP(3),
      },
      space: {
        height: heightPercentageToDP(2),
        width: widthPercentageToDP(80),
      },
      subView: {
        paddingHorizontal: widthPercentageToDP(2),
        paddingVertical: heightPercentageToDP(2),
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      iconSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: widthPercentageToDP(48),
        paddingVertical: heightPercentageToDP(1),
      },
      nameText: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.text,
      },
      typeText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.text,
      },
      viewAllText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.text,
      },
      dateText: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.text,
      },
      priceText: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(3.7),
        color: theme.colors.text,
      },
      textContainer: {
        paddingHorizontal: widthPercentageToDP(2),
      },
      modelText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(2.5),
        color: theme.colors.text,
      },
      carImage: {
        height: heightPercentageToDP(9),
        width: widthPercentageToDP(17),
      },
      lineInnerView: {
        borderWidth: widthPercentageToDP(0.05),
        borderColor: theme.colors.lightgrey,
      },
      lineOuterView: {
        paddingVertical: heightPercentageToDP(1),
      },
      icon: {
        height: heightPercentageToDP(3.3),
        width: widthPercentageToDP(6.4),
      },
      iconView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      dateView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: heightPercentageToDP(0.2),
      },
      nameModelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      textView: {
        paddingVertical: heightPercentageToDP(0.5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

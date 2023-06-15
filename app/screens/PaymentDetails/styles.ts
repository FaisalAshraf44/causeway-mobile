import { RootState } from 'app/store/slice';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
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
      container: {
        flex: 1,

        backgroundColor: theme.colors.background,
      },
      subContainer: {
        flex: 1,
        paddingHorizontal: widthPercentageToDP(4),
        paddingTop: widthPercentageToDP(8),
      },
      cardContainer: { paddingTop: heightPercentageToDP(1) },
      headingTxt: {
        color: theme.colors.text,
        fontSize: widthPercentageToDP(4),
        fontFamily: theme.fonts.regularFont,
      },
      bookingTxt: {
        paddingTop: heightPercentageToDP(6),
        color: theme.colors.text,
        fontSize: widthPercentageToDP(4),
        fontFamily: theme.fonts.regularFont,
      },
      input: {
        color: theme.colors.text,
        paddingHorizontal: widthPercentageToDP(3),
        borderRadius: widthPercentageToDP(2),
        backgroundColor: theme.colors.glossyBlack,
        marginTop: heightPercentageToDP(1.5),
        fontFamily: theme.fonts.regularFont,
        paddingVertical:
          Platform.OS == 'ios' ? heightPercentageToDP(1) : undefined,
      },
      cardNumberInput: {
        color: theme.colors.text,
        borderRadius: widthPercentageToDP(2),
        backgroundColor: theme.colors.glossyBlack,
        paddingHorizontal: widthPercentageToDP(3),
        fontFamily: theme.fonts.regularFont,
        width: widthPercentageToDP(81),
      },
      cvcInput: {
        color: theme.colors.text,
        borderRadius: widthPercentageToDP(2),
        backgroundColor: theme.colors.glossyBlack,
        paddingHorizontal: widthPercentageToDP(3),
        fontFamily: theme.fonts.regularFont,
        width: widthPercentageToDP(30),
        paddingVertical:
          Platform.OS == 'ios' ? heightPercentageToDP(1) : undefined,
      },
      dateInput: {
        color: theme.colors.text,
        borderRadius: widthPercentageToDP(2),
        backgroundColor: theme.colors.glossyBlack,
        paddingHorizontal: widthPercentageToDP(3),
        fontFamily: theme.fonts.regularFont,
        width: widthPercentageToDP(50),
        paddingVertical:
          Platform.OS == 'ios' ? heightPercentageToDP(1) : undefined,
      },
      paymentImg: {
        marginLeft: widthPercentageToDP(3),
        width: widthPercentageToDP(8.5),
        height: heightPercentageToDP(4.5),
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: widthPercentageToDP(2),
        backgroundColor: theme.colors.glossyBlack,
        marginTop: heightPercentageToDP(1.5),
      },
      button: {
        borderRadius: widthPercentageToDP(1.7),

        // bottom: heightPercentageToDP(3),
      },
      txtstyle: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.7),
      },
      parentContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingBottom: heightPercentageToDP(3),
        alignItems: 'center',
      },

      subRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: heightPercentageToDP(1.5),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

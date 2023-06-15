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
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      padding: { paddingTop: heightPercentageToDP(0) },
      promoContainer: {
        marginTop: heightPercentageToDP(3.3),
        paddingHorizontal: widthPercentageToDP(3),
      },
      selectPromo: {
        backgroundColor: theme.colors.darkgrey,
        borderRadius: widthPercentageToDP(2),
        borderColor: theme.colors.borderColor,
        borderWidth: widthPercentageToDP(0.3),
        paddingVertical: heightPercentageToDP(2.1),
        paddingHorizontal: widthPercentageToDP(3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      promoText: {
        color: theme.colors.lightgrey,
        fontSize: widthPercentageToDP(3.5),
        fontFamily: theme.fonts.regularFont,
      },

      nextImg: {
        height: heightPercentageToDP(3.5),
        width: widthPercentageToDP(7.5),
      },
      subcontainer: {
        paddingHorizontal: widthPercentageToDP(3),
      },
      valueText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(3.9),
        paddingTop: heightPercentageToDP(0.5),
      },
      keyText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.1),
        paddingTop: heightPercentageToDP(3.5),
      },
      headingText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        paddingVertical: heightPercentageToDP(1.5),
        paddingHorizontal: widthPercentageToDP(3),
        fontSize: widthPercentageToDP(4),
      },
      headingContainer: {
        width: '100%',
        backgroundColor: theme.colors.lightgrey,
        marginTop: heightPercentageToDP(3.3),
      },
      inputContainer: {
        marginTop: heightPercentageToDP(3.3),
        paddingHorizontal: widthPercentageToDP(3),
      },
      input: {
        backgroundColor: theme.colors.darkgrey,
        borderRadius: widthPercentageToDP(2),
        paddingBottom: heightPercentageToDP(15),
        paddingLeft: widthPercentageToDP(3),
        color: theme.colors.text,
        borderColor: theme.colors.borderColor,
        borderWidth: widthPercentageToDP(0.3),
        fontFamily: theme.fonts.regularFont,
      },
      buttonBox: {
        alignSelf: 'center',
        marginVertical: heightPercentageToDP(4),
        borderRadius: widthPercentageToDP(2),
      },
      buttonText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.6),
      },
      dropdown: {
        borderRadius: widthPercentageToDP(2),
        paddingVertical: heightPercentageToDP(1.5),
        paddingLeft: widthPercentageToDP(3),
        color: theme.colors.text,
        borderColor: theme.colors.borderColor,
        borderWidth: widthPercentageToDP(0.3),
      },
      placeholderStyle: {
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
      },
      selectedTextStyle: {
        fontSize: widthPercentageToDP(4),
        color: theme.colors.lightgrey,
      },
      iconStyle: {
        height: heightPercentageToDP(3.5),
        width: widthPercentageToDP(7.5),
        marginRight: widthPercentageToDP(3),
      },
      containerStyle: {
        backgroundColor: theme.colors.darkgrey,
      },
      itemTextStyle: {
        color: theme.colors.lightgrey,
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

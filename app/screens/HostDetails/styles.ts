import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { RootState } from 'app/store/slice';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { isTablet } from 'react-native-device-info';

export const useStyle = () => {
  const { colors } = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = useTheme();

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: heightPercentageToDP(3),
      },
      contentContainer: {
        alignItems: 'center',
        paddingBottom: heightPercentageToDP(10),
      },
      flagImg: {
        height: heightPercentageToDP(3),
        width: widthPercentageToDP(6),
        marginLeft: widthPercentageToDP(3),
        alignSelf: 'center',
      },
      promoContainer: {
        paddingHorizontal: widthPercentageToDP(3),
      },
      dropdown: {
        width: widthPercentageToDP(92),
        backgroundColor: theme.colors.glossyBlack,
        borderRadius: widthPercentageToDP(2.5),
        paddingVertical: heightPercentageToDP(1.8),
        paddingLeft: widthPercentageToDP(5.5),
        color: theme.colors.text,
      },
      addContainer: {
        paddingHorizontal: widthPercentageToDP(36.5),
        backgroundColor: theme.colors.glossyBlack,
        paddingVertical: heightPercentageToDP(9),
        alignItems: 'center',
        borderRadius: widthPercentageToDP(2.5),
        marginBottom: heightPercentageToDP(1.5),
      },
      placeholderStyle: {
        fontSize: widthPercentageToDP(4),
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
      addIcon: {},
      containerStyle: {
        backgroundColor: theme.colors.darkgrey,
      },
      itemTextStyle: {
        color: theme.colors.lightgrey,
      },
      heading: {
        marginVertical: heightPercentageToDP(1.5),
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      dropeHeading: {
        marginVertical: heightPercentageToDP(1.5),
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
        paddingHorizontal: widthPercentageToDP(3),
      },
      controller: { marginVertical: heightPercentageToDP(0.5) },
      error: {
        color: 'red',
        paddingVertical: heightPercentageToDP(0.5),
        fontSize: isTablet() ? widthPercentageToDP(2) : undefined,
      },
      text: {
        paddingVertical: heightPercentageToDP(1),
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      subText: {
        width: widthPercentageToDP(79),
        color: theme.colors.grey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      imgtext: {
        color: theme.colors.grey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      textView: {
        alignSelf: 'flex-start',
        paddingHorizontal: widthPercentageToDP(4),
        paddingBottom: heightPercentageToDP(3),
      },
      button: {
        marginTop: heightPercentageToDP(6),
        borderRadius: widthPercentageToDP(1.5),
        alignSelf: 'center',
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

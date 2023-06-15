import { Platform, StyleSheet } from 'react-native';
import { RootState } from 'app/store/slice';
import { useTheme } from 'react-native-paper';
import React from 'react';
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
        paddingTop: heightPercentageToDP(13),
        flex: 1,
      },
      car: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(25),
        zIndex: -1,
      },
      headerText: {
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(6),
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primary,
        paddingHorizontal: widthPercentageToDP(4),
      },
      subheader: {
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(5),
        paddingHorizontal: widthPercentageToDP(5),
        fontFamily: theme.fonts.regularFont,
        color: theme.colors.text,
        paddingTop: heightPercentageToDP(0.7),
        width: widthPercentageToDP(80),
      },

      title: {
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(5),
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.text,
      },
      viewAll: {
        fontSize: isTablet()
          ? widthPercentageToDP(2)
          : widthPercentageToDP(3.2),
        fontFamily: theme.fonts.regularFont,
        color: theme.colors.text,
      },
      empty: {
        width: widthPercentageToDP(40),
        height: heightPercentageToDP(30),
        alignSelf: 'center',
      },
      absolute: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: -1,
      },
      date: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(5),
        color: theme.colors.text,
      },
      headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: widthPercentageToDP(4),
        marginTop: heightPercentageToDP(10),
      },
      thumb: {
        backgroundColor: theme.colors.text,
        borderRadius: widthPercentageToDP(5),
        padding: widthPercentageToDP(1),
        borderWidth: widthPercentageToDP(0.2),
        borderColor: theme.colors.primary,
      },
      buttonText: {
        fontFamily: theme.fonts.regularFont,
      },
      sliderRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      button: { alignSelf: 'center', marginTop: heightPercentageToDP(2) },
      thumbText: {
        fontSize: widthPercentageToDP(2),
        fontFamily: theme.fonts.regularFont,
      },
      divider: {
        borderWidth: widthPercentageToDP(0.2),
        borderColor: theme.colors.text,
        width: widthPercentageToDP(30),
      },
      time: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        paddingHorizontal: widthPercentageToDP(5),
        color: theme.colors.text,
      },
      reset: {
        position: 'absolute',
        top: heightPercentageToDP(5),
        right: widthPercentageToDP(6),
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      modalContainer: { backgroundColor: theme.colors.background, flex: 1 },
    });
  return React.useMemo(() => styles(), [isDark]);
};

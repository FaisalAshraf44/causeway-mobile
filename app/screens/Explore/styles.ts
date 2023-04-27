import { StyleSheet } from 'react-native';
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
      },
      car: {
        position: 'absolute',
        right: 0,
        top: heightPercentageToDP(5),
        width: widthPercentageToDP(70),
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
      },
      search: {
        color: theme.colors.text,
        paddingHorizontal: widthPercentageToDP(2),
        fontFamily: theme.fonts.regularFont,
      },
      searchIcon: {
        width: widthPercentageToDP(5),
        height: heightPercentageToDP(2.5),
      },
      searchView: {
        marginTop: heightPercentageToDP(2),
        paddingVertical: heightPercentageToDP(1.5),
        width: widthPercentageToDP(90),
        alignSelf: 'center',
        opacity: 0.8,
        flexDirection: 'row',
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

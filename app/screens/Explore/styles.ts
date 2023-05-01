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
        fontFamily: theme.fonts.regularFont,
        left: widthPercentageToDP(10),
        position: 'absolute',
        top: Platform.OS == 'ios' ? heightPercentageToDP(1.33) : -1,
        zIndex: 500,
        width: widthPercentageToDP(80),
      },
      searchParent: {
        borderRadius: widthPercentageToDP(2),
        overflow: 'hidden',
        marginTop: heightPercentageToDP(2),
        alignSelf: 'center',
        backgroundColor: 'transparent',
        zIndex: -1,
      },
      imagecard: {
        marginTop: heightPercentageToDP(2),
        backgroundColor: theme.colors.glossyBlack,
        marginHorizontal: widthPercentageToDP(2),
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

      sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: heightPercentageToDP(2),
      },
      searchIcon: {
        width: widthPercentageToDP(5),
        height: heightPercentageToDP(2.5),
        marginHorizontal: widthPercentageToDP(2),
        position: 'absolute',
        top:
          Platform.OS == 'ios'
            ? heightPercentageToDP(1.2)
            : heightPercentageToDP(1.3),
      },
      searchView: {
        width: widthPercentageToDP(90),
        alignSelf: 'center',
        opacity: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: widthPercentageToDP(2),
        overflow: 'hidden',
        height: heightPercentageToDP(5),
        zIndex: -1,
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

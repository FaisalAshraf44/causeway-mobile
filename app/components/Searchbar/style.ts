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
        zIndex: 1,
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

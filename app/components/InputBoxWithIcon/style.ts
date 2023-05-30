import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/slice';
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
      view: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      icon: {
        width: isTablet() ? widthPercentageToDP(4) : widthPercentageToDP(6),
        height: isTablet() ? heightPercentageToDP(3) : heightPercentageToDP(3),
      },
      eye: {
        position: 'absolute',
        right: widthPercentageToDP(3),
      },
      clear: {
        position: 'absolute',
        right: widthPercentageToDP(3),
      },
      input: {
        width: widthPercentageToDP(67),
        marginLeft: widthPercentageToDP(2),
        fontFamily: theme.fonts.regularFont,
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(4),
        paddingVertical: 15,
      },
      textView: {
        paddingHorizontal: widthPercentageToDP(2),
        zIndex: -1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 10,
        width: widthPercentageToDP(92),
        backgroundColor: theme.colors.glossyBlack,
      },
      errorMessage: {
        color: theme.colors.error,
        textAlign: 'center',
        fontSize: isTablet() ? widthPercentageToDP(1.5) : undefined,
      },
    });

  return React.useMemo(() => styles(), [isDark]);
};

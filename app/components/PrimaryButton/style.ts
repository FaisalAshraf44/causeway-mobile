import { Platform, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/slice';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import DeviceInfo, { isTablet } from 'react-native-device-info';
export const useStyle = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const styles = () =>
    StyleSheet.create({
      view: {
        justifyContent: 'center',
        alignItems: 'center',
        width: widthPercentageToDP(90),
        padding: DeviceInfo.isTablet()
          ? widthPercentageToDP(2)
          : widthPercentageToDP(4),
        borderRadius: widthPercentageToDP(3),
        zIndex: -1,
      },
      activityIndicator: {
        position: 'absolute',
        right: widthPercentageToDP(3),
      },
      text: {
        fontFamily: theme.fonts.semiBoldFont,
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(4),
      },
      iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

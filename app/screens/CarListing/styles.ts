import { RootState } from 'app/store/slice';
import { isTablet } from 'app/utils/extras';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

export const useStyle = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = useTheme();
  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      subContainer: {},
      imagecard: {
        marginTop: heightPercentageToDP(2),
        backgroundColor: theme.colors.glossyBlack,
        marginHorizontal: widthPercentageToDP(2),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

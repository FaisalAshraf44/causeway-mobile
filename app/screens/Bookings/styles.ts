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
      },
      empty: {
        width: widthPercentageToDP(40),
        height: heightPercentageToDP(30),
        alignSelf: 'center',
      },
      parent: { flex: 1, backgroundColor: theme.colors.background },
      subheader: {
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(5),
        paddingHorizontal: widthPercentageToDP(5),
        fontFamily: theme.fonts.regularFont,
        color: theme.colors.text,
        paddingTop: heightPercentageToDP(0.7),
      },
      title: {
        fontWeight: 'bold',
        color: colors.primary,
      },
      tabBar: {
        backgroundColor: theme.colors.background,
        paddingTop: heightPercentageToDP(6),
      },
      tabbarIndicator: {
        backgroundColor: 'red',
      },
      tabBarLabel: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
      },
      cardContainer: {
        paddingVertical: heightPercentageToDP(1),
      },
      containerFlatlist: {
        paddingHorizontal: widthPercentageToDP(4),
        paddingTop: heightPercentageToDP(2),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

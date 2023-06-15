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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      },
      imagecard: {
        marginTop: heightPercentageToDP(2),
        backgroundColor: theme.colors.glossyBlack,
        marginHorizontal: widthPercentageToDP(2),
      },
      empty: {
        width: widthPercentageToDP(40),
        height: heightPercentageToDP(30),
        alignSelf: 'center',
      },
      subheader: {
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(5),
        paddingHorizontal: widthPercentageToDP(5),
        fontFamily: theme.fonts.regularFont,
        color: theme.colors.text,
        paddingTop: heightPercentageToDP(0.7),
      },
      subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        marginVertical: heightPercentageToDP(5),
      },

      flatlist: {
        paddingBottom: heightPercentageToDP(15),
        // paddingHorizontal: widthPercentageToDP(1),
      },
      title: {
        fontWeight: 'bold',
        color: colors.primary,
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

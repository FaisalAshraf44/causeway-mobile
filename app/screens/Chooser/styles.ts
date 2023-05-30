import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { RootState } from 'app/store/slice';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

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
        backgroundColor: theme.colors.background,
      },
      title: {
        fontWeight: 'bold',
        color: colors.primary,
      },
      logo: {
        height: heightPercentageToDP(10),
        width: widthPercentageToDP(80),
        marginBottom: heightPercentageToDP(3),
      },
      loginButton: {
        backgroundColor: theme.colors.glossyBlack,
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(4),
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: widthPercentageToDP(90),
      },
      halfDivider: {
        width: widthPercentageToDP(27),
        borderWidth: heightPercentageToDP(0.02),
        borderColor: theme.colors.lightgrey,
      },
      socialImageContainer: {
        marginTop: heightPercentageToDP(3),
        padding: widthPercentageToDP(2),
        backgroundColor: theme.colors.text,
        borderRadius: widthPercentageToDP(2),
        paddingHorizontal: widthPercentageToDP(6),
      },
      socialImage: {
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(8),
      },
      headphone: {
        height: heightPercentageToDP(2),
        width: widthPercentageToDP(6),
      },
      text: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        paddingHorizontal: widthPercentageToDP(1),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

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
        paddingTop: heightPercentageToDP(10),
      },
      contentContainer: {
        alignItems: 'center',
        paddingBottom: heightPercentageToDP(10),
      },
      title: {
        fontWeight: 'bold',
        color: colors.primary,
      },
      logo: {
        height: heightPercentageToDP(10),
        width: widthPercentageToDP(20),
        alignSelf: 'center',
        marginBottom: heightPercentageToDP(3),
      },
      heading: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(5),
        alignSelf: 'flex-start',
        paddingHorizontal: widthPercentageToDP(4),
        marginBottom: heightPercentageToDP(1),
      },
      controller: { marginVertical: heightPercentageToDP(0.5) },
      error: {
        color: 'red',
        paddingVertical: heightPercentageToDP(0.5),
        fontSize: isTablet() ? widthPercentageToDP(2) : undefined,
      },
      text: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        alignSelf: 'flex-start',
        paddingHorizontal: widthPercentageToDP(4),
        marginBottom: heightPercentageToDP(1),
      },
      socialImageContainer: {
        marginTop: heightPercentageToDP(2),
        padding: widthPercentageToDP(2),
        backgroundColor: theme.colors.text,
        borderRadius: widthPercentageToDP(2),
        paddingHorizontal: widthPercentageToDP(6),
      },
      socialImage: {
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(8),
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
      loginButton: {
        backgroundColor: theme.colors.glossyBlack,
        marginTop: heightPercentageToDP(2),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

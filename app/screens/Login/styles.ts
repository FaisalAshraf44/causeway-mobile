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
      iconStyle: {
        borderColor: 'red',
        borderRadius: widthPercentageToDP(1),
        backgroundColor: theme.colors.glossyBlack,
      },
      innerIcon: {
        borderColor: 'white',
        borderRadius: widthPercentageToDP(1),
      },
      bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: widthPercentageToDP(100),
        paddingHorizontal: widthPercentageToDP(5),
        marginVertical: heightPercentageToDP(2),
      },
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: heightPercentageToDP(10),
      },
      contentContainer: {
        alignItems: 'center',
        paddingBottom: heightPercentageToDP(10),
        height: heightPercentageToDP(85),
      },
      logo: {
        height: heightPercentageToDP(10),
        width: widthPercentageToDP(20),
        alignSelf: 'center',
        marginBottom: heightPercentageToDP(3),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

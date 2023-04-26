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
        alignItems: 'center',
        paddingTop: heightPercentageToDP(20),
        backgroundColor: theme.colors.background,
      },
      image: {
        width: widthPercentageToDP(75),
        height: heightPercentageToDP(26),
      },
      heading: {
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(6),
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.text,
        paddingVertical: heightPercentageToDP(1),
        paddingTop: heightPercentageToDP(4),
      },
      dots: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: heightPercentageToDP(15),
        alignSelf: 'center',
      },
      longDot: {
        backgroundColor: theme.colors.primary,
        padding: widthPercentageToDP(1),
        paddingHorizontal: widthPercentageToDP(2.5),
        borderRadius: widthPercentageToDP(2),
        marginHorizontal: widthPercentageToDP(0.2),
      },
      dot: {
        backgroundColor: theme.colors.text,
        padding: widthPercentageToDP(1),
        borderRadius: widthPercentageToDP(2),
        marginHorizontal: widthPercentageToDP(0.2),
      },
      paragraph: {
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(4),
        fontFamily: theme.fonts.regularFont,
        color: theme.colors.text,
        width: widthPercentageToDP(90),
        textAlign: 'center',
      },
      skip: {
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(5),
        fontFamily: theme.fonts.regularFont,
        color: theme.colors.text,
      },

      bottomBar: {
        bottom: heightPercentageToDP(5),
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        width: widthPercentageToDP(100),
        justifyContent: 'space-between',
      },
      button: {
        width: undefined,
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

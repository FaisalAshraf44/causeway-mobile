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
      container: {
        backgroundColor: theme.colors.glossyBlack,
        padding: widthPercentageToDP(3),
        borderRadius: widthPercentageToDP(3),
        paddingHorizontal: widthPercentageToDP(5),
      },
      image: {
        width: '67%',
        height: heightPercentageToDP(12),
      },
      imageContainer: {
        padding: widthPercentageToDP(3),
        backgroundColor: theme.colors.background,
        borderRadius: widthPercentageToDP(2),
      },
      heading: {
        paddingTop: heightPercentageToDP(1.5),
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.text,
        width: '98%',
      },
      bottomRow: {
        marginTop: heightPercentageToDP(1.5),
        flexDirection: 'row',
        alignItems: 'center',
      },
      subHeading: {
        paddingTop: heightPercentageToDP(1),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.text,
        width: '98%',
      },
      timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      adjustment: {
        paddingTop: heightPercentageToDP(0.85),
        paddingRight: widthPercentageToDP(1),
      },
      miniText: {
        paddingTop: heightPercentageToDP(1),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        color: theme.colors.lightgrey,
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

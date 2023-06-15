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
        padding: widthPercentageToDP(5),
      },
      title: {
        fontSize: widthPercentageToDP(4.5),
        color: theme.colors.text,
        fontFamily: theme.fonts.boldFont,
      },
      description: {
        marginVertical: heightPercentageToDP(1),
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
      },
      free: {
        color: '#EE2F3F',
        backgroundColor: '#FFC5CA',
        paddingHorizontal: widthPercentageToDP(5),
        paddingVertical: heightPercentageToDP(0.8),
        borderRadius: widthPercentageToDP(1),
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(2.3),
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: theme.colors.primary,
      },
      apply: {
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.text,
        fontSize: widthPercentageToDP(3.2),
      },
      applyContainer: {
        alignSelf: 'flex-end',
        padding: widthPercentageToDP(2),
        backgroundColor: theme.colors.primary,
        borderRadius: widthPercentageToDP(2),
        paddingHorizontal: widthPercentageToDP(5),
      },

      row: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: heightPercentageToDP(1),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

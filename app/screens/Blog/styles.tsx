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
      mainView: {
        backgroundColor: theme.colors.background,
        flex: 1,
      },
      subView: {
        paddingTop: heightPercentageToDP(3),
        paddingHorizontal: widthPercentageToDP(4),
      },
      imageContainer: {
        borderRadius: widthPercentageToDP(3),
        backgroundColor: theme.colors.glossyBlack,
        paddingVertical: heightPercentageToDP(6.5),
        borderWidth: widthPercentageToDP(0.1),
        borderColor: theme.colors.lightgrey,
      },
      img: {
        width: widthPercentageToDP(74),
        height: heightPercentageToDP(18),
        alignSelf: 'center',
      },
      headingText: {
        paddingTop: heightPercentageToDP(3),
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.text,
      },
      subText: {
        paddingTop: heightPercentageToDP(2.3),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.3),
        color: '#E6E6E6',
        width: widthPercentageToDP(90),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

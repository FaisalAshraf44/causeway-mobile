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
      img: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(34),
        borderBottomRightRadius: widthPercentageToDP(3),
      },
      headingText: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4.5),
        color: theme.colors.text,
      },
      subText: {
        paddingTop: heightPercentageToDP(0.3),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.grey,
      },
      cardContainer: {
        marginTop: heightPercentageToDP(2.5),
        paddingTop: heightPercentageToDP(2),
        paddingBottom: heightPercentageToDP(4),
        backgroundColor: theme.colors.glossyBlack,
        borderRadius: widthPercentageToDP(2),
      },
      iconImage: {
        width: widthPercentageToDP(6.5),
        height: heightPercentageToDP(3.5),
      },
      backIconImage: {
        marginTop: heightPercentageToDP(6),
        width: widthPercentageToDP(7.5),
        height: heightPercentageToDP(3.2),
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: widthPercentageToDP(3),
      },
      subTextPadding: {
        paddingHorizontal: widthPercentageToDP(3),
      },
      cardSubText: {
        paddingTop: heightPercentageToDP(1),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.8),
        color: theme.colors.grey,
        width: widthPercentageToDP(72),
      },
      button: {
        marginVertical: heightPercentageToDP(2.5),
        borderRadius: widthPercentageToDP(1.5),
        alignSelf: 'center',
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

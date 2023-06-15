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
      titleSubText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.lightgrey,
        paddingVertical: heightPercentageToDP(1),
      },
      titleText: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.dullWhite,
        paddingVertical: heightPercentageToDP(2),
      },
      paddingTop: {
        paddingTop: heightPercentageToDP(3),
      },
      paddingBott: {
        paddingBottom: heightPercentageToDP(1.5),
      },
      paddingHor: {
        paddingHorizontal: widthPercentageToDP(2),
      },
      subView: {
        paddingHorizontal: widthPercentageToDP(3),
        paddingTop: heightPercentageToDP(6),
      },
      profileView: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      subText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.lightgrey,
        textAlign: 'center',
        paddingTop: heightPercentageToDP(3),
      },
      dateText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.lightgrey,
        paddingTop: heightPercentageToDP(0.5),
        paddingBottom: heightPercentageToDP(2),
      },
      lineInnerView: {
        borderWidth: widthPercentageToDP(0.05),
        borderColor: theme.colors.glossyBlack,
      },
      lineOuterView: {
        paddingTop: heightPercentageToDP(2.5),
      },
      readText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        color: theme.colors.lightgrey,
      },
      nameText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.2),
        color: theme.colors.text,
        paddingTop: heightPercentageToDP(2),
      },
      profileImg: {
        width: widthPercentageToDP(17),
        height: heightPercentageToDP(9),
      },
      penImage: {
        width: widthPercentageToDP(6.5),
        height: heightPercentageToDP(3.5),
      },
      heartImage: {
        width: widthPercentageToDP(9),
        height: heightPercentageToDP(5),
      },
      button: {
        backgroundColor: theme.colors.darkgrey,
        paddingHorizontal: widthPercentageToDP(2.5),
        paddingVertical: heightPercentageToDP(0.8),
        borderColor: theme.colors.lightgrey,
        borderWidth: widthPercentageToDP(0.2),
        borderRadius: widthPercentageToDP(1.6),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

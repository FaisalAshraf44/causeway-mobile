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
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      subContainer: {
        flex: 1,
        paddingTop: heightPercentageToDP(10),
        paddingHorizontal: widthPercentageToDP(3),
        alignSelf: 'center',
      },
      titleText: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(5),
        color: theme.colors.text,
      },
      profileText: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(3.7),
        color: theme.colors.text,
      },
      titleSubText: {
        paddingTop: heightPercentageToDP(1),
        paddingBottom: heightPercentageToDP(2),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.lightgrey,
      },
      profileSubText: {
        fontFamily: theme.fonts.regularFont,
        paddingTop: heightPercentageToDP(0.5),
        fontSize: widthPercentageToDP(3.3),
        color: theme.colors.lightgrey,
        width: widthPercentageToDP(65),
      },
      informativeText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.lightgrey,
      },
      policyText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: '#523FB2',
      },
      buttonsContainer: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingVertical: heightPercentageToDP(3),
      },
      skipContainer: {
        paddingTop: heightPercentageToDP(3),
      },
      skipText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.primary,
      },
      informativeTextContainer: {
        paddingTop: heightPercentageToDP(3),
      },
      cardContainer: {
        backgroundColor: theme.colors.glossyBlack,
        borderRadius: widthPercentageToDP(2),
        paddingBottom: heightPercentageToDP(4),
        paddingTop: heightPercentageToDP(1),
      },
      button: {
        borderRadius: widthPercentageToDP(1.7),
      },
      txtstyle: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.8),
      },
      cardSubContainer: {
        paddingVertical: heightPercentageToDP(0.3),
        paddingHorizontal: widthPercentageToDP(3),
      },
      cardImage: {
        width: widthPercentageToDP(7.3),
        height: heightPercentageToDP(3.5),
      },
      horPadding: {
        paddingHorizontal: widthPercentageToDP(2),
      },
      rowContainer: {
        paddingVertical: heightPercentageToDP(1.2),
        flexDirection: 'row',
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

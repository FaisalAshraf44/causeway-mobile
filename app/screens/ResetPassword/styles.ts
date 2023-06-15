import { RootState } from 'app/store/slice';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { isTablet } from 'react-native-device-info';
export const useStyle = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const styles = () =>
    StyleSheet.create({
      contentContainer: { paddingBottom: heightPercentageToDP(20) },

      containerSuccessful: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      },
      Img: {
        paddingTop: heightPercentageToDP(13),
        height: heightPercentageToDP(11),
        width: widthPercentageToDP(22),
        alignSelf: 'center',
      },
      subcontainer: {
        paddingTop: heightPercentageToDP(5),
        paddingHorizontal: widthPercentageToDP(3),
      },
      text1: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      text2: {
        paddingTop: heightPercentageToDP(1),
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
      },
      controller: {
        marginTop: heightPercentageToDP(2),
      },
      error: {
        color: 'red',
        paddingVertical: heightPercentageToDP(0.5),
        fontSize: isTablet() ? widthPercentageToDP(2) : undefined,
      },
      input: {
        width: '100%',
        borderRadius: widthPercentageToDP(1.5),
        borderColor: theme.colors.lightgrey,
        borderWidth: widthPercentageToDP(0.2),
        backgroundColor: theme.colors.darkgrey,
      },
      inputtext: {
        fontSize: widthPercentageToDP(3.48),
      },
      button: {
        marginTop: heightPercentageToDP(4),
        borderRadius: widthPercentageToDP(1.5),
        alignSelf: 'center',
      },
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: heightPercentageToDP(7),
      },
      textSuccessful: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
        width: widthPercentageToDP(55),
        textAlign: 'center',
      },
      txtstyle: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.7),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

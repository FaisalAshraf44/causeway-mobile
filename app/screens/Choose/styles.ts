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
      container: {
        backgroundColor: theme.colors.background,
        paddingTop: heightPercentageToDP(3),
        flex: 1,
      },
      scroll: { zIndex: 20, height: heightPercentageToDP(70) },
      subcontainer: {
        paddingHorizontal: widthPercentageToDP(3),
        paddingTop: widthPercentageToDP(7),
      },

      Img: {
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(8),
      },
      optionmaincontainer: {
        paddingTop: heightPercentageToDP(1.5),
      },
      optionsubcontainer: {
        marginTop: heightPercentageToDP(1),
        paddingHorizontal: widthPercentageToDP(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.darkgrey,
        paddingVertical: heightPercentageToDP(2.6),
        borderRadius: widthPercentageToDP(2),
      },
      map: {
        height: heightPercentageToDP(30),
        width: widthPercentageToDP(80),
        borderRadius: widthPercentageToDP(3),
        marginVertical: heightPercentageToDP(1),
        alignSelf: 'center',
      },
      optionsContainer: {
        // paddingHorizontal: widthPercentageToDP(2),

        backgroundColor: theme.colors.darkgrey,
        paddingVertical: heightPercentageToDP(0),
        marginBottom: heightPercentageToDP(1),
        borderRadius: widthPercentageToDP(2),
      },

      outerRadio: {
        padding: widthPercentageToDP(1),
        borderWidth: widthPercentageToDP(0.3),
        borderColor: theme.colors.text,
        borderRadius: widthPercentageToDP(5),
      },
      innerRadio: {
        padding: widthPercentageToDP(2),
        borderRadius: widthPercentageToDP(10),
      },
      imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      flexColumn: {
        flexDirection: 'column',
        paddingLeft: widthPercentageToDP(1.6),
      },
      text1: {
        color: theme.colors.text,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(5),
      },
      text2: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        width: widthPercentageToDP(75),
        paddingTop: heightPercentageToDP(0.5),
        fontSize: widthPercentageToDP(3.5),
      },
      text3: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
        paddingLeft: widthPercentageToDP(1.6),
      },
      text4: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      text5: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        paddingVertical: heightPercentageToDP(0.25),
        maxWidth: widthPercentageToDP(60),
      },
      circleImage: {
        height: heightPercentageToDP(2),
        width: widthPercentageToDP(5),
      },
      button: {
        position: 'absolute',
        zIndex: 1,
        bottom: heightPercentageToDP(3),
        alignSelf: 'center',
        borderRadius: widthPercentageToDP(1.5),
      },
      txtstyle: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

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
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: heightPercentageToDP(3),
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: widthPercentageToDP(3),
      },
      absolute: {
        backgroundColor: theme.colors.glossyBlack,
        position: 'absolute',
        bottom: 0,
        width: widthPercentageToDP(100),
        paddingVertical: heightPercentageToDP(2),
      },
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
        marginTop: heightPercentageToDP(2),
        paddingHorizontal: widthPercentageToDP(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.darkgrey,
        paddingVertical: heightPercentageToDP(2.6),
        borderRadius: widthPercentageToDP(2),
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
        fontSize: widthPercentageToDP(4.7),
      },
      text2: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        width: widthPercentageToDP(75),
        paddingTop: heightPercentageToDP(0.5),
        fontSize: widthPercentageToDP(3),
      },
      text3: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.3),
        paddingLeft: widthPercentageToDP(1.6),
      },
      text4: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.3),
      },
      text5: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(2.5),
      },
      circleImage: {
        height: heightPercentageToDP(2),
        width: widthPercentageToDP(5),
      },
      button: {
        // marginTop: heightPercentageToDP(2),
        alignSelf: 'flex-end',
        borderRadius: widthPercentageToDP(1.5),
        paddingHorizontal: 0,
        width: widthPercentageToDP(30),
        marginRight: widthPercentageToDP(3),
        paddingVertical: heightPercentageToDP(1),
      },
      priceReduction: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        color: 'red',
        textDecorationColor: 'red',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        paddingHorizontal: widthPercentageToDP(3),
        marginTop:
          Platform.OS == 'ios'
            ? heightPercentageToDP(1)
            : heightPercentageToDP(0.2),
        marginBottom: heightPercentageToDP(1),
      },

      txtstyle: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.7),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

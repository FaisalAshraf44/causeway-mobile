import { Platform, StyleSheet } from 'react-native';
import { RootState } from 'app/store/slice';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { isTablet } from 'react-native-device-info';

export const useStyle = () => {
  const theme = useTheme();

  const styles = () =>
    StyleSheet.create({
      container: { flex: 1 },
      map: {
        // height: heightPercentageToDP(7),
        // flex: 1,
        height:
          Platform.OS == 'ios'
            ? heightPercentageToDP(84)
            : heightPercentageToDP(77),
        position: 'absolute',
        width: widthPercentageToDP(100),
        bottom: 0,
        zIndex: -1,
      },
      confirm: {
        position: 'absolute',
        bottom: heightPercentageToDP(5),
        zIndex: 1,
        alignSelf: 'center',
      },
      locateMeContainer: {
        right: widthPercentageToDP(5),
        bottom: heightPercentageToDP(16),
        padding: isTablet() ? widthPercentageToDP(1) : widthPercentageToDP(3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.glossyBlack,
        borderRadius: widthPercentageToDP(3),
        position: 'absolute',
      },
      list: {
        position: 'absolute',
        top:
          Platform.OS == 'android'
            ? heightPercentageToDP(16)
            : heightPercentageToDP(17),
        width: widthPercentageToDP(90),
        alignSelf: 'center',
        zIndex: 99,
      },
      inputContainer: {
        top:
          Platform.OS == 'android'
            ? heightPercentageToDP(3)
            : heightPercentageToDP(4),
        width: widthPercentageToDP(90),
        alignSelf: 'center',
        borderColor: theme.colors.text,
      },
      searchbar: {
        position: 'absolute',
        bottom: heightPercentageToDP(15),
        borderRadius: widthPercentageToDP(3),
        alignSelf: 'center',
      },
      subHeadingBlack: {
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(3),
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        // paddingTop:
        //   Platform.OS == 'android' ? heightPercentageToDP(0.4) : undefined,
        textAlign: 'center',
        paddingHorizontal: widthPercentageToDP(1),
      },
      icon: {
        height: isTablet() ? widthPercentageToDP(4) : heightPercentageToDP(3),
        width: isTablet() ? widthPercentageToDP(4) : widthPercentageToDP(6),
        borderRadius: widthPercentageToDP(6),
      },
      confirmText: {
        fontSize: isTablet()
          ? widthPercentageToDP(2)
          : heightPercentageToDP(2.2),
        textAlignVertical: 'center',
      },
    });
  return React.useMemo(() => styles(), []);
};

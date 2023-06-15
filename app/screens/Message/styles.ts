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
  const { colors } = useTheme();
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        // justifyContent: 'center',
        paddingTop:
          Platform.OS == 'android'
            ? heightPercentageToDP(6)
            : heightPercentageToDP(3.5),

        backgroundColor: theme.colors.background,
      },
      gifted: {
        backgroundColor: theme.colors.background,
        paddingVertical: heightPercentageToDP(2),
      },
      activity: {
        position: 'absolute',
        alignSelf: 'center',
        top: heightPercentageToDP(50),
      },
      bubble: {
        paddingHorizontal: widthPercentageToDP(8),
        paddingVertical: heightPercentageToDP(1.5),
        borderRadius: widthPercentageToDP(4),
        backgroundColor: theme.colors.glossyBlack,
      },
      containerBubble: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      time: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(2.5),
        textAlignVertical: 'bottom',
        paddingTop: heightPercentageToDP(2),
        marginHorizontal: widthPercentageToDP(2),
      },
      flatlist: {
        marginTop: Platform.OS == 'ios' ? heightPercentageToDP(1.5) : undefined,
      },
      title: {
        fontWeight: 'bold',
        color: colors.primary,
      },
      animation: {
        width: widthPercentageToDP(70),
        height: heightPercentageToDP(35),
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: widthPercentageToDP(3),
        backgroundColor: 'white',
        width: widthPercentageToDP(90),
        alignSelf: 'center',
        marginVertical: heightPercentageToDP(0.5),
        borderRadius: widthPercentageToDP(3),
      },
      name: {
        maxWidth: widthPercentageToDP(60),
        fontFamily: theme.fonts.semiBoldFont,
        fontSize: isTablet()
          ? widthPercentageToDP(2)
          : widthPercentageToDP(3.5),
        alignSelf: 'flex-start',
      },
      message: {
        width: widthPercentageToDP(50),
        fontFamily: theme.fonts.regularFont,
        fontSize: isTablet()
          ? widthPercentageToDP(1.5)
          : widthPercentageToDP(3),
        alignSelf: 'flex-start',
        color: '#BDBDBD',
        textAlign: 'left',
      },
      messageBubble: {
        fontFamily: theme.fonts.regularFont,
        fontSize: isTablet()
          ? widthPercentageToDP(1.5)
          : widthPercentageToDP(3.5),
        alignSelf: 'flex-start',
        color: theme.colors.text,
        textAlign: 'left',
      },
      image: {
        height: heightPercentageToDP(7),
        width: widthPercentageToDP(14),
        borderRadius: widthPercentageToDP(10),
        marginHorizontal: widthPercentageToDP(3),
      },
      font: {
        fontFamily: theme.fonts.regularFont,
        color: theme.colors.text,
        width: widthPercentageToDP(50),
      },
      send: {
        fontFamily: theme.fonts.regularFont,
        color: 'rgba(238, 47, 63, 1)',
        fontSize: widthPercentageToDP(4),
        marginRight: widthPercentageToDP(4),
      },
      messageContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: widthPercentageToDP(3),
        justifyContent: 'space-between',
        paddingLeft: widthPercentageToDP(4),
        paddingVertical: heightPercentageToDP(0.6),
        borderRadius: widthPercentageToDP(7),
        backgroundColor: theme.colors.glossyBlack,
        position: 'absolute',
        right: Platform.OS == 'ios' ? undefined : widthPercentageToDP(2),
        left: Platform.OS == 'ios' ? undefined : widthPercentageToDP(2),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

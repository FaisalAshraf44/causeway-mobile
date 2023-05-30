import { RootState } from 'app/store/slice';
import React from 'react';
import { StyleSheet } from 'react-native';
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
      },
      subcontainer: {
        paddingHorizontal: widthPercentageToDP(3),
      },
      carImage: {
        marginTop: heightPercentageToDP(11),
        height: heightPercentageToDP(17),
        width: widthPercentageToDP(72),
        alignSelf: 'center',
      },
      nameText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4.2),
      },

      segmentSubContainer: {
        paddingTop: widthPercentageToDP(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      bookingText: {
        color: 'white',
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.3),
      },
      calanderImage: {
        height: heightPercentageToDP(3),
        width: widthPercentageToDP(6),
      },
      dateText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.2),
        paddingVertical: heightPercentageToDP(0.4),
      },
      locText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.2),
        paddingLeft: heightPercentageToDP(2),
      },
      dateTextContainer: {
        paddingLeft: widthPercentageToDP(3),
      },
      calenderContainer: {
        paddingTop: heightPercentageToDP(0),
        flexDirection: 'row',
        alignItems: 'center',
      },
      locationContainer: {
        paddingTop: heightPercentageToDP(1),
        flexDirection: 'row',
        alignItems: 'center',
      },

      subicon: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: widthPercentageToDP(2),
        paddingTop: heightPercentageToDP(2),
      },
      iconText: {
        color: 'white',
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(2.8),
        paddingVertical: widthPercentageToDP(2.5),
      },
      buttonView: {
        backgroundColor: theme.colors.glossyBlack,
        width: '100%',
        paddingVertical: heightPercentageToDP(1),
        bottom: 0,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: widthPercentageToDP(3),
      },
      button: {
        width: widthPercentageToDP(40),
        borderRadius: 6,
      },
      font: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      viewAllText: { color: 'red', fontFamily: theme.fonts.regularFont },
      features: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: widthPercentageToDP(3),
        paddingTop: heightPercentageToDP(1.5),
      },
      divider: {
        borderWidth: heightPercentageToDP(0.04),
        borderColor: theme.colors.glossyBlack,
        marginVertical: heightPercentageToDP(1.2),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

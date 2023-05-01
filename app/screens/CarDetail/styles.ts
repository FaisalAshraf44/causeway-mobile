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
        color: 'white',
        fontFamily: theme.fonts.boldFont,
        fontSize: heightPercentageToDP(2.8),
      },
      segmentContainer: {
        marginTop: heightPercentageToDP(4),
      },
      segmentSubContainer: {
        paddingTop: widthPercentageToDP(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      bookingText: {
        color: 'white',
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.5),
      },
      calanderImage: {
        height: heightPercentageToDP(3),
        width: widthPercentageToDP(6),
      },
      dateText: {
        color: 'white',
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.2),
        paddingVertical: heightPercentageToDP(0.4),
      },
      locText: {
        color: 'white',
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
      basicsContainer: {
        marginTop: heightPercentageToDP(5),
      },
      subicon: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: widthPercentageToDP(4.2),
        paddingTop: heightPercentageToDP(2),
      },
      iconText: {
        color: 'white',
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(2.8),
        paddingVertical: widthPercentageToDP(2.5),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

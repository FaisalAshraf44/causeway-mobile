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
      },
      subcontainer: {
        paddingHorizontal: widthPercentageToDP(3),
      },
      carImage: {
        marginTop: heightPercentageToDP(11),
        height: heightPercentageToDP(20),
        width: widthPercentageToDP(72),
        alignSelf: 'center',
      },
      scrollContainer: {
        paddingBottom: heightPercentageToDP(20),
        paddingHorizontal: widthPercentageToDP(2),
      },
      nameText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4.2),
      },
      icon: {
        height: heightPercentageToDP(2.3),
        width: widthPercentageToDP(7),
        marginHorizontal: widthPercentageToDP(2),
      },
      segmentSubContainer: {
        paddingTop: widthPercentageToDP(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        // maxWidth: '70%',
      },
      dateTextContainer: {
        paddingLeft: widthPercentageToDP(3),
      },
      headphone: {
        height: heightPercentageToDP(2),
        width: widthPercentageToDP(6),
      },
      text: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        paddingHorizontal: widthPercentageToDP(1),
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: widthPercentageToDP(90),
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
        bottom:
          Platform.OS == 'ios'
            ? heightPercentageToDP(3)
            : heightPercentageToDP(1),
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
      subFeatureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: heightPercentageToDP(1),
      },
      featureModalContainer: {
        backgroundColor: theme.colors.glossyBlack,
        paddingVertical: heightPercentageToDP(1.5),
        width: widthPercentageToDP(85),
        minHeight: heightPercentageToDP(40),
        borderRadius: widthPercentageToDP(3),
        alignSelf: 'center',
      },
      feature: {
        fontFamily: theme.fonts.regularFont,
        marginHorizontal: widthPercentageToDP(1.5),
        color: theme.colors.text,
      },
      divider: {
        borderWidth: heightPercentageToDP(0.04),
        borderColor: theme.colors.glossyBlack,
        marginVertical: heightPercentageToDP(1.2),
      },
      time: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        paddingHorizontal: widthPercentageToDP(5),
        color: theme.colors.text,
      },
      reset: {
        position: 'absolute',
        top: heightPercentageToDP(5),
        right: widthPercentageToDP(6),
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      modalContainer: { backgroundColor: theme.colors.background, flex: 1 },
      date: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(5),
        color: theme.colors.text,
      },
      headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: widthPercentageToDP(4),
        marginTop: heightPercentageToDP(10),
      },
      thumb: {
        backgroundColor: theme.colors.text,
        borderRadius: widthPercentageToDP(5),
        padding: widthPercentageToDP(1),
        borderWidth: widthPercentageToDP(0.2),
        borderColor: theme.colors.primary,
      },
      buttonText: {
        fontFamily: theme.fonts.regularFont,
      },
      sliderRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      thumbText: {
        fontSize: widthPercentageToDP(2),
        fontFamily: theme.fonts.regularFont,
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

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
        paddingHorizontal: widthPercentageToDP(3),
        paddingVertical: heightPercentageToDP(2),
      },
      paddingVer: {
        paddingVertical: heightPercentageToDP(2),
      },
      paddingHor: {
        paddingHorizontal: widthPercentageToDP(1.4),
      },
      dottedLine: {
        marginLeft: widthPercentageToDP(4.4),
        borderStyle: 'dotted',
        height: heightPercentageToDP(2.5),
        borderLeftWidth: widthPercentageToDP(0.3),
        borderColor: theme.colors.text,
      },
      subView: {
        backgroundColor: theme.colors.glossyBlack,
        paddingHorizontal: widthPercentageToDP(2),
        paddingVertical: heightPercentageToDP(1.5),
        borderColor: theme.colors.lightgrey,
        borderRadius: widthPercentageToDP(2),
        borderWidth: 1,
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      iconSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: widthPercentageToDP(48),
        paddingVertical: heightPercentageToDP(1),
      },
      nameText: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.text,
      },
      typeText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.text,
      },
      viewAllText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        color: theme.colors.text,
        paddingVertical: heightPercentageToDP(0.5),
      },
      scheduleFairText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        color: theme.colors.text,
      },
      locationText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        color: theme.colors.text,
        paddingVertical: heightPercentageToDP(0.36),
      },
      map: {
        width: '100%',
        height: heightPercentageToDP(25),
        marginVertical: heightPercentageToDP(2),
      },
      mapContainer: {
        borderRadius: widthPercentageToDP(9),
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'red',
        marginVertical: heightPercentageToDP(2),
      },
      dateText: {
        fontFamily: theme.fonts.mediumFont,
        fontSize: widthPercentageToDP(3.3),
        paddingVertical: heightPercentageToDP(0.5),
        color: theme.colors.text,
      },
      priceText: {
        fontFamily: theme.fonts.boldFont,
        paddingTop: heightPercentageToDP(0.6),
        fontSize: widthPercentageToDP(3.7),
        color: theme.colors.text,
      },
      textContainer: {
        paddingHorizontal: widthPercentageToDP(2),
      },
      modelText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(2.5),
        color: theme.colors.text,
      },
      carImage: {
        height: heightPercentageToDP(9),
        width: widthPercentageToDP(17),
      },
      lineInnerView: {
        borderWidth: widthPercentageToDP(0.05),
        borderColor: theme.colors.lightgrey,
      },
      lineOuterView: {
        paddingVertical: heightPercentageToDP(1),
      },
      icon: {
        height: heightPercentageToDP(3.3),
        width: widthPercentageToDP(6.4),
      },
      pickupReturnIcon: {
        height: heightPercentageToDP(5.3),
        width: widthPercentageToDP(9.4),
      },
      iconView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      pickupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      dateView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: heightPercentageToDP(0.2),
      },
      nameModelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '73.6%',
      },
      activeContainer: {
        backgroundColor: '#5E5E5E',
        borderRadius: widthPercentageToDP(1),
        paddingHorizontal: widthPercentageToDP(4.2),
        paddingVertical: heightPercentageToDP(0.6),
      },
      textView: {
        paddingVertical: heightPercentageToDP(0.5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

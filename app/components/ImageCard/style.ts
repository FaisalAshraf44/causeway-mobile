import { Platform, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/slice';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import DeviceInfo, { isTablet } from 'react-native-device-info';
export const useStyle = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const styles = () =>
    StyleSheet.create({
      view: {
        backgroundColor: theme.colors.glossyBlack,
        borderRadius: widthPercentageToDP(2.5),
        paddingVertical: heightPercentageToDP(2),
        paddingHorizontal: widthPercentageToDP(3),
      },
      distance: {
        backgroundColor: '#3C3C3C',
        borderColor: 'transparent',
        borderWidth: widthPercentageToDP(0.3),
        borderRadius: widthPercentageToDP(2.4),
        padding: widthPercentageToDP(2),
      },
      distanceText: {
        color: 'white',
        fontFamily: theme.fonts.regularFont,
        fontSize: heightPercentageToDP(1.6),
      },
      flexrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      Image_for_heart_star: {
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(8),
        marginLeft: widthPercentageToDP(2),
      },
      carImage: {
        marginVertical: heightPercentageToDP(1),
        height: heightPercentageToDP(15),
        width: widthPercentageToDP(72),
        alignSelf: 'center',
      },
      nameParent: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      nameText: {
        fontFamily: theme.fonts.boldFont,
        color: 'white',
        fontSize: widthPercentageToDP(6.4),
      },
      ratingText: {
        fontFamily: theme.fonts.regularFont,
        color: 'white',
        fontSize: widthPercentageToDP(4.4),
        marginLeft: widthPercentageToDP(2),
      },
      descriptionText: {
        color: 'white',
        fontFamily: theme.fonts.regularFont,
        marginTop: heightPercentageToDP(1),
      },
      priceParent: {
        marginTop: heightPercentageToDP(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      priceText: {
        color: 'white',
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(5),
      },
      icon: {
        height: heightPercentageToDP(2.3),
        width: widthPercentageToDP(7),
        marginHorizontal: widthPercentageToDP(2),
      },
      iconView: { flexDirection: 'row', alignItems: 'center' },
    });
  return React.useMemo(() => styles(), [isDark]);
};

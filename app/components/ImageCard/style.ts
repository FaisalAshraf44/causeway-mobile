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
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: heightPercentageToDP(1.6),
      },
      details: {
        padding: widthPercentageToDP(3),
        backgroundColor: '#3C3C3C',
        borderRadius: widthPercentageToDP(2),
      },
      offer: {
        paddingHorizontal: widthPercentageToDP(3),
        paddingVertical: widthPercentageToDP(1.6),
        borderTopLeftRadius: widthPercentageToDP(2),
        borderBottomLeftRadius: widthPercentageToDP(2),
        backgroundColor: 'rgb(219,160,60)',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: heightPercentageToDP(1),
        right: widthPercentageToDP(0),
      },
      offerText: {
        fontSize: widthPercentageToDP(3.6),
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.text,
      },
      offersImage: {
        width: widthPercentageToDP(4),
        height: heightPercentageToDP(2),
        borderRadius: widthPercentageToDP(2),
        marginHorizontal: widthPercentageToDP(2),
      },
      flexrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      Image_for_heart_star: {
        height: heightPercentageToDP(3),
        width: widthPercentageToDP(6),
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
        fontSize: widthPercentageToDP(5.6),
      },
      ratingText: {
        fontFamily: theme.fonts.regularFont,
        color: 'white',
        fontSize: widthPercentageToDP(4),
        marginLeft: widthPercentageToDP(2),
      },
      descriptionText: {
        color: 'white',
        fontFamily: theme.fonts.regularFont,
        marginTop: heightPercentageToDP(1),
      },
      priceParent: {
        marginTop: heightPercentageToDP(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      priceText: {
        color: 'white',
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.5),
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

import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { RootState } from 'app/store/slice';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import themeSlice from 'app/store/slice/themeSlice';

export const useStyle = () => {
  const theme = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      subContainer: {
        flex: 1,
        paddingTop: heightPercentageToDP(6),
        paddingHorizontal: widthPercentageToDP(3),
      },
      paddingVer: {
        paddingVertical: heightPercentageToDP(1),
      },
      dropdown: {
        backgroundColor: theme.colors.glossyBlack,
        borderRadius: widthPercentageToDP(2),
        paddingLeft: widthPercentageToDP(3),
        paddingVertical: heightPercentageToDP(1.1),
        color: theme.colors.lightgrey,
        borderColor: theme.colors.borderColor,
        fontFamily: theme.fonts.regularFont,
        borderWidth: widthPercentageToDP(0.3),
      },
      placeholderStyle: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.lightgrey,
        paddingLeft: widthPercentageToDP(3),
      },
      inputStyle: {
        marginVertical: heightPercentageToDP(3),
        backgroundColor: theme.colors.glossyBlack,
        borderRadius: widthPercentageToDP(2),
        paddingVertical: heightPercentageToDP(1.7),
        color: theme.colors.lightgrey,
        borderColor: theme.colors.borderColor,
        borderWidth: widthPercentageToDP(0.3),
        paddingLeft: widthPercentageToDP(3),
        fontFamily: theme.fonts.regularFont,
      },
      rowDirection: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      selectedTextStyle: {
        fontSize: widthPercentageToDP(4),
        color: theme.colors.lightgrey,
      },
      iconStyle: {
        height: heightPercentageToDP(3.5),
        width: widthPercentageToDP(7.5),
        marginRight: widthPercentageToDP(3),
      },
      arrowImage: {
        marginLeft: widthPercentageToDP(2),
        width: widthPercentageToDP(5.5),
        height: heightPercentageToDP(2.9),
      },
      containerStyle: {
        backgroundColor: theme.colors.darkgrey,
      },
      itemTextStyle: {
        color: theme.colors.lightgrey,
      },
      phoneGuideText: {
        fontFamily: theme.fonts.regularFont,
        width: widthPercentageToDP(70),
        fontSize: widthPercentageToDP(3.4),
        color: theme.colors.lightgrey,
      },
      buttonsContainer: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingVertical: heightPercentageToDP(3),
      },
      button: {
        borderRadius: widthPercentageToDP(1.7),
      },
      txtstyle: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.7),
      },
      addImage: {
        width: widthPercentageToDP(6.5),
        height: heightPercentageToDP(3.4),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

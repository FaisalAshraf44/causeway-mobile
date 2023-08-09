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
      subContainer: {
        flex: 1,
        paddingTop: heightPercentageToDP(7),
        paddingHorizontal: widthPercentageToDP(3),
      },
      guideText: {
        fontFamily: theme.fonts.regularFont,
        alignSelf: 'center',
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
      addText: {
        paddingLeft: widthPercentageToDP(3),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.6),
        color: theme.colors.text,
      },
      profileImage: {
        width: widthPercentageToDP(23),
        height: heightPercentageToDP(12.5),
      },
      addImage: {
        width: widthPercentageToDP(6.5),
        height: heightPercentageToDP(3.4),
      },
      rowContainer: {
        paddingVertical: heightPercentageToDP(1),
        flexDirection: 'row',
        alignItems: 'center',
      },
      columnContainer: {
        paddingVertical: heightPercentageToDP(8),
        justifyContent: 'center',
        alignItems: 'center',
      },
      error: {
        color: 'red',
        paddingVertical: heightPercentageToDP(0.5),
        fontSize: isTablet() ? widthPercentageToDP(2) : undefined,
        textAlign:'center',
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

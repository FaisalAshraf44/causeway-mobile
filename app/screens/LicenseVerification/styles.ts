import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import React from 'react';
import { RootState } from 'app/store/slice';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { isTablet } from 'react-native-device-info';

export const useStyle = () => {
  const { colors } = useTheme();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = useTheme();

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      subContainer: {
        flex: 1,
        paddingHorizontal: widthPercentageToDP(4),
        paddingTop: heightPercentageToDP(1),
      },
      controller: { 
        marginVertical: heightPercentageToDP(0.7) 
      },
      error: {
        color: 'red',
        paddingVertical: heightPercentageToDP(0.5),
        fontSize: isTablet() ? widthPercentageToDP(2) : undefined,
      },
      textView: {
        paddingHorizontal: widthPercentageToDP(2),
        zIndex: -1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 10,
        width: widthPercentageToDP(92),
        height:heightPercentageToDP(7),
        marginVertical: heightPercentageToDP(0.7),
        backgroundColor: theme.colors.glossyBlack,
      },
      selectedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
      },
      textStyles:{ 
        color: '#727272',
        marginLeft: 10,
        fontSize: isTablet() ? widthPercentageToDP(2) : widthPercentageToDP(4),
        fontFamily: theme.fonts.regularFont 
        },
      imageContainer: {
        width: widthPercentageToDP(92), 
        height: heightPercentageToDP(40), 
        padding: 10,
        borderRadius: 10, 
        borderWidth: 0.5,
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 10, 
        backgroundColor: theme.colors.glossyBlack,
      },
      socialImage: {
        height: heightPercentageToDP(3.5),
        width: widthPercentageToDP(7),
      },
      buttonsContainer: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
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
      guideText: {
        paddingVertical: heightPercentageToDP(2),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.7),
        color: theme.colors.lightgrey,
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

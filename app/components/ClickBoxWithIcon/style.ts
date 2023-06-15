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
      container:{
        backgroundColor:theme.colors.background,
      },
      subContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
      },
      space:{
        flexDirection:'row',
        alignItems:'center',
      },
      imageIcon:{
        height: heightPercentageToDP(5),
        width: widthPercentageToDP(6),
      },
      nextIcon:{
        height: heightPercentageToDP(5.3),
        width: widthPercentageToDP(5.4),
      },
      txt:{
        color:theme.colors.text,
        fontFamily:theme.fonts.regularFont,
        fontSize:widthPercentageToDP(3.8),
        paddingLeft:widthPercentageToDP(2)
      }
    });
  return React.useMemo(() => styles(), [isDark]);
};

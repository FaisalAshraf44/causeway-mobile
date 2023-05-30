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
        flexDirection: 'row',
        zIndex: 1,
        alignItems: 'center',
        paddingHorizontal: widthPercentageToDP(4),
        marginVertical: heightPercentageToDP(1),
        paddingVertical: heightPercentageToDP(1),
        borderWidth: widthPercentageToDP(0.2),
        borderColor: theme.colors.borderColor,
        borderRadius: widthPercentageToDP(2),
        marginHorizontal: widthPercentageToDP(4),
        backgroundColor: theme.colors.glossyBlack,
      },
      name: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: 'grey',
      },
      nameContainer: {
        paddingHorizontal: widthPercentageToDP(3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
      },
      image: {
        height: heightPercentageToDP(7),
        width: widthPercentageToDP(17),
        borderRadius: widthPercentageToDP(2),
      },
      imageContainer: {
        shadowColor: 'red',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: widthPercentageToDP(3),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

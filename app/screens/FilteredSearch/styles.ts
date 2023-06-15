import { RootState } from 'app/store/slice';
import { isTablet } from 'app/utils/extras';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

export const useStyle = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = useTheme();
  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      divider: {
        borderWidth: widthPercentageToDP(0.3),
        height: heightPercentageToDP(7),
        marginTop: heightPercentageToDP(-3),
        marginBottom: heightPercentageToDP(-3),
        borderColor: theme.colors.lightgrey,
      },
      flatlist: {
        paddingBottom: heightPercentageToDP(15),
        paddingHorizontal: widthPercentageToDP(3),
      },
      blogContainer: {
        marginTop: heightPercentageToDP(1),
        alignItems: 'center',
      },
      searchContainer: {
        borderRadius: widthPercentageToDP(2),
        backgroundColor: theme.colors.glossyBlack,
        padding: widthPercentageToDP(4),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: heightPercentageToDP(3),
        width: widthPercentageToDP(94),
        marginBottom: heightPercentageToDP(2),
        alignSelf: 'center',
        justifyContent: 'space-evenly',
      },
      filteredText: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      subContainer: {},
      imagecard: {
        marginTop: heightPercentageToDP(2),
        backgroundColor: theme.colors.glossyBlack,
        marginHorizontal: widthPercentageToDP(2),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

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
      },
      subView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      subContainer: {
        flex: 1,
        paddingHorizontal: widthPercentageToDP(6),
        paddingVertical: heightPercentageToDP(6),
      },
      subText: {
        paddingTop: heightPercentageToDP(1),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.3),
        color: theme.colors.text,
      },
      notificationText: {
        width: widthPercentageToDP(70),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        color: theme.colors.text,
      },
      timeText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(2.5),
        color: theme.colors.text,
      },
      nameText: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.primary,
        paddingTop: heightPercentageToDP(2),
      },
      profileImg: {
        width: widthPercentageToDP(19),
        height: heightPercentageToDP(10),
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: heightPercentageToDP(1.6),
      },
      padding: {
        flex: 1,
      },
      button: {
        borderColor: theme.colors.lightgrey,
        borderWidth: widthPercentageToDP(0.25),
        borderRadius: widthPercentageToDP(1),
        paddingHorizontal: widthPercentageToDP(8),
        paddingVertical: heightPercentageToDP(1.4),
        alignSelf: 'center',
      },
      clearText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.text,
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

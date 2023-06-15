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
        paddingTop: heightPercentageToDP(5),
        paddingHorizontal: widthPercentageToDP(4),
      },
      hostText: {
        paddingVertical: heightPercentageToDP(2),
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.text,
        alignSelf: 'center',
      },
      profileImg: {
        width: widthPercentageToDP(12),
        height: heightPercentageToDP(9),
        borderRadius: widthPercentageToDP(10),
      },
      verifyImage: {
        width: widthPercentageToDP(4.4),
        height: heightPercentageToDP(2.6),
        paddingLeft: widthPercentageToDP(10),
      },
      socialIcon: {
        width: widthPercentageToDP(5),
        height: heightPercentageToDP(3.5),
        paddingLeft: widthPercentageToDP(10),
      },
      logoutImage: {
        width: widthPercentageToDP(6),
        height: heightPercentageToDP(3.5),
      },
      helpText: {
        color: theme.colors.lightgrey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        paddingLeft: widthPercentageToDP(4),
      },
      verifiedText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        color: theme.colors.lightgrey,
      },
      paddingHor: {
        paddingHorizontal: widthPercentageToDP(2.5),
      },
      nameText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
        color: theme.colors.text,
      },
      hostContainer: {
        borderRadius: widthPercentageToDP(4),
        backgroundColor: theme.colors.glossyBlack,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: heightPercentageToDP(1.3),
      },
      privacyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: heightPercentageToDP(1.3),
      },
      nextIcon: {
        height: heightPercentageToDP(2.4),
        paddingHorizontal: widthPercentageToDP(4),
        width: widthPercentageToDP(3),
      },
      privacyText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        color: theme.colors.lightgrey,
      },
      helpContainer: {
        paddingLeft: widthPercentageToDP(6),
        borderRadius: widthPercentageToDP(4),
        paddingVertical: heightPercentageToDP(1),
        backgroundColor: theme.colors.glossyBlack,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: heightPercentageToDP(3),
      },
      scroll: { backgroundColor: theme.colors.background },
      manImage: {
        width: widthPercentageToDP(38),
        height: heightPercentageToDP(25),
      },
      button: {
        width: widthPercentageToDP(22),
        paddingVertical: widthPercentageToDP(2),
        borderRadius: widthPercentageToDP(1.7),
        alignSelf: 'center',
      },
      componentStyle: {
        paddingVertical: heightPercentageToDP(0.25),
      },
      componentContainer: {
        paddingTop: heightPercentageToDP(2),
      },
      font: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
      },
      socialIconContainer: {
        paddingVertical: heightPercentageToDP(2),
        alignSelf: 'center',
        flexDirection: 'row',
      },
      hostSubText: {
        width: widthPercentageToDP(42),
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        color: theme.colors.text,
        textAlign: 'center',
      },
      subText: {
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3),
        color: theme.colors.text,
        textAlign: 'center',
        paddingTop: heightPercentageToDP(1),
        paddingBottom: heightPercentageToDP(2),
        paddingLeft: widthPercentageToDP(2),
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      widthSpaceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: widthPercentageToDP(71.4),
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

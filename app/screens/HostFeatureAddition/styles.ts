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
      subcontainer: {
        paddingHorizontal: widthPercentageToDP(3),
        paddingTop: widthPercentageToDP(3),
      },
      optionsubcontainer: {
        marginTop: heightPercentageToDP(1.5),
        paddingHorizontal: widthPercentageToDP(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.darkgrey,
        paddingVertical: heightPercentageToDP(2.9),
        borderRadius: widthPercentageToDP(2),
      },
      imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      modal: {
        backgroundColor: theme.colors.glossyBlack,
        width: widthPercentageToDP(80),
        alignSelf: 'center',
        // height: heightPercentageToDP(20),
        justifyContent: 'center',
      },
      subcontainerModal: {
        backgroundColor: theme.colors.glossyBlack,
        marginTop: heightPercentageToDP(30),
        borderRadius: widthPercentageToDP(3),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: heightPercentageToDP(3.5),
      },
      continue: {
        marginVertical: heightPercentageToDP(2),
      },
      Img: {
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(8),
      },
      outerRadio: {
        padding: widthPercentageToDP(0.8),
        borderWidth: widthPercentageToDP(0.3),
        borderColor: theme.colors.text,
        borderRadius: widthPercentageToDP(5),
      },
      innerRadio: {
        padding: widthPercentageToDP(1.5),
        borderRadius: widthPercentageToDP(8),
      },
      flagImg: {
        height: heightPercentageToDP(3),
        width: widthPercentageToDP(6),
        marginLeft: widthPercentageToDP(3),
        alignSelf: 'center',
      },
      name: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(3.5),
        paddingLeft: widthPercentageToDP(2),
        maxWidth: widthPercentageToDP(60),
      },
      subText: {
        color: theme.colors.grey,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
      },
      button: {
        marginVertical: heightPercentageToDP(6),
        borderRadius: widthPercentageToDP(1.5),
        alignSelf: 'center',
      },
    });
  return React.useMemo(() => styles(), [isDark]);
};

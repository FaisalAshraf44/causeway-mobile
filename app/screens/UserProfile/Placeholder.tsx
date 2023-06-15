import ImageCardPlaceholder from 'app/components/ImageCard/ImageCardPlaceholder';
import React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useStyle } from './styles';
const Placeholder = () => {
  const theme = useTheme();
  const styles = useStyle();
  return (
    <View style={styles.mainView}>
      <View style={styles.subView}>
        <View style={styles.profileView}>
          <View
            style={{
              width: widthPercentageToDP(17),
              height: heightPercentageToDP(8),
              backgroundColor: theme.colors.borderColor,
              borderRadius: widthPercentageToDP(50),

              marginBottom: heightPercentageToDP(2),
            }}
          ></View>

          <View
            style={{
              borderRadius: widthPercentageToDP(2),
              height: heightPercentageToDP(1.4),
              backgroundColor: theme.colors.inactive,
              marginVertical: heightPercentageToDP(1),

              width: widthPercentageToDP(29),
            }}
          ></View>
          <View
            style={{
              borderRadius: widthPercentageToDP(2),
              height: heightPercentageToDP(1.4),
              backgroundColor: theme.colors.inactive,
              width: widthPercentageToDP(29),
            }}
          ></View>

          <View
            style={{
              paddingVertical: heightPercentageToDP(0.8),
              paddingHorizontal: widthPercentageToDP(2),
              backgroundColor: theme.colors.borderColor,
              marginTop: heightPercentageToDP(2),
              width: widthPercentageToDP(25),
              height: heightPercentageToDP(3),
              borderRadius: widthPercentageToDP(2),
            }}
          ></View>
        </View>

        <View style={[styles.profileView, styles.paddingTop]}>
          <View
            style={{
              borderRadius: widthPercentageToDP(2),
              height: heightPercentageToDP(2.3),
              backgroundColor: theme.colors.inactive,
              width: widthPercentageToDP(85),
            }}
          ></View>

          <View style={[styles.paddingTop, styles.paddingBott]}></View>
        </View>

        <View style={styles.lineInnerView}></View>

        <View
          style={{
            borderRadius: widthPercentageToDP(2),
            height: heightPercentageToDP(1.4),
            backgroundColor: theme.colors.inactive,
            width: widthPercentageToDP(26),
          }}
        ></View>
        <View
          style={{
            borderRadius: widthPercentageToDP(2),
            height: heightPercentageToDP(1.4),
            marginVertical: heightPercentageToDP(1),
            backgroundColor: theme.colors.inactive,
            width: widthPercentageToDP(50),
          }}
        ></View>
        <View
          style={{
            borderRadius: widthPercentageToDP(2),
            height: heightPercentageToDP(1.4),

            backgroundColor: theme.colors.inactive,
            width: widthPercentageToDP(50),
          }}
        ></View>
      </View>
    </View>
  );
};
export default Placeholder;

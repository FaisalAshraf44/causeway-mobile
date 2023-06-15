import React from 'react';
import { View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const ImageCardPlaceholder = () => {
  return (
    <View
      style={{
        width: widthPercentageToDP(90),
        backgroundColor: '#363636',
        marginTop: heightPercentageToDP(2),
        borderRadius: widthPercentageToDP(2),
        padding: widthPercentageToDP(3),
        alignSelf: 'center',
      }}
    >
      <View
        style={{
          width: widthPercentageToDP(30),
          height: heightPercentageToDP(2),
          backgroundColor: '#404040',
          marginTop: heightPercentageToDP(2),
          borderRadius: widthPercentageToDP(2),
        }}
      />
      <View
        style={{
          width: widthPercentageToDP(84),
          height: heightPercentageToDP(10),
          backgroundColor: '#404040',
          marginTop: heightPercentageToDP(2),
          borderRadius: widthPercentageToDP(2),
        }}
      />
      <View
        style={{
          width: widthPercentageToDP(30),
          height: heightPercentageToDP(2),
          backgroundColor: '#404040',
          marginTop: heightPercentageToDP(2),
          borderRadius: widthPercentageToDP(2),
        }}
      />
      <View
        style={{
          width: widthPercentageToDP(30),
          height: heightPercentageToDP(2),
          backgroundColor: '#404040',
          marginTop: heightPercentageToDP(2),
          borderRadius: widthPercentageToDP(2),
        }}
      />
    </View>
  );
};
export default ImageCardPlaceholder;

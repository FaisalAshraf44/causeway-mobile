import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useStyle } from './style';
const PromoCardPlaceholder: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();

  return (
    <View style={{ padding: widthPercentageToDP(3) }}>
      <View
        style={{
          width: widthPercentageToDP(50),
          height: heightPercentageToDP(3),
          backgroundColor: '#363636',
          borderRadius: widthPercentageToDP(1.5),
        }}
      />
      <View
        style={{
          width: widthPercentageToDP(40),
          height: heightPercentageToDP(2),
          backgroundColor: '#363636',
          marginTop: heightPercentageToDP(0.5),
          marginLeft: widthPercentageToDP(0),
          borderRadius: widthPercentageToDP(1),
        }}
      />
      <View
        style={{
          width: widthPercentageToDP(93),
          height: heightPercentageToDP(5),
          backgroundColor: '#363636',
          marginTop: heightPercentageToDP(1),
          borderRadius: widthPercentageToDP(2),
        }}
      />
      <View
        style={{
          width: widthPercentageToDP(40),
          height: heightPercentageToDP(2),
          backgroundColor: '#363636',
          marginTop: heightPercentageToDP(0.5),
          marginLeft: widthPercentageToDP(0),
          borderRadius: widthPercentageToDP(1),
        }}
      />
      <View
        style={{
          width: widthPercentageToDP(40),
          height: heightPercentageToDP(2),
          backgroundColor: '#363636',
          marginTop: heightPercentageToDP(0.5),
          marginLeft: widthPercentageToDP(0),
          borderRadius: widthPercentageToDP(1),
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            width: widthPercentageToDP(30),
            height: heightPercentageToDP(2),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(0.5),
            marginLeft: widthPercentageToDP(0),
            borderRadius: widthPercentageToDP(1),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(2),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(0.5),
            marginLeft: widthPercentageToDP(0),
            borderRadius: widthPercentageToDP(1),
          }}
        />
      </View>
    </View>
  );
};
export default PromoCardPlaceholder;

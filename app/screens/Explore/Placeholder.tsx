import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useStyle } from './styles';
const Placeholder: React.FC = () => {
  const theme = useTheme();
  const styles = useStyle();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.subContainer,
          { paddingHorizontal: widthPercentageToDP(4) },
        ]}
      >
        <View
          style={{
            width: widthPercentageToDP(50),
            height: heightPercentageToDP(4),
            backgroundColor: '#363636',
            borderRadius: widthPercentageToDP(1),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(4),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(0.5),
            marginLeft: widthPercentageToDP(2),
            borderRadius: widthPercentageToDP(1),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(93),
            height: heightPercentageToDP(5),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(2),
            borderRadius: widthPercentageToDP(2),
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View
            style={{
              width: widthPercentageToDP(30),
              height: heightPercentageToDP(2),
              backgroundColor: '#363636',
              marginTop: heightPercentageToDP(2),
              borderRadius: widthPercentageToDP(2),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(25),
              height: heightPercentageToDP(2),
              backgroundColor: '#363636',
              marginTop: heightPercentageToDP(2),
              borderRadius: widthPercentageToDP(2),
            }}
          />
        </View>
        <View
          style={{
            width: widthPercentageToDP(93),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(2),
            borderRadius: widthPercentageToDP(2),
            padding: widthPercentageToDP(3),
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
              width: widthPercentageToDP(86.5),
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

        <View
          style={{
            width: widthPercentageToDP(93),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(2),
            borderRadius: widthPercentageToDP(2),
            padding: widthPercentageToDP(3),
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
              width: widthPercentageToDP(86.5),
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
      </View>
    </SafeAreaView>
  );
};
export default Placeholder;

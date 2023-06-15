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
          {
            paddingHorizontal: widthPercentageToDP(4),
            marginTop: heightPercentageToDP(3),
          },
        ]}
      >
        <View
          style={{
            width: widthPercentageToDP(80),
            height: heightPercentageToDP(20),
            backgroundColor: '#363636',
            alignSelf: 'center',
            borderRadius: widthPercentageToDP(2),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(3),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(2),
            borderRadius: widthPercentageToDP(1),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(93),
            height: heightPercentageToDP(0.1),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(2),
            borderRadius: widthPercentageToDP(2),
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: widthPercentageToDP(10),
              height: heightPercentageToDP(5),
              backgroundColor: '#363636',
              marginTop: heightPercentageToDP(2),
              borderRadius: widthPercentageToDP(2),
            }}
          />
          <View style={{ marginLeft: widthPercentageToDP(3) }}>
            <View
              style={{
                width: widthPercentageToDP(70),
                height: heightPercentageToDP(2),
                backgroundColor: '#363636',
                marginTop: heightPercentageToDP(2),
                borderRadius: widthPercentageToDP(2),
              }}
            />
            <View
              style={{
                width: widthPercentageToDP(60),
                height: heightPercentageToDP(2),
                backgroundColor: '#363636',
                marginTop: heightPercentageToDP(0.5),
                borderRadius: widthPercentageToDP(2),
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: widthPercentageToDP(10),
              height: heightPercentageToDP(5),
              backgroundColor: '#363636',
              marginTop: heightPercentageToDP(2),
              borderRadius: widthPercentageToDP(2),
            }}
          />
          <View style={{ marginLeft: widthPercentageToDP(3) }}>
            <View
              style={{
                width: widthPercentageToDP(70),
                height: heightPercentageToDP(2),
                backgroundColor: '#363636',
                marginTop: heightPercentageToDP(2),
                borderRadius: widthPercentageToDP(2),
              }}
            />
            <View
              style={{
                width: widthPercentageToDP(60),
                height: heightPercentageToDP(2),
                backgroundColor: '#363636',
                marginTop: heightPercentageToDP(0.5),
                borderRadius: widthPercentageToDP(2),
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: widthPercentageToDP(10),
              height: heightPercentageToDP(5),
              backgroundColor: '#363636',
              marginTop: heightPercentageToDP(2),
              borderRadius: widthPercentageToDP(2),
            }}
          />
          <View style={{ marginLeft: widthPercentageToDP(3) }}>
            <View
              style={{
                width: widthPercentageToDP(70),
                height: heightPercentageToDP(2),
                backgroundColor: '#363636',
                marginTop: heightPercentageToDP(2),
                borderRadius: widthPercentageToDP(2),
              }}
            />
            <View
              style={{
                width: widthPercentageToDP(60),
                height: heightPercentageToDP(2),
                backgroundColor: '#363636',
                marginTop: heightPercentageToDP(0.5),
                borderRadius: widthPercentageToDP(2),
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: widthPercentageToDP(25),
            height: heightPercentageToDP(2),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(1),
            borderRadius: widthPercentageToDP(2),
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: widthPercentageToDP(10),
              height: heightPercentageToDP(5),
              backgroundColor: '#363636',
              marginTop: heightPercentageToDP(1),
              borderRadius: widthPercentageToDP(2),
              marginLeft: widthPercentageToDP(1),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(10),
              height: heightPercentageToDP(5),
              backgroundColor: '#363636',
              marginTop: heightPercentageToDP(1),
              borderRadius: widthPercentageToDP(2),
              marginLeft: widthPercentageToDP(1),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(10),
              height: heightPercentageToDP(5),
              backgroundColor: '#363636',
              marginTop: heightPercentageToDP(1),
              borderRadius: widthPercentageToDP(2),
              marginLeft: widthPercentageToDP(1),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(10),
              height: heightPercentageToDP(5),
              backgroundColor: '#363636',
              marginTop: heightPercentageToDP(1),
              borderRadius: widthPercentageToDP(2),
              marginLeft: widthPercentageToDP(1),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(10),
              height: heightPercentageToDP(5),
              backgroundColor: '#363636',
              marginTop: heightPercentageToDP(1),
              borderRadius: widthPercentageToDP(2),
              marginLeft: widthPercentageToDP(1),
            }}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: widthPercentageToDP(3),
          alignItems: 'center',
          width: '100%',
        }}
      >
        <View
          style={{
            width: widthPercentageToDP(10),
            height: heightPercentageToDP(3),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(1),
            borderRadius: widthPercentageToDP(2),
            marginLeft: widthPercentageToDP(1),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(30),
            height: heightPercentageToDP(5),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(1),
            borderRadius: widthPercentageToDP(2),
            marginLeft: widthPercentageToDP(1),
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Placeholder;

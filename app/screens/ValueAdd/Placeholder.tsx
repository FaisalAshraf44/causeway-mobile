import React from 'react';
import { SafeAreaView, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useStyle } from './styles';
const Placeholder: React.FC = () => {
  const styles = useStyle();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginVertical: heightPercentageToDP(0.1) }}>
        <View
          style={[
            {
              paddingHorizontal: widthPercentageToDP(4),
              marginTop: heightPercentageToDP(3),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: widthPercentageToDP(8),
                height: heightPercentageToDP(4),
                backgroundColor: '#363636',
                alignSelf: 'center',
                borderRadius: widthPercentageToDP(50),
              }}
            />
            <View
              style={{
                width: widthPercentageToDP(45),
                height: heightPercentageToDP(3),
                backgroundColor: '#363636',
                marginHorizontal: widthPercentageToDP(3),
                borderRadius: widthPercentageToDP(1),
              }}
            />
          </View>
          <View
            style={{
              width: widthPercentageToDP(20),
              height: heightPercentageToDP(3),
              backgroundColor: '#363636',
              marginHorizontal: widthPercentageToDP(3),
              borderRadius: widthPercentageToDP(1),
            }}
          />
        </View>
      </View>
      <View style={{ marginVertical: heightPercentageToDP(0.1) }}>
        <View
          style={[
            {
              paddingHorizontal: widthPercentageToDP(4),
              marginTop: heightPercentageToDP(0.5),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: widthPercentageToDP(8),
                height: heightPercentageToDP(4),
                backgroundColor: '#363636',
                alignSelf: 'center',
                borderRadius: widthPercentageToDP(50),
              }}
            />
            <View
              style={{
                width: widthPercentageToDP(45),
                height: heightPercentageToDP(3),
                backgroundColor: '#363636',
                marginHorizontal: widthPercentageToDP(3),
                borderRadius: widthPercentageToDP(1),
              }}
            />
          </View>
          <View
            style={{
              width: widthPercentageToDP(20),
              height: heightPercentageToDP(3),
              backgroundColor: '#363636',
              marginHorizontal: widthPercentageToDP(3),
              borderRadius: widthPercentageToDP(1),
            }}
          />
        </View>
      </View>

      <View style={{ marginVertical: heightPercentageToDP(0.1) }}>
        <View
          style={[
            {
              paddingHorizontal: widthPercentageToDP(4),
              marginTop: heightPercentageToDP(0.5),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: widthPercentageToDP(8),
                height: heightPercentageToDP(4),
                backgroundColor: '#363636',
                alignSelf: 'center',
                borderRadius: widthPercentageToDP(50),
              }}
            />
            <View
              style={{
                width: widthPercentageToDP(45),
                height: heightPercentageToDP(3),
                backgroundColor: '#363636',
                marginHorizontal: widthPercentageToDP(3),
                borderRadius: widthPercentageToDP(1),
              }}
            />
          </View>
          <View
            style={{
              width: widthPercentageToDP(20),
              height: heightPercentageToDP(3),
              backgroundColor: '#363636',
              marginHorizontal: widthPercentageToDP(3),
              borderRadius: widthPercentageToDP(1),
            }}
          />
        </View>
      </View>

      <View style={{ marginVertical: heightPercentageToDP(0.1) }}>
        <View
          style={[
            {
              paddingHorizontal: widthPercentageToDP(4),
              marginTop: heightPercentageToDP(0.5),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: widthPercentageToDP(8),
                height: heightPercentageToDP(4),
                backgroundColor: '#363636',
                alignSelf: 'center',
                borderRadius: widthPercentageToDP(50),
              }}
            />
            <View
              style={{
                width: widthPercentageToDP(45),
                height: heightPercentageToDP(3),
                backgroundColor: '#363636',
                marginHorizontal: widthPercentageToDP(3),
                borderRadius: widthPercentageToDP(1),
              }}
            />
          </View>
          <View
            style={{
              width: widthPercentageToDP(20),
              height: heightPercentageToDP(3),
              backgroundColor: '#363636',
              marginHorizontal: widthPercentageToDP(3),
              borderRadius: widthPercentageToDP(1),
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Placeholder;

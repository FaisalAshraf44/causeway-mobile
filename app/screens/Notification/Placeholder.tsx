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
    <SafeAreaView style={styles.mainView}>
      <View style={{ marginTop: heightPercentageToDP(5) }}>
        <View
          style={[
            {
              paddingHorizontal: widthPercentageToDP(3),
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
                width: widthPercentageToDP(65),
                height: heightPercentageToDP(3.5),
                backgroundColor: '#363636',
                marginHorizontal: widthPercentageToDP(3),
                borderRadius: widthPercentageToDP(2),
              }}
            />
          </View>
          <View
            style={{
              width: widthPercentageToDP(10),
              height: heightPercentageToDP(2),
              backgroundColor: '#363636',
              marginHorizontal: widthPercentageToDP(3),
              borderRadius: widthPercentageToDP(1),
            }}
          />
        </View>
      </View>
      <View style={{ marginVertical: heightPercentageToDP(0) }}>
        <View
          style={[
            {
              paddingHorizontal: widthPercentageToDP(3),
              marginTop: heightPercentageToDP(1),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: widthPercentageToDP(65),
                height: heightPercentageToDP(3.5),
                backgroundColor: '#363636',
                marginHorizontal: widthPercentageToDP(3),
                borderRadius: widthPercentageToDP(2),
              }}
            />
          </View>
          <View
            style={{
              width: widthPercentageToDP(10),
              height: heightPercentageToDP(2),
              backgroundColor: '#363636',
              marginHorizontal: widthPercentageToDP(3),
              borderRadius: widthPercentageToDP(1),
            }}
          />
        </View>
      </View>
      <View style={{ marginVertical: heightPercentageToDP(0) }}>
        <View
          style={[
            {
              paddingHorizontal: widthPercentageToDP(3),
              marginTop: heightPercentageToDP(1),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: widthPercentageToDP(65),
                height: heightPercentageToDP(3.5),
                backgroundColor: '#363636',
                marginHorizontal: widthPercentageToDP(3),
                borderRadius: widthPercentageToDP(2),
              }}
            />
          </View>
          <View
            style={{
              width: widthPercentageToDP(10),
              height: heightPercentageToDP(2),
              backgroundColor: '#363636',
              marginHorizontal: widthPercentageToDP(3),
              borderRadius: widthPercentageToDP(1),
            }}
          />
        </View>
      </View>
      <View style={{ marginVertical: heightPercentageToDP(0) }}>
        <View
          style={[
            {
              paddingHorizontal: widthPercentageToDP(3),
              marginTop: heightPercentageToDP(1),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: widthPercentageToDP(65),
                height: heightPercentageToDP(3.5),
                backgroundColor: '#363636',
                marginHorizontal: widthPercentageToDP(3),
                borderRadius: widthPercentageToDP(2),
              }}
            />
          </View>
          <View
            style={{
              width: widthPercentageToDP(10),
              height: heightPercentageToDP(2),
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

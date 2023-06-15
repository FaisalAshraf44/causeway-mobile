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
      <View style={{ marginVertical: heightPercentageToDP(0.5) }}>
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
        <View
          style={{
            width: widthPercentageToDP(90),
            height: heightPercentageToDP(2),
            backgroundColor: '#363636',
            marginHorizontal: widthPercentageToDP(4),
            marginVertical: heightPercentageToDP(0.5),
            borderRadius: widthPercentageToDP(2),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(90),
            height: heightPercentageToDP(2),
            backgroundColor: '#363636',
            marginHorizontal: widthPercentageToDP(4),
            marginVertical: heightPercentageToDP(0.5),
            borderRadius: widthPercentageToDP(2),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(90),
            height: heightPercentageToDP(2),
            backgroundColor: '#363636',
            marginHorizontal: widthPercentageToDP(4),
            marginVertical: heightPercentageToDP(0.5),
            borderRadius: widthPercentageToDP(2),
          }}
        />
      </View>

      {/* second block */}
      <View style={{ marginVertical: heightPercentageToDP(0.5) }}>
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
        <View
          style={{
            width: widthPercentageToDP(90),
            height: heightPercentageToDP(2),
            backgroundColor: '#363636',
            marginHorizontal: widthPercentageToDP(4),
            marginVertical: heightPercentageToDP(0.5),
            borderRadius: widthPercentageToDP(2),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(90),
            height: heightPercentageToDP(2),
            backgroundColor: '#363636',
            marginHorizontal: widthPercentageToDP(4),
            marginVertical: heightPercentageToDP(0.5),
            borderRadius: widthPercentageToDP(2),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(90),
            height: heightPercentageToDP(2),
            backgroundColor: '#363636',
            marginHorizontal: widthPercentageToDP(4),
            marginVertical: heightPercentageToDP(0.5),
            borderRadius: widthPercentageToDP(2),
          }}
        />
      </View>
      <View style={{ marginVertical: heightPercentageToDP(0.5) }}>
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
        <View
          style={{
            width: widthPercentageToDP(90),
            height: heightPercentageToDP(2),
            backgroundColor: '#363636',
            marginHorizontal: widthPercentageToDP(4),
            marginVertical: heightPercentageToDP(0.5),
            borderRadius: widthPercentageToDP(2),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(90),
            height: heightPercentageToDP(2),
            backgroundColor: '#363636',
            marginHorizontal: widthPercentageToDP(4),
            marginVertical: heightPercentageToDP(0.5),
            borderRadius: widthPercentageToDP(2),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(90),
            height: heightPercentageToDP(2),
            backgroundColor: '#363636',
            marginHorizontal: widthPercentageToDP(4),
            marginVertical: heightPercentageToDP(0.5),
            borderRadius: widthPercentageToDP(2),
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Placeholder;

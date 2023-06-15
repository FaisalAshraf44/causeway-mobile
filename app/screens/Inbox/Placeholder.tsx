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
            width: widthPercentageToDP(93),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(2),
            borderRadius: widthPercentageToDP(2),
            padding: widthPercentageToDP(3),
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: heightPercentageToDP(2),
          }}
        >
          <View
            style={{
              width: widthPercentageToDP(10.5),
              height: heightPercentageToDP(5),

              backgroundColor: '#404040',

              borderRadius: widthPercentageToDP(10),
            }}
          />
          <View>
            <View
              style={{
                width: widthPercentageToDP(60),
                height: heightPercentageToDP(3),
                marginBottom: heightPercentageToDP(1),

                backgroundColor: '#404040',
                marginLeft: widthPercentageToDP(2),
                borderRadius: widthPercentageToDP(2),
              }}
            />
            <View
              style={{
                width: widthPercentageToDP(60),
                height: heightPercentageToDP(2),
                backgroundColor: '#404040',
                marginLeft: widthPercentageToDP(2),
                borderRadius: widthPercentageToDP(2),
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: widthPercentageToDP(93),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(2),
            borderRadius: widthPercentageToDP(2),
            padding: widthPercentageToDP(3),
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: heightPercentageToDP(2),
          }}
        >
          <View
            style={{
              width: widthPercentageToDP(10.5),
              height: heightPercentageToDP(5),

              backgroundColor: '#404040',

              borderRadius: widthPercentageToDP(10),
            }}
          />
          <View>
            <View
              style={{
                width: widthPercentageToDP(60),
                height: heightPercentageToDP(3),
                marginBottom: heightPercentageToDP(1),

                backgroundColor: '#404040',
                marginLeft: widthPercentageToDP(2),
                borderRadius: widthPercentageToDP(2),
              }}
            />
            <View
              style={{
                width: widthPercentageToDP(60),
                height: heightPercentageToDP(2),
                backgroundColor: '#404040',
                marginLeft: widthPercentageToDP(2),
                borderRadius: widthPercentageToDP(2),
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: widthPercentageToDP(93),
            backgroundColor: '#363636',
            marginTop: heightPercentageToDP(2),
            borderRadius: widthPercentageToDP(2),
            padding: widthPercentageToDP(3),
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: heightPercentageToDP(2),
          }}
        >
          <View
            style={{
              width: widthPercentageToDP(10.5),
              height: heightPercentageToDP(5),

              backgroundColor: '#404040',

              borderRadius: widthPercentageToDP(10),
            }}
          />
          <View>
            <View
              style={{
                width: widthPercentageToDP(60),
                height: heightPercentageToDP(3),
                marginBottom: heightPercentageToDP(1),

                backgroundColor: '#404040',
                marginLeft: widthPercentageToDP(2),
                borderRadius: widthPercentageToDP(2),
              }}
            />
            <View
              style={{
                width: widthPercentageToDP(60),
                height: heightPercentageToDP(2),
                backgroundColor: '#404040',
                marginLeft: widthPercentageToDP(2),
                borderRadius: widthPercentageToDP(2),
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Placeholder;

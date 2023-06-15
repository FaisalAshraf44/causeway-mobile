import { useNavigation } from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import React from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';
const Host: React.FC = () => {
  const styles = useStyle();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.mainView}>
      <ImageBackground
        source={images.Host.headingImage}
        resizeMode="stretch"
        style={styles.img}
      >
        <TouchableOpacity onPress={goBack}>
          <FastImage
            source={images.Host.back}
            style={styles.backIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.subView}>
        <Text style={styles.headingText}>Become a Host</Text>
        <Text style={styles.subText}>
          Hosting your car requires minimal effort on your part. Once you list
          your car on the platform, the platform takes care of everything else
        </Text>
        <View style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            <FastImage
              source={images.Host.key}
              style={styles.iconImage}
              resizeMode="stretch"
            />
            <View style={styles.subTextPadding}>
              <Text style={styles.headingText}>How it works</Text>
              <Text style={styles.cardSubText}>
                Listing is free, and you can set your prices, availability, and
                rules.Pickup and return are simple, and you’ll get paid quickly
                after each trip. We’re here to help along the way.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            <FastImage
              source={images.Host.mask}
              style={styles.iconImage}
              resizeMode="stretch"
            />
            <View style={styles.subTextPadding}>
              <Text style={styles.headingText}>You’re covered</Text>
              <Text style={styles.cardSubText}>
                Causeway Guard protection plan comes standard with third party
                liability protection plan provided under a policy issued to
                Causeway by Allianz. Varying levels of vehicle protection are
                available, just in case there's a mishap
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            <FastImage
              source={images.Host.lock}
              style={styles.iconImage}
              resizeMode="stretch"
            />
            <View style={styles.subTextPadding}>
              <Text style={styles.headingText}>We’ve got your back</Text>
              <Text style={styles.cardSubText}>
                From our guest screening to 24/7 customer support, you can
                always share your car with confidence.
              </Text>
            </View>
          </View>
        </View>
        <PrimaryButton
          title="Get Started"
          style={styles.button}
          onPress={() => {
            navigation.navigate('AppStack', { screen: 'HostDetails' });
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Host;

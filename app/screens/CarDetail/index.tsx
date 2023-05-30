import images from 'app/config/images';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const CarDetail: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Car Details',
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },

      headerTransparent: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: heightPercentageToDP(20),
          paddingHorizontal: widthPercentageToDP(2),
        }}
      >
        <FastImage
          source={images.explore.blackCar}
          resizeMode="stretch"
          style={styles.carImage}
        />
        <View style={styles.subcontainer}>
          <Text style={styles.nameText}>Audi A6</Text>
          <View>
            <View style={styles.divider} />
            <Text style={styles.bookingText}>Booking period</Text>
            <View style={styles.segmentSubContainer}>
              <View style={styles.calenderContainer}>
                <FastImage
                  source={images.cardetails.calender}
                  resizeMode="stretch"
                  style={styles.calanderImage}
                />
                <View style={styles.dateTextContainer}>
                  <Text style={styles.dateText}>Mon, 12 Jan, 10:00 am</Text>
                  <Text style={styles.dateText}>Tue, 13 Jan, 10:00 am</Text>
                </View>
              </View>
              <FastImage
                source={images.cardetails.pen}
                resizeMode="stretch"
                style={styles.calanderImage}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.bookingText}>Pickup & Return</Text>
            <View style={styles.segmentSubContainer}>
              <View style={styles.locationContainer}>
                <FastImage
                  source={images.cardetails.location}
                  resizeMode="stretch"
                  style={styles.calanderImage}
                />
                <Text style={styles.locText}>Los Angeles, CA 90023</Text>
              </View>
              <FastImage
                source={images.cardetails.pen}
                resizeMode="stretch"
                style={styles.calanderImage}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.bookingText}>Car Basics</Text>
            <View style={styles.icons}>
              <View style={styles.subicon}>
                <FastImage
                  source={images.cardetails.seat}
                  resizeMode="contain"
                  style={styles.calanderImage}
                />
                <Text style={styles.iconText}>5 Seats</Text>
              </View>
              <View style={styles.subicon}>
                <FastImage
                  source={images.cardetails.petrol}
                  resizeMode="contain"
                  style={styles.calanderImage}
                />
                <Text style={styles.iconText}>Petrol 95</Text>
              </View>
              <View style={styles.subicon}>
                <FastImage
                  source={images.cardetails.cc}
                  resizeMode="contain"
                  style={styles.calanderImage}
                />
                <Text style={styles.iconText}>1.5 CC</Text>
              </View>
              <View style={styles.subicon}>
                <FastImage
                  source={images.cardetails.bigsmall}
                  resizeMode="contain"
                  style={styles.calanderImage}
                />
                <Text style={styles.iconText}>2 Big + 2 Small</Text>
              </View>
              <View style={styles.subicon}>
                <FastImage
                  source={images.cardetails.auto}
                  resizeMode="contain"
                  style={styles.calanderImage}
                />
                <Text style={styles.iconText}>Auto</Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.bookingText}>Features</Text>
            <View style={styles.features}>
              <FastImage
                source={images.cardetails.ac}
                resizeMode="contain"
                style={styles.calanderImage}
              />
              <FastImage
                source={images.explore.bluetooth}
                resizeMode="contain"
                style={styles.calanderImage}
              />
              <FastImage
                source={images.cardetails.video}
                resizeMode="contain"
                style={styles.calanderImage}
              />
              <FastImage
                source={images.cardetails.signal}
                resizeMode="contain"
                style={styles.calanderImage}
              />
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Text style={styles.nameText}>$162/day</Text>
        <PrimaryButton
          style={styles.button}
          title="Book Now"
          textStyle={styles.font}
          onPress={() => console.log('Button Click')}
        />
      </View>
    </SafeAreaView>
  );
};

export default CarDetail;

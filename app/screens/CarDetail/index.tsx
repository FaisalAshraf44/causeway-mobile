import images from 'app/config/images';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';
import { useNavigation } from '@react-navigation/native';

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
      <FastImage
        source={images.explore.blackCar}
        resizeMode="stretch"
        style={styles.carImage}
      />
      <View style={styles.subcontainer}>
        <Text style={styles.nameText}>Audi A6</Text>
        <View style={styles.segmentContainer}>
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
        <View style={styles.segmentContainer}>
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
        <View style={styles.basicsContainer}>
          <Text style={styles.bookingText}>Car Basics</Text>
          <View style={styles.icons}>
            <View style={styles.subicon}>
              <FastImage
                source={images.cardetails.seat}
                resizeMode="stretch"
                style={styles.calanderImage}
              />
              <Text style={styles.iconText}>5 Seats</Text>
            </View>
            <View style={styles.subicon}>
              <FastImage
                source={images.cardetails.petrol}
                resizeMode="stretch"
                style={styles.calanderImage}
              />
              <Text style={styles.iconText}>Petrol 95</Text>
            </View>
            <View style={styles.subicon}>
              <FastImage
                source={images.cardetails.cc}
                resizeMode="stretch"
                style={styles.calanderImage}
              />
              <Text style={styles.iconText}>1.5 CC</Text>
            </View>
            <View style={styles.subicon}>
              <FastImage
                source={images.cardetails.bigsmall}
                resizeMode="stretch"
                style={styles.calanderImage}
              />
              <Text style={styles.iconText}>2 Big + 2 Small</Text>
            </View>
            <View style={styles.subicon}>
              <FastImage
                source={images.cardetails.auto}
                resizeMode="stretch"
                style={styles.calanderImage}
              />
              <Text style={styles.iconText}>Auto</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CarDetail;

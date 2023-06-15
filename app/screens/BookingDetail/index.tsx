import { useNavigation, useRoute } from '@react-navigation/native';
import images from 'app/config/images';
import moment from 'moment';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Platform, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';
const BookingDetail: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [position, setPosition] = useState<any>({
    latitude: route?.params?.deliveryInformation?.lat,
    longitude: route?.params?.deliveryInformation?.long,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  });
  const scheme = Platform.select({
    ios: 'maps://0,0?q=',
    android: 'geo:0,0?q=',
  });
  const latLng = `${route?.params?.deliveryInformation?.lat},${route?.params?.deliveryInformation?.long}`;
  const label = '';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  const theme = useTheme();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerShown: true,
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
      },
      headerTransparent: false,
    });
  }, []);
  return (
    <View style={styles.mainView}>
      <View style={styles.subView}>
        <View style={styles.rowContainer}>
          <FastImage
            resizeMode="contain"
            source={images.Confirm.car}
            style={styles.carImage}
          />
          <View style={styles.textContainer}>
            <View style={styles.nameModelContainer}>
              <Text style={styles.nameText}>
                {route?.params?.car?.make + ' ' + route?.params?.car?.model}
              </Text>
              <Text style={styles.modelText}>{route?.params?.bookingId}</Text>
            </View>
            <View style={styles.nameModelContainer}>
              <Text style={styles.typeText}>Automatic Transmission</Text>
              <View style={styles.activeContainer}>
                <Text style={styles.typeText}>
                  {route?.params?.bookingStatus}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.lineOuterView}>
          <View style={styles.lineInnerView}></View>
        </View>
        <View style={styles.iconView}>
          <View style={styles.iconSubContainer}>
            <>
              {route?.params?.car?.features?.map((item: any) => {
                return (
                  <FastImage
                    key={'item_' + item}
                    resizeMode="contain"
                    source={
                      item == 'Bluetooth'
                        ? images.features.Bluetooth
                        : item == 'Parking Sensor'
                        ? images.features.ParkingSensor
                        : item == 'Air Conditioner'
                        ? images.features.AirConditioner
                        : item?.includes('First')
                        ? images.features.FirstAidKit
                        : item?.includes('Dash')
                        ? images.features.DashCamera
                        : item?.includes('Emergency')
                        ? images.features.EmergencyKit
                        : item?.includes('GPS')
                        ? images.features?.GPS
                        : item?.includes('Charging')
                        ? images.features.MobileChargingCable
                        : item?.includes('Holder')
                        ? images.features.PhoneHolder
                        : item?.includes('Reverse')
                        ? images.features.ReverseCamera
                        : item?.includes('Tissues')
                        ? images.features.Tissues
                        : item?.includes('Umbrella')
                        ? images.features.Umbrella
                        : item?.includes('USB')
                        ? images.features.USB
                        : item?.includes('Water')
                        ? images.features.WaterBottles
                        : ''
                    }
                    style={styles.icon}
                  />
                );
              })}
            </>
          </View>
          {/* <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.textView}>
          <Text style={styles.scheduleFairText}>Schedule</Text>
        </View>
        <View>
          <View style={styles.dateView}>
            <Text style={styles.dateText}>
              {moment(route?.params?.bookingStartDateTime).format(
                'ddd, DD MMM, hh:mm a'
              )}
            </Text>
          </View>
          <Text style={styles.dateText}>
            {' '}
            {moment(route?.params?.bookingEndDateTime).format(
              'ddd, DD MMM, hh:mm a'
            )}
          </Text>
        </View>
        <View style={styles.paddingVer}>
          <Text style={styles.scheduleFairText}>Total Fair</Text>
          <Text
            style={styles.priceText}
          >{`RM${route?.params?.car?.rentPerDay}/day`}</Text>
        </View>
        <View style={styles.lineOuterView}>
          <View style={styles.lineInnerView}></View>
        </View>
        <View style={styles.pickupContainer}>
          <FastImage
            resizeMode="contain"
            source={images.BookingDetail.pickup}
            style={styles.pickupReturnIcon}
          />
          <View style={styles.paddingHor}>
            <Text style={styles.locationText}>Pickup</Text>
            <Text style={styles.locationText}>
              {route?.params?.deliveryInformation?.address}
            </Text>
          </View>
        </View>
        <View style={styles.dottedLine}></View>
        <View style={styles.pickupContainer}>
          <FastImage
            resizeMode="contain"
            source={images.BookingDetail.return}
            style={styles.pickupReturnIcon}
          />
          <View style={styles.paddingHor}>
            <Text style={styles.locationText}>Return</Text>
            <Text style={styles.locationText}>
              {route?.params?.deliveryInformation?.address}
            </Text>
          </View>
        </View>

        {route?.params?.deliveryInformation?.lat &&
        route?.params?.deliveryInformation?.long ? (
          <MapView
            style={styles.map}
            onPress={() => {
              if (url) Linking.openURL(url);
            }}
            initialRegion={{
              latitude: parseFloat(position?.latitude),
              longitude: parseFloat(position?.longitude),
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            showsMyLocationButton={false}
            // followsUserLocation={true}
            userInterfaceStyle="dark"
            showsCompass={true}
            scrollEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
          >
            <Marker title={t('You are here')} coordinate={position}>
              <FastImage
                resizeMode="contain"
                source={images.BookingDetail.pickup}
                style={styles.pickupReturnIcon}
              />
            </Marker>
          </MapView>
        ) : null}
      </View>
    </View>
  );
};

export default BookingDetail;

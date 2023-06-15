import Geolocation from '@react-native-community/geolocation';
import { useNavigation, useRoute } from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';

import { enableSnackbar } from 'app/store/slice/snackbarSlice';

import {
  checkPermissionForLocation,
  requestPermissionsForLocation,
} from 'app/utils/permission';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  I18nManager,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useDispatch } from 'react-redux';
import { useStyle } from './styles';
import getAddress from 'app/services/getAddress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { isTablet } from 'react-native-device-info';
const Map: React.FC = () => {
  const styles = useStyle();
  const [listViewDisplayed, setListViewDisplayed] = useState(true);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const mapRef = useRef<any>();
  const listRef = useRef<any>();

  const markerRef = useRef<any>();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const getMyProfile = () => {
    try {
    } catch {
    } finally {
    }
  };

  const submit = async () => {
    try {
      setIsLoading(true);
      const response = await getAddress(
        position?.latitude,
        position?.longitude
      );
      if (response?.status == 200) {
        console.log('res', response?.data?.results[0]?.formatted_address);
        if (response?.data?.results?.length > 0) {
          await AsyncStorage.setItem(
            'TEMP_CHOOSE',
            JSON.stringify({
              type: route?.params?.type,
              lat: position?.latitude,
              lng: position?.longitude,
              selection: route?.params?.selection,
              address: response?.data?.results[0]?.formatted_address,
            })
          );
          navigation.goBack();
        } else {
          dispatch(
            enableSnackbar(
              'Could not get the address, please select the nearby location and try again'
            )
          );
        }
      } else {
        dispatch(enableSnackbar('Something went wrong, please try again'));
      }
    } catch {
      dispatch(enableSnackbar('Something went wrong, please try again'));
    } finally {
      setIsLoading(false);
    }
  };

  const [position, setPosition] = useState<any>({
    latitude: 25.2048493,
    longitude: 55.2707828,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  });
  const [originalPosition, setOriginalPosition] = useState({
    latitude: 25.2048493,
    longitude: 55.2707828,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Choose your location',
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerLeft: () => {
        return (
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ paddingRight: widthPercentageToDP(3) }}
          >
            <AntDesign
              name={I18nManager.isRTL ? 'right' : 'left'}
              color={theme.colors.text}
              size={
                isTablet() ? widthPercentageToDP(4) : widthPercentageToDP(5)
              }
            />
          </Pressable>
        );
      },
      headerShown: true,
      headerTransparent: true,
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
      },
    });
  }, []);

  useEffect(() => {
    checkPermissionForLocation(async (status: any) => {
      if (status) {
        getCurrentLocation();
      } else {
        requestPermissionsForLocation(async (status: any) => {
          if (status) {
            getCurrentLocation();
          } else {
            dispatch(
              enableSnackbar(t('Please grant the location permission.'))
            );
          }
        });
      }
    });
  }, []);

  const getCurrentLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        (pos) => {
          const crd = pos?.coords;
          setOriginalPosition({
            latitude: crd?.latitude ? crd?.latitude : 0,
            longitude: crd?.longitude ? crd?.longitude : 0,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          });

          setPosition({
            latitude: crd?.latitude ? crd?.latitude : 0,
            longitude: crd?.longitude ? crd?.longitude : 0,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          });
          mapRef?.current?.animateToRegion(
            {
              latitude: crd?.latitude ? crd?.latitude : 0,
              longitude: crd?.longitude ? crd?.longitude : 0,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            },
            1000
          );
        },
        (err: any) => {
          console.log('Cannot locate', err);
          if (err?.code == 2) {
            dispatch(
              enableSnackbar(
                t(
                  'Please enable your location services for the best experience'
                )
              )
            );
          }
        }
      );
    } catch {
      dispatch(enableSnackbar(t('Unable to get your location')));
    }
  };

  const setNewCoordinates = (e: any) => {
    if (
      e?.nativeEvent?.coordinate?.latitude &&
      e?.nativeEvent?.coordinate?.longitude
    )
      setPosition({
        latitude: parseFloat(e?.nativeEvent?.coordinate?.latitude),
        longitude: parseFloat(e?.nativeEvent?.coordinate?.longitude),
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
  };

  const search = (data: any, details: any = null) => {
    const pos = details?.geometry?.location;
    if (pos?.lat && pos?.lng) {
      setPosition({
        latitude: parseFloat(pos.lat),
        longitude: parseFloat(pos.lng),
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
      mapRef.current.animateToRegion(
        {
          latitude: parseFloat(pos?.lat),
          longitude: parseFloat(pos?.lng),
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={listRef}
        placeholder={t('Enter your location')}
        onPress={search}
        styles={{
          textInputContainer: styles.inputContainer,
          textInput: {
            backgroundColor: theme.colors.glossyBlack,
            color: theme.colors.text,
            borderWidth: 1,
            borderColor: theme.colors.text,
            borderRadius: widthPercentageToDP(2),
          },
          listView: [styles.list],
          container: {
            backgroundColor: theme.colors.glossyBlack,
            borderBottomLeftRadius: widthPercentageToDP(2),
            borderBottomRightRadius: widthPercentageToDP(2),
            paddingTop: heightPercentageToDP(8),
            width: widthPercentageToDP(100),
            position: 'absolute',
            height: heightPercentageToDP(20),
            // top: heightPercentageToDP(5),
          },
        }}
        fetchDetails
        query={{
          key: 'AIzaSyDM88FwG-R3dqn_Fc_a4KqojTxZAjJJZPE',
          language: 'en',
        }}
        textInputProps={{
          InputComp: TextInput,
          leftIcon: { type: 'FontAwesome', name: 'search' },
          errorStyle: { color: 'red' },
          textAlign: I18nManager.isRTL ? 'right' : 'left',
          placeholderTextColor: theme.colors.lightgrey,
        }}
        listViewDisplayed={listViewDisplayed}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(position?.latitude),
          longitude: parseFloat(position?.longitude),
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
        // followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        onLongPress={(e) => {
          listRef?.current?.blur();
          setPosition(e?.nativeEvent?.coordinate);
        }}
        onPress={() => {
          listRef?.current?.blur();
        }}
      >
        <Marker
          title={t('You are here')}
          ref={markerRef}
          coordinate={{
            latitude: parseFloat(position?.latitude),
            longitude: parseFloat(position?.longitude),
          }}
          draggable
          onDragEnd={setNewCoordinates}
        />
      </MapView>

      <TouchableOpacity
        style={styles.locateMeContainer}
        onPress={() => {
          checkPermissionForLocation(async (status: any) => {
            if (status) {
              getCurrentLocation();
            } else {
              requestPermissionsForLocation(async (status: any) => {
                if (status) {
                  getCurrentLocation();
                } else {
                  dispatch(
                    enableSnackbar(t('Please grant the location permission.'))
                  );
                }
              });
            }
          });
        }}
      >
        <EvilIcons
          name="location"
          size={widthPercentageToDP(5)}
          color={theme.colors.text}
        />
        <Text style={styles.subHeadingBlack}>{t('Locate Me')}</Text>
      </TouchableOpacity>

      <PrimaryButton
        title={t('Confirm Location')}
        onPress={submit}
        disabledWhileAnimating
        animating={isLoading}
        style={styles.confirm}
        textStyle={styles.confirmText}
      />
    </View>
  );
};

export default React.memo(Map);

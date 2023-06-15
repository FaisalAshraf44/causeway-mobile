import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import NavigationService from 'app/navigation/NavigationService';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  FlatList,
  I18nManager,
  LayoutAnimation,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useStyle } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MapView, { Marker } from 'react-native-maps';
import { isTablet } from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import getLocations from 'app/services/getLocations';
import Geolocation from '@react-native-community/geolocation';

const Choose: React.FC = () => {
  const [selection, setSelection] = useState(1);
  const [secondSelection, setSecondSelection] = useState<any>(undefined);
  const [params, setParams] = useState<any>(undefined);
  const [secondParams, setSecondParams] = useState<any>(undefined);
  const isFocused = useIsFocused();
  const [open, setOpen] = useState<any>(undefined);
  const mapRef = useRef<any>();
  const secondMapRef = useRef<any>();
  const route = useRoute<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useStyle();
  const [secondParamsFreeDelivery, setSecondParamsFreeDelivery] =
    useState(undefined);
  const [thirdParamsFreeDelivery, setThirdParamsFreeDelivery] =
    useState(undefined);

  const VirtualizedList = ({ children }: any) => {
    return (
      <FlatList
        data={[]}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        keyboardShouldPersistTaps="always"
        listKey={'MainList'}
        renderItem={null}
        style={styles.scroll}
        ListHeaderComponent={<>{children}</>}
      />
    );
  };

  const renderLocations = ({ item }: any, type: 2 | 3) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable
          style={styles.outerRadio}
          onPress={() => {
            setParams({
              address: item?.formattedAddress,
              lat: item?.geopoint?.lat,
              lng: item?.geopoint?.long,
              selection: 2,
              type: 'Car Delivery',
            });
            setPosition({
              latitude: parseFloat(item?.geopoint?.lat),
              longitude: parseFloat(item?.geopoint?.long),
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            });
            try {
              if (type == 2) {
                mapRef.current.animateToRegion(
                  {
                    latitude: parseFloat(item?.geopoint?.lat),
                    longitude: parseFloat(item?.geopoint?.long),
                    latitudeDelta: 0.0421,
                    longitudeDelta: 0.0421,
                  },
                  1000
                );
                setSecondParamsFreeDelivery(item?._id);
              } else {
                secondMapRef.current.animateToRegion(
                  {
                    latitude: parseFloat(item?.geopoint?.lat),
                    longitude: parseFloat(item?.geopoint?.long),
                    latitudeDelta: 0.0421,
                    longitudeDelta: 0.0421,
                  },
                  1000
                );
                setThirdParamsFreeDelivery(item?._id);
              }
            } catch {
              console.log('err');
            }
          }}
        >
          {type == 2 ? (
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    secondParamsFreeDelivery == item?._id
                      ? theme.colors.text
                      : undefined,
                  borderRadius: widthPercentageToDP(10),
                },
              ]}
            />
          ) : (
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    thirdParamsFreeDelivery == item?._id
                      ? theme.colors.text
                      : undefined,
                  borderRadius: widthPercentageToDP(10),
                },
              ]}
            />
          )}
        </Pressable>
        <View>
          <Text
            style={[
              styles.text2,
              {
                fontSize: widthPercentageToDP(3.5),
                maxWidth: widthPercentageToDP(70),
                paddingHorizontal: widthPercentageToDP(3),
              },
            ]}
            numberOfLines={1}
          >
            {item?.formattedAddress}
          </Text>
          <Text
            style={[
              styles.text2,
              {
                maxWidth: widthPercentageToDP(70),
                paddingHorizontal: widthPercentageToDP(3),
              },
            ]}
            numberOfLines={1}
          >
            {item?.country}
          </Text>
        </View>
      </View>
    );
  };

  const getLocationData = async (lat: number, lng: number) => {
    try {
      setIsLoading(true);

      const response = await getLocations(lat, lng);

      if (response?.status == 201 || response?.status == 200) {
        setData(response?.data?.results);
        console.log('res', response?.data);
      }
    } catch (err: any) {
      if (err?.response?.status == 401) {
        dispatch(enableSnackbar('Please sign in for better experience'));
      } else {
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let subscribed = true;
    if (subscribed && isFocused) {
      Geolocation.getCurrentPosition(
        async (position) => {
          getLocationData(
            position?.coords?.latitude,
            position?.coords?.longitude
          );
        },
        () => {}
      );
    }
    return () => {
      subscribed = false;
    };
  }, [isFocused]);

  const onBackPress = () => {
    if (isFocused) {
      goBack();
      return true;
    }

    return false;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [isFocused])
  );

  const [position, setPosition] = useState({
    latitude: 2.19,
    longitude: 3.19,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  });

  const [secondPosition, setSecondPosition] = useState({
    latitude: 2.19,
    longitude: 3.19,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerShown: true,
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerLeft: () => (
        <Pressable onPress={goBack}>
          <AntDesign
            name={I18nManager.isRTL ? 'right' : 'left'}
            color={theme.colors.text}
            size={isTablet() ? widthPercentageToDP(4) : widthPercentageToDP(5)}
          />
        </Pressable>
      ),
      headerTransparent: true,
    });
  }, []);

  useEffect(() => {
    if (route?.params?.pickup) {
      // if (route?.params?.selection == 3) {
      //   setSecondSelection(3);
      //   setSecondParams(route?.params);
      //   setSecondPosition({
      //     latitude: parseFloat(route?.params?.lat),
      //     longitude: parseFloat(route?.params?.lng),
      //     latitudeDelta: 0.0421,
      //     longitudeDelta: 0.0421,
      //   });
      //   return;
      // }

      setSecondSelection(3);
      setSecondParams(route?.params?.pickup);
      setSecondPosition({
        latitude: parseFloat(route?.params?.pickup?.lat),
        longitude: parseFloat(route?.params?.pickup?.lng),
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
      setParams(route?.params?.dropOff);
      setSelection(route?.params?.dropOff?.selection);
      setPosition({
        latitude: parseFloat(route?.params?.dropOff?.lat),
        longitude: parseFloat(route?.params?.dropOff?.lng),
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    }
    AsyncStorage.getItem('TEMP_CHOOSE').then((val: any) => {
      if (val) {
        const parsed = JSON.parse(val);

        setParams(parsed);
        setSelection(parsed?.selection);

        setPosition({
          latitude: parseFloat(parsed?.lat),
          longitude: parseFloat(parsed?.lng),
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        });
        try {
          if (selection == 2)
            mapRef.current.animateToRegion(
              {
                latitude: parseFloat(parsed?.lat),
                longitude: parseFloat(parsed?.lng),
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,
              },
              1000
            );
          else
            secondMapRef.current.animateToRegion(
              {
                latitude: parseFloat(parsed?.lat),
                longitude: parseFloat(parsed?.lng),
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,
              },
              1000
            );
        } catch {
          console.log('err');
        }
        AsyncStorage.clear();
      }
    });
  }, [isFocused]);
  {
    console.log('sadsadsa', route?.params);
  }
  const submit = () => {
    if (selection == 1) {
      AsyncStorage.setItem(
        'TEMP_CHOOSE',
        JSON.stringify({
          type: 'Self Pickup/Return',
          lat: params?.lat,
          lng: params?.lng,
          selection: 1,
        })
      );
    } else {
      AsyncStorage.setItem(
        'TEMP_CHOOSE',
        JSON.stringify({
          dropOff: params,
          pickup: params,
        })
      );
    }

    navigation.goBack();
  };
  const goBack = async () => {
    if (route?.params == undefined) {
      AsyncStorage.clear().then(() => {
        setTimeout(() => {
          navigation.goBack();
        }, 400);
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <Text style={styles.text1}>Choose</Text>
          <Text style={styles.text2}>
            Choose whether you want to be self driver or want the company to
            deliver car at your place!!!
          </Text>

          <VirtualizedList>
            <View style={[styles.optionmaincontainer]}>
              <View
                style={[
                  styles.optionsubcontainer,
                  { marginBottom: heightPercentageToDP(1) },
                ]}
              >
                <View style={styles.imgContainer}>
                  <FastImage
                    source={images.PickupChoose.selfPickup}
                    resizeMode="contain"
                    style={styles.Img}
                  />
                  <Text style={styles.text3}>Self Pickup/Return</Text>
                </View>

                <Pressable
                  style={styles.outerRadio}
                  onPress={() => {
                    setSelection(1);
                    setSecondSelection(undefined);
                    setSecondParams(null);
                    setParams(null);
                  }}
                >
                  <View
                    style={[
                      styles.innerRadio,
                      {
                        backgroundColor:
                          selection == 1 ? theme.colors.text : undefined,
                        borderRadius:
                          selection == 1 ? widthPercentageToDP(10) : 0,
                      },
                    ]}
                  />
                </Pressable>
              </View>
              <View
                style={[
                  styles.optionsContainer,
                  {
                    paddingBottom:
                      open == 2 ? heightPercentageToDP(2) : undefined,
                  },
                ]}
              >
                <View style={styles.optionsubcontainer}>
                  <View style={styles.imgContainer}>
                    <FastImage
                      source={images.PickupChoose.carDelivery}
                      resizeMode="contain"
                      style={styles.Img}
                    />
                    <View style={styles.flexColumn}>
                      <Text style={styles.text4}>Car Delivery</Text>
                      <Text style={styles.text5}>
                        {selection == 2 ? params?.address : 'Select location'}
                      </Text>
                    </View>
                  </View>
                  {selection != 2 ? (
                    <Pressable
                      style={styles.outerRadio}
                      onPress={() => {
                        navigation.navigate('Map', {
                          selection: 2,
                          type: 'Car Delivery',
                        });
                        // setSelection(2);
                      }}
                    >
                      <View
                        style={[
                          styles.innerRadio,
                          {
                            backgroundColor:
                              selection == 2 ? theme.colors.text : undefined,
                            borderRadius:
                              selection == 2 ? widthPercentageToDP(10) : 0,
                          },
                        ]}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => {
                        LayoutAnimation.configureNext(
                          LayoutAnimation.Presets.linear
                        );
                        if (open != 2) setOpen(selection);
                        else setOpen(undefined);
                      }}
                    >
                      <AntDesign
                        name={open == 2 ? 'up' : 'down'}
                        size={widthPercentageToDP(5.5)}
                        color={theme.colors.text}
                      />
                    </Pressable>
                  )}
                </View>
                {open == 2 ? (
                  <View>
                    <View style={{ paddingHorizontal: widthPercentageToDP(3) }}>
                      {data?.length > 0 ? (
                        <>
                          <Text
                            style={[
                              styles.text1,
                              { fontSize: widthPercentageToDP(4.5) },
                            ]}
                          >
                            Free Delivery
                          </Text>
                          <Text style={[styles.text2]}>
                            Let us bring it to you for free
                          </Text>
                        </>
                      ) : null}
                      {open == 2 ? (
                        <FlatList
                          data={data}
                          renderItem={(item) => renderLocations(item, 2)}
                          style={{ marginVertical: heightPercentageToDP(2) }}
                          extraData={secondParamsFreeDelivery}
                        />
                      ) : null}
                      <Text
                        style={[
                          styles.text1,
                          { fontSize: widthPercentageToDP(4.5) },
                        ]}
                      >
                        Choose your own location
                      </Text>
                      <Text style={[styles.text2]}>
                        Whereever your destination, we'll get you there
                      </Text>
                    </View>
                    <MapView
                      style={styles.map}
                      initialRegion={position}
                      showsUserLocation={false}
                      // followsUserLocation={true}
                      ref={mapRef}
                      showsCompass={true}
                      zoomEnabled={false}
                      pitchEnabled={false}
                      scrollEnabled={false}
                      onPress={() => {
                        navigation.navigate('Map', {
                          selection: 2,
                          type: 'Car Delivery',
                        });
                      }}
                    >
                      <Marker
                        title={t('Location')}
                        coordinate={{
                          latitude: parseFloat(params?.lat),
                          longitude: parseFloat(params?.lng),
                        }}
                      />
                    </MapView>
                  </View>
                ) : null}
              </View>

              {/* third selection */}
              <View
                style={[
                  styles.optionsContainer,
                  {
                    paddingBottom:
                      open == 3 ? heightPercentageToDP(2) : undefined,
                  },
                ]}
              >
                <View style={styles.optionsubcontainer}>
                  <View style={styles.imgContainer}>
                    <FastImage
                      source={images.PickupChoose.carDelivery}
                      resizeMode="contain"
                      style={styles.Img}
                    />
                    <View style={styles.flexColumn}>
                      <Text style={styles.text4}>Car Pickup</Text>
                      <Text style={styles.text5}>
                        {selection == 3 ? params?.address : 'Select location'}
                      </Text>
                    </View>
                  </View>
                  {selection != 3 ? (
                    <Pressable
                      style={styles.outerRadio}
                      onPress={() => {
                        navigation.navigate('Map', {
                          selection: 3,
                          type: 'Car Delivery',
                        });
                        // setSelection(2);
                      }}
                    >
                      <View
                        style={[
                          styles.innerRadio,
                          {
                            backgroundColor:
                              selection == 3 ? theme.colors.text : undefined,
                            borderRadius:
                              selection == 3 ? widthPercentageToDP(10) : 0,
                          },
                        ]}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => {
                        LayoutAnimation.configureNext(
                          LayoutAnimation.Presets.linear
                        );
                        if (open != 3) setOpen(selection);
                        else setOpen(undefined);
                      }}
                    >
                      <AntDesign
                        name={open == 3 ? 'up' : 'down'}
                        size={widthPercentageToDP(5.5)}
                        color={theme.colors.text}
                      />
                    </Pressable>
                  )}
                </View>
                {open == 3 ? (
                  <View>
                    <View style={{ paddingHorizontal: widthPercentageToDP(3) }}>
                      {open == 3 ? (
                        <FlatList
                          data={data}
                          renderItem={(item) => renderLocations(item, 3)}
                          style={{ marginVertical: heightPercentageToDP(2) }}
                        />
                      ) : null}
                      <Text
                        style={[
                          styles.text1,
                          { fontSize: widthPercentageToDP(4.5) },
                        ]}
                      >
                        Choose your own location
                      </Text>
                      <Text style={[styles.text2]}>
                        Whereever your destination, we'll get you there
                      </Text>
                    </View>
                    <MapView
                      style={styles.map}
                      initialRegion={position}
                      showsUserLocation={false}
                      // followsUserLocation={true}
                      ref={secondMapRef}
                      showsCompass={true}
                      zoomEnabled={false}
                      pitchEnabled={false}
                      scrollEnabled={false}
                      onPress={() => {
                        navigation.navigate('Map', {
                          selection: 3,
                          type: 'Car Pickup',
                        });
                      }}
                    >
                      <Marker
                        title={t('Location')}
                        coordinate={{
                          latitude: parseFloat(params?.lat),
                          longitude: parseFloat(params?.lng),
                        }}
                      />
                    </MapView>
                  </View>
                ) : null}
              </View>
            </View>
          </VirtualizedList>
        </View>
      </SafeAreaView>

      <PrimaryButton
        style={styles.button}
        title="Continue"
        disabled={selection != 1 && !params}
        textStyle={styles.txtstyle}
        onPress={submit}
      />
    </>
  );
};

export default Choose;

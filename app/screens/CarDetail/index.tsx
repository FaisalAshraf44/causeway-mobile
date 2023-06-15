import { Slider } from '@miblanchard/react-native-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import getCarDetail from 'app/services/getCarDetail';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal as ModalPaper } from 'react-native-paper';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import Placeholder from './Placeholder';
import { useStyle } from './styles';
import Carousel from 'react-native-reanimated-carousel';

const CarDetail: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [selectedFirst, setSelectedFirst] = useState('');
  const [selectedSecond, setSelectedSecond] = useState('');
  const [selectedFirstTime, setSelectedFirstTime] =
    useState('7/10/2013 00:00:00');
  const [selectedSecondTime, setSelectedSecondTime] =
    useState('7/10/2013 00:00:00');

  const [firstSliderValue, setFirstSliderValue] = useState<any>(0);
  const [secondSliderValue, setSecondSliderValue] = useState<any>(0);
  const [chooseParams, setChooseParams] = useState<any>(undefined);

  const themeCalender: any = {
    textDayFontFamily: theme.fonts.boldFont,
    textMonthFontFamily: theme.fonts.boldFont,
    textDayHeaderFontFamily: theme.fonts.boldFont,
    textDayFontSize: widthPercentageToDP(5),
    textMonthFontSize: widthPercentageToDP(5),
    backgroundColor: theme.colors.glossyBlack,
    calendarBackground: theme.colors.glossyBlack,
    dayTextColor: theme.colors.text,
    monthTextColor: theme.colors.text,
    selectedDayBackgroundColor: theme.colors.primary,
  };

  const renderThumb = (type: 'start' | 'end') => {
    return (
      <View style={styles.thumb}>
        <Text style={styles.thumbText}>
          {type == 'start'
            ? moment(selectedFirstTime).format('hh:mm a')
            : moment(selectedSecondTime).format('hh:mm a')}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    AsyncStorage.getItem('TEMP_CHOOSE').then((params: any) => {
      const parsed: any = JSON.parse(params);
      setChooseParams(parsed);
      AsyncStorage.clear();
    });
  }, [isFocused]);

  useEffect(() => {
    setSelectedFirstTime(
      `7/10/2013 ${firstSliderValue != 24 ? firstSliderValue : 23}:${
        firstSliderValue != 24 ? 0 : 59
      }:${firstSliderValue != 24 ? 0 : 59}`
    );
  }, [firstSliderValue]);

  useEffect(() => {
    setSelectedSecondTime(
      `7/10/2013 ${secondSliderValue != 24 ? secondSliderValue : 23}:${
        secondSliderValue != 24 ? 0 : 59
      }:${secondSliderValue != 24 ? 0 : 59}`
    );
  }, [secondSliderValue]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getCarDetail(route?.params?.id);
      if (response?.status == 200) {
        setData(response?.data);
      } else {
        dispatch(enableSnackbar('Something went wrong'));
      }
    } catch {
      dispatch(enableSnackbar('Something went wrong'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let subscribed = true;
    if (subscribed && isFocused) {
      getData();
    }
    return () => {
      subscribed = false;
    };
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Car Details',
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },

      headerTransparent: false,
    });
  }, []);
  if (isLoading) return <Placeholder />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
      >
        <Carousel
          loop
          mode="parallax"
          autoPlayInterval={5000}
          autoPlay={true}
          data={data?.photos}
          width={widthPercentageToDP(100)}
          height={heightPercentageToDP(30)}
          renderItem={() => (
            <FastImage
              source={{
                uri: data?.photos?.length > 0 ? data?.photos[0] : undefined,
              }}
              resizeMode="stretch"
              style={styles.carImage}
            />
          )}
        />

        <View style={styles.subcontainer}>
          <Text style={styles.nameText}>{data?.make + ' ' + data?.model}</Text>
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
                  <Text style={styles.dateText}>
                    {selectedFirst
                      ? moment(selectedFirst).format('ddd, DD, MMMM') +
                        ' ' +
                        moment(selectedFirstTime).format('hh:mm a')
                      : 'Select Date and Time'}
                  </Text>
                  <Text style={styles.dateText}>
                    {selectedSecond
                      ? moment(selectedSecond).format('ddd, DD, MMMM') +
                        ' ' +
                        moment(selectedSecondTime).format('hh:mm a')
                      : 'Select Date and Time'}
                  </Text>
                </View>
              </View>
              <Pressable onPress={() => setFilterEnabled(true)}>
                <FastImage
                  source={images.cardetails.pen}
                  resizeMode="stretch"
                  style={styles.calanderImage}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.bookingText}>Pickup & Return</Text>
            <View style={styles.segmentSubContainer}>
              <View>
                <View style={styles.locationContainer}>
                  <FastImage
                    source={images.cardetails.location}
                    resizeMode="stretch"
                    style={styles.calanderImage}
                  />
                  {console.log('chosose', chooseParams)}
                  <Text style={[styles.locText, { maxWidth: '90%' }]}>
                    {!chooseParams
                      ? 'Choose pick-up type'
                      : chooseParams?.selection == 1
                      ? data?.location?.address
                      : chooseParams?.pickup?.address}
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => {
                  navigation.navigate(
                    'Choose',
                    chooseParams
                      ? chooseParams
                      : { extraAddress: data?.location }
                  );
                }}
              >
                <FastImage
                  source={images.cardetails.pen}
                  resizeMode="stretch"
                  style={styles.calanderImage}
                />
              </Pressable>
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
              <View style={{ flexDirection: 'row' }}>
                {data?.features.map((item: any, index: number) => {
                  return (
                    <>
                      {index < 4 ? (
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
                      ) : null}
                    </>
                  );
                })}
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowAllFeatures(true);
                }}
              >
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider} />

          {/* insurance block */}
          <View>
            <Text style={styles.bookingText}>Insurance & Protection</Text>
            <View style={styles.segmentSubContainer}>
              <Text style={[styles.locText, { paddingLeft: undefined }]}>
                Insurance via travellers
              </Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>Read More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider} />

          {/* milage block */}

          <View>
            <Text style={styles.bookingText}>Milage</Text>
            <View style={styles.segmentSubContainer}>
              <Text style={[styles.locText, { paddingLeft: undefined }]}>
                Change distance includes milage
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          {/* description block */}

          <View>
            <Text style={styles.bookingText}>Description</Text>
            <View style={styles.segmentSubContainer}>
              <Text style={[styles.locText, { paddingLeft: undefined }]}>
                {data?.description}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View
            style={[
              styles.row,
              { marginTop: heightPercentageToDP(3), justifyContent: 'center' },
            ]}
          >
            <FastImage
              source={images.chooser.google}
              style={styles.headphone}
              tintColor={theme.colors.text}
            />
            <Text
              style={[
                styles.text,
                {
                  paddingHorizontal: widthPercentageToDP(2),
                  color: theme.colors.text,
                },
              ]}
            >
              Need help
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonView}>
        <Text style={styles.nameText}>${data?.rentPerDay}/day</Text>
        <PrimaryButton
          style={styles.button}
          title="Book Now"
          textStyle={styles.font}
          disabled={!selectedFirst || !selectedSecond || !chooseParams}
          onPress={() => {
            const detail = {
              carDetail: data,
              bookingDetail: {
                address: chooseParams,
                startDate: selectedFirst,
                endDate: selectedSecond,
                startTime: selectedFirstTime,
                endTime: selectedSecondTime,
                selection: chooseParams?.selection,
                selfService:
                  chooseParams?.selection == 1 ? data?.location : undefined,
              },
              totalPricePerDay: data?.rentPerDay,
            };
            navigation.navigate('InsurancePackage', detail);
          }}
        />
      </View>

      <Modal visible={filterEnabled}>
        <View style={styles.modalContainer}>
          <Pressable
            onPress={() => {
              setFilterEnabled(false);
              setSelectedFirst('');
              setSelectedSecond('');
              setSelectedFirstTime('7/10/2013 00:00:00');
              setSelectedSecondTime('7/10/2013 00:00:00');
              setFirstSliderValue(0);
              setSecondSliderValue(0);
            }}
          >
            <Text style={styles.reset}>Reset</Text>
          </Pressable>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.date}>
                {selectedFirst != ''
                  ? moment(selectedFirst).format('ddd, DD, MMM')
                  : 'Select Date'}
              </Text>
              <Text style={styles.time}>
                {selectedFirstTime != ''
                  ? moment(selectedFirstTime).format('hh:mm a')
                  : 'Select Time'}
              </Text>
            </View>
            <View>
              <View style={styles.divider} />
            </View>

            <View>
              <Text style={styles.date}>
                {selectedSecond != ''
                  ? moment(selectedSecond).format('ddd, DD, MMM')
                  : 'Select Date'}
              </Text>
              <Text style={styles.time}>
                {selectedSecondTime != ''
                  ? moment(selectedSecondTime).format('hh:mm a')
                  : 'Select Time'}
              </Text>
            </View>
          </View>
          <ScrollView
            style={{
              maxHeight: heightPercentageToDP(50),
              marginTop: heightPercentageToDP(3),
              marginBottom: heightPercentageToDP(2),
            }}
          >
            <Calendar
              theme={themeCalender}
              hideExtraDays
              style={{
                width: widthPercentageToDP(90),
                borderRadius: widthPercentageToDP(3),
                alignSelf: 'center',
              }}
              allowSelectionOutOfRange={false}
              onDayPress={(day) => {
                if (selectedFirst != '') {
                  if (selectedSecond != '') {
                    setSelectedFirst('');
                    setSelectedSecond('');
                  } else {
                    if (moment(day?.dateString).isBefore(selectedFirst)) {
                    } else setSelectedSecond(day.dateString);
                  }
                } else setSelectedFirst(day.dateString);
              }}
              hideArrows
              markedDates={{
                [selectedFirst]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: theme.colors.primary,
                },
                [selectedSecond]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: theme.colors.primary,
                },
              }}
            />
            <Calendar
              theme={themeCalender}
              hideExtraDays
              style={{
                marginTop: heightPercentageToDP(2),
                width: widthPercentageToDP(90),
                borderRadius: widthPercentageToDP(3),
                alignSelf: 'center',
              }}
              allowSelectionOutOfRange={false}
              onDayPress={(day) => {
                if (selectedFirst != '') {
                  if (selectedSecond != '') {
                    setSelectedFirst('');
                    setSelectedSecond('');
                  } else {
                    if (moment(day?.dateString).isBefore(selectedFirst)) {
                    } else setSelectedSecond(day.dateString);
                  }
                } else setSelectedFirst(day.dateString);
              }}
              current={moment(new Date()).add(1, 'month').toISOString()}
              hideArrows
              markedDates={{
                [selectedFirst]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: theme.colors.primary,
                },
                [selectedSecond]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: theme.colors.primary,
                },
              }}
            />
          </ScrollView>
          <View style={styles.sliderRow}>
            <Text style={[styles.time, { fontSize: widthPercentageToDP(3.5) }]}>
              Start
            </Text>
            <Slider
              maximumValue={24}
              minimumValue={0}
              renderThumbComponent={() => renderThumb('start')}
              step={1}
              value={firstSliderValue}
              onValueChange={(val) => {
                setFirstSliderValue(val);
              }}
              maximumTrackTintColor={theme.colors.primary}
              minimumTrackTintColor={'grey'}
              trackStyle={{
                paddingVertical: heightPercentageToDP(0.4),
                borderRadius: widthPercentageToDP(2),
              }}
              containerStyle={{
                width: widthPercentageToDP(70),
                alignSelf: 'center',
                borderRadius: widthPercentageToDP(2),
              }}
            />
          </View>
          <View style={styles.sliderRow}>
            <Text style={[styles.time, { fontSize: widthPercentageToDP(3.5) }]}>
              End
            </Text>
            <Slider
              maximumValue={24}
              minimumValue={0}
              renderThumbComponent={() => renderThumb('end')}
              step={1}
              value={secondSliderValue}
              onValueChange={(val) => {
                setSecondSliderValue(val);
              }}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={'grey'}
              trackStyle={{
                paddingVertical: heightPercentageToDP(0.4),
                borderRadius: widthPercentageToDP(2),
              }}
              containerStyle={{
                width: widthPercentageToDP(70),
                alignSelf: 'center',
                borderRadius: widthPercentageToDP(2),
              }}
            />
          </View>
          <PrimaryButton
            title="Continue"
            onPress={() => {
              setFilterEnabled(false);
            }}
            disabled={!selectedFirst || !selectedSecond}
            style={[
              styles.button,
              { alignSelf: 'center', marginTop: heightPercentageToDP(2) },
            ]}
            textStyle={styles.buttonText}
          />
        </View>
      </Modal>
      <ModalPaper
        visible={showAllFeatures}
        onDismiss={() => setShowAllFeatures(false)}
      >
        <View style={styles.featureModalContainer}>
          <Text
            style={[
              styles.feature,
              {
                fontFamily: theme.fonts.boldFont,
                marginBottom: heightPercentageToDP(2),
                fontSize: widthPercentageToDP(5),
              },
            ]}
          >
            Features
          </Text>
          {data?.features.map((item: any, index: number) => {
            return (
              <View style={styles.subFeatureContainer}>
                {index < 4 ? (
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
                ) : null}
                <Text style={styles.feature}>{item}</Text>
              </View>
            );
          })}
        </View>
      </ModalPaper>
    </SafeAreaView>
  );
};

export default CarDetail;

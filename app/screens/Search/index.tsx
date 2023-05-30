import { Slider } from '@miblanchard/react-native-slider';
import { useNavigation } from '@react-navigation/native';
import LocationCard from 'app/components/LocationCard';
import PrimaryButton from 'app/components/PrimaryButton';
import Searchbar from 'app/components/Searchbar';
import images from 'app/config/images';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
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
import filteredSearch from 'app/services/filteredSearch';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';

const Search: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [selectedFirst, setSelectedFirst] = useState('');
  const [selectedSecond, setSelectedSecond] = useState('');
  const [selectedFirstTime, setSelectedFirstTime] =
    useState('7/10/2013 00:00:00');
  const [selectedSecondTime, setSelectedSecondTime] =
    useState('7/10/2013 00:00:00');

  const [firstSliderValue, setFirstSliderValue] = useState<any>(0);
  const [secondSliderValue, setSecondSliderValue] = useState<any>(0);

  useEffect(() => {
    setSelectedFirstTime(
      `7/10/2013 ${firstSliderValue != 24 ? firstSliderValue : 23}:${
        firstSliderValue != 24 ? 0 : 59
      }:${firstSliderValue != 24 ? 0 : 59}`
    );
  }, [firstSliderValue]);

  const continueSearch = async () => {
    try {
      setIsLoading(true);
      const response = await filteredSearch();

      if (response?.status == 201) {
        console.log('res', response?.data);
      } else {
        dispatch(enableSnackbar('Something went wrong, please try again.'));
      }
    } catch {
      dispatch(enableSnackbar('Something went wrong, please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSelectedSecondTime(
      `7/10/2013 ${secondSliderValue != 24 ? secondSliderValue : 23}:${
        secondSliderValue != 24 ? 0 : 59
      }:${secondSliderValue != 24 ? 0 : 59}`
    );
  }, [secondSliderValue]);

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
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerRight: () => {
        return (
          <Searchbar
            styles={{ marginTop: 0, width: '90%', alignSelf: 'flex-start' }}
            placeholder="Search to rent"
            placeholderColor={'grey'}
            onPress={() => {
              Keyboard.dismiss();
              setFilterEnabled(true);
            }}
          />
        );
      },

      headerTransparent: true,
    });
  }, []);

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
  if (isLoading) return <Placeholder />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <LocationCard
          image={{
            uri: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1658531506.jpg',
          }}
          list={['Heiti', 'Alaska', 'Virginia']}
          description="Description goes here"
          name="Johr Bahru"
        />
      </View>
      <View style={styles.absolute}>
        <Text style={styles.headerText}>Let The excitement unfold !</Text>
        <Text style={styles.subheader}>
          Begin Your Adventure From Johor Bahru
        </Text>
        <FastImage source={images.explore.car} style={styles.car} />
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
            onPress={() => {}}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Search;

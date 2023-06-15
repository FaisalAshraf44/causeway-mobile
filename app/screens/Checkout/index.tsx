import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import NavigationService from 'app/navigation/NavigationService';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  I18nManager,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FastImage from 'react-native-fast-image';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';
import moment from 'moment';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { isTablet } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import makeBooking from 'app/services/makeBooking';
const Checkout: React.FC = () => {
  const [selection, setSelection] = useState(1);
  const [promo, setPromo] = useState('Select Promo');
  const data = [{ label: 'Master Card', value: '1' }];
  const dispatch = useDispatch();
  const goBack = () => NavigationService.goBack();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const styles = useStyle();
  const [value, onChangeText] = React.useState('');
  const route = useRoute<any>();
  console.log('route', route?.params);
  const [dropDownValue, setDropDownValue] = useState(null);
  const [note, setNote] = useState('');
  const [discount, setDiscount] = useState<any>(undefined);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Checkout',
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerLeft: () => {
        return (
          <Pressable
            onPress={goBack}
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
      headerTransparent: false,
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
      },
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('TEMP_PROMO')
      .then(async (val: any) => {
        if (val) setPromo(val);
        const discount = await AsyncStorage.getItem('TEMP_PROMODISCOUNT');

        if (discount) {
          const temp = parseInt(discount) / 100;
          setDiscount(temp);
        }
      })
      .finally(() => {
        AsyncStorage.clear();
      });
  }, [isFocused]);
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.padding}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Booking Details</Text>
      </View>
      <View style={styles.subcontainer}>
        <View>
          <Text style={styles.keyText}>Car Model</Text>
          <Text style={styles.valueText}>
            {route?.params?.carDetail?.make +
              ' ' +
              route?.params?.carDetail?.model}
          </Text>
        </View>
        <View>
          <Text style={styles.keyText}>Schedule</Text>
          <Text style={styles.valueText}>
            {moment(route?.params?.bookingDetail?.startDate).format(
              'ddd, DD, MMM'
            ) +
              ' ' +
              moment(route?.params?.bookingDetail?.startTime).format('hh:mm a')}
          </Text>
          <Text style={styles.valueText}>
            {moment(route?.params?.bookingDetail?.endDate).format(
              'ddd, DD, MMM'
            ) +
              ' ' +
              moment(route?.params?.bookingDetail?.endTime).format('hh:mm a')}
          </Text>
        </View>
        <View>
          <Text style={styles.keyText}>Pickup & Return</Text>
          <Text style={styles.valueText}>
            {route?.params?.bookingDetail?.address?.address
              ? route?.params?.bookingDetail?.address?.address
              : route?.params?.carDetail?.location?.address}
          </Text>
        </View>
        <View>
          <Text style={styles.keyText}>Insurance Package</Text>
          <Text style={styles.valueText}>
            {route?.params?.insurance?.price != 0
              ? 'RM' + route?.params?.insurance?.price + '/day'
              : '-'}
          </Text>
        </View>
        <View>
          <Text style={styles.keyText}>Delivery & Pickup Charges</Text>
          <Text style={styles.valueText}>
            RM{route?.params?.totalPricePerDay}/day
          </Text>
        </View>
        <View>
          <Text style={styles.keyText}>Total Fair</Text>
          <Text style={styles.valueText}>
            RM
            {discount
              ? (
                  route?.params?.totalPrice / route?.params?.numberOfDays -
                  (route?.params?.totalPrice / route?.params?.numberOfDays) *
                    discount
                ).toFixed()
              : (
                  route?.params?.totalPrice / route?.params?.numberOfDays
                ).toFixed()}
            /day
          </Text>
        </View>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Promo Code</Text>
      </View>
      <View style={styles.promoContainer}>
        <TouchableOpacity
          style={styles.selectPromo}
          onPress={() => navigation.navigate('Promo')}
        >
          <Text style={styles.promoText}>{promo}</Text>
          <FastImage
            source={images.Payment.next}
            resizeMode="contain"
            style={styles.nextImg}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Payment Method</Text>
      </View>
      <View style={styles.promoContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          containerStyle={styles.containerStyle}
          itemTextStyle={styles.itemTextStyle}
          activeColor={theme.colors.darkgrey}
          valueField="value"
          placeholder="Select Payment Options"
          value={dropDownValue}
          onChange={(item: any) => {
            setDropDownValue(item.value);
          }}
        />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Note</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Feel free to write your request"
          placeholderTextColor={theme.colors.lightgrey}
          style={styles.input}
          multiline={true}
          onChangeText={setNote}
          value={note}
        />
      </View>
      <PrimaryButton
        textStyle={styles.buttonText}
        title="Pay Now"
        style={styles.buttonBox}
        onPress={() => {
          if (!dropDownValue) {
            dispatch(enableSnackbar('Please choose a payment method'));
            return;
          }
          let params;
          if (discount) {
            params = {
              ...route?.params,
              promo: { promo, discount },
              paymentDetails: { type: dropDownValue },
              note: note,
              totalPrice: (
                route?.params?.totalPrice / route?.params?.numberOfDays -
                (route?.params?.totalPrice / route?.params?.numberOfDays) *
                  discount
              ).toFixed(),
            };
          }
          params = {
            ...route?.params,
            promo: { promo, discount },
            paymentDetails: { type: dropDownValue },
            note: note,
          };
          navigation.navigate('PaymentDetails', params);
        }}
      />
    </ScrollView>
  );
};

export default Checkout;

import {
  CommonActions,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ConfirmationCard from 'app/components/ConfirmationCard';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import NavigationService from 'app/navigation/NavigationService';
import moment from 'moment';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  I18nManager,
  Keyboard,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useStyle } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { isTablet } from 'react-native-device-info';
import makeBooking from 'app/services/makeBooking';
import { store } from 'app/store/index';
import { useDispatch } from 'react-redux';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import charge from 'app/services/charge';

const PaymentDetails: React.FC = () => {
  const navigation = useNavigation<any>();
  const goBack = () => NavigationService.goBack();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useStyle();
  const route = useRoute<any>();
  const [isLoading, setIsLoading] = useState(false);
  const user = store.getState().user.user;
  const dispatch = useDispatch();
  console.log('rote', route?.params?.totalPrice);
  const [params, setParams] = useState<any>();
  const { createToken } = useStripe();

  const createBooking = async () => {
    try {
      const body = {
        car: route?.params?.carDetail?._id,
        user: user?.id,
        bookingStartDateTime: moment(
          route?.params?.bookingDetail?.startDate +
            route?.params?.bookingDetail?.startTime,
          'YYYY-MM-DDLT'
        ),
        bookingEndDateTime: moment(
          route?.params?.bookingDetail?.endDate +
            route?.params?.bookingDetail?.endTime,
          'YYYY-MM-DDLT'
        ),
        deliveryInformation: {
          deliveryMethod:
            route?.params?.bookingDetail?.selection == 1
              ? route?.params?.bookingDetail?.address?.type
              : route?.params?.bookingDetail?.address?.dropOff?.type,
          address:
            route?.params?.bookingDetail?.selection == 1
              ? route?.params?.bookingDetail?.selfService?.address
              : route?.params?.bookingDetail?.address?.dropOff?.address,
          lat:
            route?.params?.bookingDetail?.selection == 1
              ? route?.params?.bookingDetail?.selfService?.coordinates[0]
              : route?.params?.bookingDetail?.address?.dropOff?.lat,
          long:
            route?.params?.bookingDetail?.selection == 1
              ? route?.params?.bookingDetail?.selfService?.coordinates[1]
              : route?.params?.bookingDetail?.address?.dropOff?.lng,
        },
        insurancePackage: route?.params?.insurance?._id,
        valueAdsOns: route?.params?.addons?.filter((item: any) => {
          return item?.id;
        }),
        note: route?.params?.note,
        totalFair: route?.params?.totalPrice,
      };
      const response = await makeBooking(body);
      if (response?.status == 200 || response?.status == 201) {
        dispatch(enableSnackbar('Booking is succesfully created.'));
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('Bookings');
      } else {
        dispatch(enableSnackbar('Something went wrong, please try again'));
      }
    } catch {
      dispatch(enableSnackbar('Something went wrong, please try again'));
    } finally {
      setIsLoading(false);
    }
  };
  const submit = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const token = await createToken({
        type: 'Card',
      });

      if (token?.error) {
        dispatch(enableSnackbar(token?.error?.message));
        setIsLoading(false);
      } else {
        const paymentResponse = await charge({
          token: token?.token?.id,
          amount: route?.params?.totalPrice,
          currency: 'myr',
        });

        if (paymentResponse?.status == 200 || paymentResponse?.status == 201) {
          //success
          createBooking();
        } else {
          //fail
        }
      }
    } catch (err: any) {
      console.log('err', err);
      dispatch(enableSnackbar('Something went wrong, please try again'));
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Payment',
      headerShown: true,
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
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
      },
      headerTransparent: false,
    });
  }, []);

  return (
    <StripeProvider
      publishableKey={
        'pk_test_51NEFx2AVYtliYqfLhaEeOwNYGEgeoWCnFGY6cxgKykP00jvhJZYj1vqvUKlVTGSFR1uV9k6QcyPW96AR5sOmgFBn00XBcA96qM'
      }
    >
      <View style={styles.parentContainer}>
        <KeyboardAwareScrollView style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.headingTxt}>Card</Text>
            {/* <TextInput
            placeholder="Account title"
            placeholderTextColor={theme.colors.lightgrey}
            style={styles.input}
          /> */}

            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor:
                  Platform.OS == 'android'
                    ? theme.colors.text
                    : theme.colors.background,
                textColor:
                  Platform.OS == 'ios'
                    ? theme.colors.text
                    : theme.colors.background,
                borderRadius: widthPercentageToDP(3),
              }}
              style={{
                width: '100%',

                height: heightPercentageToDP(10),
                marginVertical: 30,
                borderRadius: widthPercentageToDP(3),
              }}
              onCardChange={(cardDetails: any) => {
                console.log('cardDetails', cardDetails);
                setParams(cardDetails);
              }}
              onFocus={(focusedField: any) => {
                console.log('focusField', focusedField);
              }}
            />
            <Text style={styles.bookingTxt}>Booking Details</Text>

            <View style={styles.cardContainer}>
              <ConfirmationCard
                carName={
                  route?.params?.carDetail?.make +
                  ' ' +
                  route?.params?.carDetail?.model
                }
                carModel={route?.params?.carDetail?.licensePlate}
                type="Automatic Transmission"
                startDate={
                  moment(route?.params?.bookingDetail?.startDate).format(
                    'ddd, DD, MMM'
                  ) +
                  ' ' +
                  moment(route?.params?.bookingDetail?.startTime).format(
                    'hh:mm a'
                  )
                }
                endDate={
                  moment(route?.params?.bookingDetail?.endDate).format(
                    'ddd, DD, MMM'
                  ) +
                  ' ' +
                  moment(route?.params?.bookingDetail?.endTime).format(
                    'hh:mm a'
                  )
                }
                totalFair={'RM' + route?.params?.totalPrice}
                features={route?.params?.carDetail?.features}
                width={widthPercentageToDP(68)}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <PrimaryButton
          style={styles.button}
          title="Pay Now"
          textStyle={styles.txtstyle}
          animating={isLoading}
          disabledWhileAnimating
          onPress={submit}
        />
      </View>
    </StripeProvider>
  );
};

export default PaymentDetails;

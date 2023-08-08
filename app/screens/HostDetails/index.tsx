import { useNavigation } from '@react-navigation/native';
import InputBoxWithIcon from 'app/components/InputBoxWithIcon';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import React, { useLayoutEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { I18nManager, Pressable, ScrollView, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'react-native-paper';
import NavigationService from 'app/navigation/NavigationService';
import { isTablet } from 'react-native-device-info';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useStyle } from './styles';
import { useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';

const HostDetails: React.FC = () => {
  const styles = useStyle();
  const [dropDownValue, setDropDownValue] = useState(null);
  const data = [{ label: 'Florida', value: '1' }];
  const [makeValue, setMakeValue] = useState<any>('');
  const makeData = [
    { label: 'Perodua', value: '1' },
    { label: 'Honda', value: '2' },
    { label: 'Nissan', value: '3' },
    { label: 'Proton', value: '4' },
    { label: 'Toyota', value: '5' },
    { label: 'Mazda', value: '6' },
    { label: 'Mercedes', value: '7' },
    { label: 'Mitsubishi', value: '8' },
    { label: 'Kia', value: '9' },
    { label: 'Perodua', value: '10' },
    { label: 'Hyundai', value: '11' },
    { label: 'Ford', value: '12' },
    { label: 'Peugeot', value: '13' },
    { label: 'Citroën', value: '14' },
    { label: 'BMW', value: '15' },
    { label: 'Volkswagen', value: '16' },
    { label: 'Alfa Romeo', value: '17' },
    { label: 'Aston Martin', value: '18' },
    { label: 'Audi', value: '19' },
    { label: 'Bentley', value: '20' },
    { label: 'Borgward', value: '21' },
    { label: 'Bufori', value: '22' },
    { label: 'BYD', value: '23' },
    { label: 'Caterham', value: '24' },
    { label: 'Chana', value: '25' },
    { label: 'Chery', value: '26' },
    { label: 'Chevrolet', value: '27' },
    { label: 'Citroen', value: '28' },
    { label: 'Ferrari', value: '29' },
    { label: 'Fiat', value: '30' },
    { label: 'GAC', value: '31' },
    { label: 'Great Wall', value: '32' },
    { label: 'Haval', value: '33' },
    { label: 'Hyandai', value: '34' },
    { label: 'Infiniti', value: '35' },
    { label: 'Isuzu', value: '36' },
    { label: 'Jaguar', value: '37' },
    { label: 'Jeep', value: '38' },
    { label: 'JMC', value: '39' },
    { label: 'Lamborghini', value: '40' },
    { label: 'Land Rover', value: '41' },
    { label: 'Lexus', value: '42' },
    { label: 'Lotus', value: '43' },
    { label: 'Mahindra', value: '44' },
    { label: 'Meserati', value: '45' },
    { label: 'Maxus', value: '46' },
    { label: 'McLaren', value: '47' },
    { label: 'MINI', value: '48' },
    { label: 'Neta', value: '49' },
    { label: 'Nissan', value: '50' },
    { label: 'Peugeot', value: '51' },
    { label: 'Porsche', value: '52' },
    { label: 'Renault', value: '53' },
    { label: 'Rolls-Royce', value: '54' },
    { label: 'Skoda', value: '55' },
    { label: 'Ssang Yong', value: '56' },
    { label: 'Subaru', value: '57' },
    { label: 'Suzuki', value: '58' },
    { label: 'Tata', value: '59' },
  ];
  const [yearValue, setYearValue] = useState<any>(null);
  const [image, setImage] = useState(images.Host.addImage);
  const yearData = [
    { label: '2023', value: '1' },
    { label: '2022', value: '2' },
    { label: '2021', value: '3' },
    { label: '2019', value: '4' },
    { label: '2018', value: '5' },
    { label: '2017', value: '6' },
    { label: '2016', value: '7' },
    { label: '2015', value: '8' },
    { label: '2014', value: '9' },
    { label: '2013', value: '10' },
    { label: '2012', value: '11' },
    { label: '2011', value: '12' },
    { label: '2010', value: '13' },
    { label: '2009', value: '14' },
    { label: '2008', value: '15' },
    { label: '2007', value: '16' },
    { label: '2006', value: '17' },
    { label: '2005', value: '18' },
    { label: '2004', value: '19' },
    { label: '2003', value: '20' },
    { label: '2002', value: '21' },
    { label: '2001', value: '22' },
    { label: '2000', value: '23' },
  ];
  const { t } = useTranslation();
  const goBack = () => NavigationService.goBack();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { control, handleSubmit, formState } = useForm();
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const submit = async (data: any) => {
    try {
      if (!makeValue || !makeValue?.id) {
        dispatch(enableSnackbar('Make is required'));
        return;
      }

      if (!yearValue || !yearValue?.id) {
        dispatch(enableSnackbar('Year is required'));
        return;
      }
      if (image == images.Host.addImage) {
        dispatch(enableSnackbar('Image is required'));
        return;
      }
      if (!validateEmail(data?.emailAddress)) {
        dispatch(enableSnackbar('Provide the correct email address'));
        return;
      }
      const tempData = { ...data };
      tempData.make = makeValue?.value;
      tempData.year = yearValue?.value;
      tempData.image = image?.uri;

      navigation.navigate('AppStack', {
        screen: 'HostFeatureAddition',
        params: tempData,
      });
    } catch (error) {
      console.error('Error sending data to API:', error);
      dispatch(enableSnackbar('Error sending data to server'));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Become a host',
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
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.textView}>
        <Text style={styles.text}>Start</Text>
        <Text style={styles.subText}>
          Share your contact information and the car you wish to subscribe out
          so we can bettter serve you.
        </Text>
      </View>
      <View style={styles.controller}>
        <Text style={styles.heading}>Owner’s First Name</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputBoxWithIcon
              onChangeText={onChange}
              numberOfCharacter={30}
              value={value}
              placeholder="Enter First Name"
            />
          )}
          name="firstName"
        />
        {formState.errors.firstName && (
          <Text
            style={[
              styles.error,
              { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
            ]}
          >
            {t('First name is required')}
          </Text>
        )}
      </View>
      <View style={styles.controller}>
        <Text style={styles.heading}>Owner’s Last Name</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputBoxWithIcon
              onChangeText={onChange}
              numberOfCharacter={30}
              value={value}
              placeholder="Enter Last Name"
            />
          )}
          name="lastName"
        />
        {formState.errors.lastName && (
          <Text
            style={[
              styles.error,
              { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
            ]}
          >
            {t('Last name is required')}
          </Text>
        )}
      </View>
      <View style={styles.controller}>
        <Text style={styles.heading}>Email Address</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputBoxWithIcon
              onChangeText={onChange}
              numberOfCharacter={30}
              value={value}
              placeholder="Enter Email Address"
            />
          )}
          name="emailAddress"
        />
        {formState.errors.emailAddress && (
          <Text
            style={[
              styles.error,
              { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
            ]}
          >
            {t('Email address is required')}
          </Text>
        )}
      </View>
      <View style={styles.controller}>
        <Text style={styles.heading}>Mobile</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputBoxWithIcon
              onChangeText={onChange}
              numberOfCharacter={30}
              value={value}
              keyboardType="dialpad"
              placeholder="+60 XX-XXX-XXXX"
              renderIcon={() => (
                <FastImage
                  source={images.Host.flag}
                  resizeMode="contain"
                  style={styles.flagImg}
                />
              )}
            />
          )}
          name="phone"
        />
        {formState.errors.phone && (
          <Text
            style={[
              styles.error,
              { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
            ]}
          >
            {t('Phone is required')}
          </Text>
        )}
      </View>
      {/* <View style={styles.controller}>
        <Text style={styles.dropeHeading}>State</Text>
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
            placeholder="Select State"
            value={dropDownValue}
            onChange={(item: any) => {
              setDropDownValue(item.value);
            }}
          />
        </View>
      </View> */}
      <View style={styles.controller}>
        <Text style={styles.dropeHeading}>Make</Text>
        <View style={styles.promoContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={makeData}
            labelField="label"
            containerStyle={styles.containerStyle}
            itemTextStyle={styles.itemTextStyle}
            activeColor={theme.colors.darkgrey}
            valueField="value"
            placeholder="Select Make"
            value={makeValue?.id}
            onChange={(item: any) => {
              setMakeValue({ id: item?.value, value: item.label });
            }}
          />
        </View>
      </View>
      <View style={styles.controller}>
        <Text style={styles.heading}>Model</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputBoxWithIcon
              onChangeText={onChange}
              numberOfCharacter={30}
              value={value}
              placeholder="Enter Model"
            />
          )}
          name="model"
        />
        {formState.errors.model && (
          <Text
            style={[
              styles.error,
              { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
            ]}
          >
            {t('Model is required')}
          </Text>
        )}
      </View>
      <View style={styles.controller}>
        <Text style={styles.dropeHeading}>Year</Text>
        <View style={styles.promoContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={yearData}
            labelField="label"
            containerStyle={styles.containerStyle}
            itemTextStyle={styles.itemTextStyle}
            activeColor={theme.colors.darkgrey}
            valueField="value"
            placeholder="Select Year"
            value={yearValue?.id}
            onChange={(item: any) => {
              setYearValue({ id: item?.value, value: item.label });
            }}
          />
        </View>
      </View>
      <View style={styles.controller}>
        <Text style={styles.heading}>Mileage (Optional)</Text>
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, value } }) => (
            <InputBoxWithIcon
              onChangeText={onChange}
              numberOfCharacter={30}
              value={value}
              placeholder="Enter Mileage (Optional)"
            />
          )}
          name="milage"
        />
      </View>
      <View style={styles.controller}>
        <Text style={styles.heading}>Add Photos</Text>
        <TouchableOpacity
          style={styles.addContainer}
          onPress={async () => {
            const result = await launchImageLibrary({
              mediaType: 'photo',
              selectionLimit: 1,
            });

            if (result?.assets && result?.assets?.length > 0) {
              setImage({ uri: result?.assets[0]?.uri });
            }
          }}
        >
          <FastImage
            source={image}
            resizeMode="contain"
            style={{
              height:
                image == images.Host.addImage
                  ? heightPercentageToDP(5)
                  : heightPercentageToDP(10),
              width:
                image == images.Host.addImage
                  ? widthPercentageToDP(10)
                  : widthPercentageToDP(20),
            }}
          />
          {image == images.Host.addImage ? (
            <Text style={styles.imgtext}>Add Image</Text>
          ) : null}
        </TouchableOpacity>
        {/* <Text style={styles.subText}>You can add upto 10 images</Text> */}
      </View>
      <PrimaryButton
        title="Next"
        style={styles.button}
        onPress={handleSubmit(submit)}

      // }}
      />
    </ScrollView>
  );
};

export default React.memo(HostDetails);

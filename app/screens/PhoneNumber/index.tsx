import { useNavigation } from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import React, { useLayoutEffect, useState } from 'react';
import { I18nManager, Pressable, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { isTablet } from 'react-native-device-info';
import NavigationService from 'app/navigation/NavigationService';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useForm, Controller } from 'react-hook-form';


const PhoneNumber: React.FC = () => {
  const styles = useStyle();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const goBack = () => NavigationService.goBack();
  const [dropDownValue, setDropDownValue] = useState<string | null>(null);
  const [isNumberEntered, setIsNumberEntered] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = () => {
    if (!dropDownValue || dropDownValue === '') {
      setShowError(true); // Show error if country code is not entered
    } else if (Object.keys(errors).length === 0) {
      navigation.navigate('LicenseVerification');
      setShowError(false); // Clear the error state
    } else {
      setShowError(true); // Show error if there are validation errors
    }
  };



  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Phone Number',
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
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];


  const handleContinue = () => {
    if (isNumberEntered) {
      navigation.navigate('LicenseVerification');
      setShowError(false); // Clear the error state
    } else {
      setShowError(true); // Show error if mobile number is not entered
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.phoneGuideText}>
          Enter your mobile number and we’ll test you a verification code.
        </Text>
        <Text style={[styles.phoneGuideText, styles.paddingVer]}>
          Country Code
        </Text>
        <Controller
          control={control}
          rules={{
            required: 'Country code is required',
          }}
          render={({ field }) => (
            <View>
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
                placeholder="(+60)"
                value={dropDownValue}
                onChange={(item: any) => {
                  setDropDownValue(item.value);
                  field.onChange(item.value); // Trigger validation for the dropdown
                }}
                renderLeftIcon={() => (
                  <View style={styles.rowDirection}>
                    <FastImage
                      source={images.UploadPhoto.flag}
                      resizeMode="contain"
                      style={styles.addImage}
                    />
                    <FastImage
                      source={images.UploadPhoto.down}
                      resizeMode="contain"
                      style={styles.arrowImage}
                    />
                  </View>
                )}
                renderRightIcon={() => undefined}
              />
              {errors.countryCode && (
                <Text style={styles.error}>{errors.countryCode.message}</Text>
              )}
            </View>
          )}
          name="countryCode"
          defaultValue=""
        />
        <Controller
          control={control}
          rules={{
            required: 'Mobile number is required',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Please enter a valid mobile number',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                style={[
                  styles.inputStyle,
                  errors.mobileNumber ? styles.error : undefined,
                ]}
                placeholder="Mobile Number"
                placeholderTextColor={theme.colors.lightgrey}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.mobileNumber && (
                <Text style={styles.error}>{errors.mobileNumber.message}</Text>
              )}
            </View>
          )}
          name="mobileNumber"
          defaultValue=""
        />

        <View style={styles.buttonsContainer}>
          <PrimaryButton
            style={styles.button}
            // disabled={isNumberEntered ? false : true}
            title="Continue"
            textStyle={styles.txtstyle}
            onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  );
};

export default PhoneNumber;

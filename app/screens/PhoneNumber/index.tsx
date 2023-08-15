import { useNavigation, useRoute } from '@react-navigation/native';
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
  const route = useRoute<any>();
  const theme = useTheme();
  const goBack = () => NavigationService.goBack();
  const [dropDownValue, setDropDownValue] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>('');
  const { control, handleSubmit, formState: { errors } } = useForm();

  const receivedParams = route.params;
  const onSubmit = (data) => {
    if (!dropDownValue || dropDownValue === '') {
      setShowError(true);
    } else if (Object.keys(errors).length === 0) {
      const fullMobileNumber = `${dropDownValue} ${data.mobileNumber}`;
      navigation.navigate('LicenseVerification', {
        ...receivedParams,
        mobileNumber: fullMobileNumber,
      });
      setShowError(false);
    } else {
      setShowError(true);
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
    { label: '+91', value: '+91' },
    { label: '+92', value: '+92' },
    { label: '+93', value: '+93' },
    { label: '+94', value: '+94' },
    { label: '+95', value: '+95' },
    { label: '+96', value: '+96' },
    { label: '+97', value: '+97' },
    { label: '+98', value: '+98' },
  ];

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
                  setCountryCode(item.label);
                  field.onChange(item.value);
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
              value: /^\+?[0-9]*$/,
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
                placeholder={`Mobile Number`}
                placeholderTextColor={theme.colors.lightgrey}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </View>
          )}
          name="mobileNumber"
          defaultValue=""
        />
        {errors.mobileNumber && (
          <Text style={styles.error}>{errors.mobileNumber.message}</Text>
        )}

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

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
  const [dropDownValue, setDropDownValue] = useState<string | null>(null);
  const [isNumberEntered, setIsNumberEntered] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const { handleSubmit, control, errors } = useForm();


  const onSubmit = (data: any) => {
    navigation.navigate('LicenseVerification');
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
          render={({ field: { onChange, value } }) => (
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
              value={value}
              onChange={(selectedValue: string) => onChange(selectedValue)}
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
          )}
          name="countryCode"
          defaultValue=""
        />
        {errors.countryCode && (
          <Text style={styles.error}>Please select a country code</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.inputStyle,
                errors.mobileNumber ? styles.error : undefined,
              ]}
              placeholder="Mobile Number"
              placeholderTextColor={theme.colors.lightgrey}
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
            />
          )}
          name="mobileNumber"
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.mobileNumber && (
          <Text style={styles.error}>Please enter a valid mobile number</Text>
        )}
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            style={styles.button}
            // disabled={isNumberEntered ? false : true}
            title="Continue"
            textStyle={styles.txtstyle}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
};

export default PhoneNumber;

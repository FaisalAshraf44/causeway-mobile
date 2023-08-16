import { useNavigation, useRoute } from '@react-navigation/native';
import InputBoxWithIcon from 'app/components/InputBoxWithIcon';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import React, { useLayoutEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { I18nManager, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyle } from './styles';
import { isTablet } from 'react-native-device-info';
import NavigationService from 'app/navigation/NavigationService';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import updateInfo from 'app/services/userInfo';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

const LicenseVerification: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { control, handleSubmit, formState, setValue } = useForm();
  const goBack = () => NavigationService.goBack();
  const dispatch = useDispatch();

  const [licenseFrontName, setLicenseFrontName] = useState<string | undefined>()
  const [licenseBackName, setLicenseBackName] = useState<string | undefined>()
  const [passportFrontName, setPassportFrontName] = useState<string | undefined>()
  const [passportBackName, setPassportBackName] = useState<string | undefined>()

  const onSubmit = async (data) => {
    console.log('params.......', route.params);

    try {
      const filenamePrefix = Date.now().toString();
      const uploadAndStoreImage = async (imageData, imageName, filenamePrefix) => {
        try {
          const filename = `${filenamePrefix}-${imageName}`;

          await storage()
            .ref(`${imageName}s/${filename}`)
            .putFile(imageData);

          const imageUrl = await storage()
            .ref(`${imageName}s/${filename}`)
            .getDownloadURL();

          return imageUrl;
        } catch (error) {
          console.error('Error uploading image:', error);
          throw error;
        }
      };
      const licenseFrontUrl = await uploadAndStoreImage(data.licenseFront, 'licenseFront', filenamePrefix);
      const licenseBackUrl = await uploadAndStoreImage(data.licenseBack, 'licenseBack', filenamePrefix);
      const passportFrontUrl = await uploadAndStoreImage(data.passportFrontName, 'passportFrontName', filenamePrefix);
      const passportBackUrl = await uploadAndStoreImage(data.passportBackName, 'passportBackName', filenamePrefix);
      console.log('params.......', route.params)

      const license = {
        name: data.name,
        country: data.country,
        licenseNumber: data.licenseNumber,
        driverLicenseFrontPhoto: licenseFrontUrl,
        driverLicenseBackPhoto: licenseBackUrl,
        passportOrICFrontPhoto: passportFrontUrl,
        passportOrICBackPhoto: passportBackUrl
      };

      const params = route.params;
      const response = await apiClient.post(ApiConfig.USER_INFO, {
        name: data.name,
        phoneNumber: params.phoneNumber,
        photo: params.photo,
        license: license,
      });
      console.log('API Response:', response.data);
      navigation.navigate('Profile')
      setTimeout(() => {
        navigation.goBack();
        dispatch(enableSnackbar('Thank you for verifying profile'));
      }, 100);

    } catch (error) {
      // console.error('Error updating info:', error);
      console.log('API Error Response:', error.response.data);

    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'License Verification',
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.subContainer}>
          <Text style={styles.guideText}>
            You must have a valid driver’s license to book on Causeway Car Rental.
          </Text>
          <View style={styles.controller}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputBoxWithIcon
                  onChangeText={onChange}
                  onBlur={onBlur}
                  numberOfCharacter={30}
                  value={value}
                  placeholder="Name on the License"
                  renderIcon={() => (
                    <FastImage
                      source={images.LicenseVerification.profile}
                      resizeMode="contain"
                      style={styles.socialImage}
                    />
                  )}
                />
              )}
              name="name"
            />
            {formState.errors.name && (
              <Text style={[
                styles.error,
                { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
              ]}>
                {t('Name is required')}
              </Text>
            )}
          </View>
          <View style={styles.controller}>
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
                  placeholder="Country"
                  renderIcon={() => (
                    <FastImage
                      source={images.LicenseVerification.building}
                      resizeMode="contain"
                      style={styles.socialImage}
                    />
                  )}
                />
              )}
              name="country"
            />

            {formState.errors.country && (
              <Text
                style={[
                  styles.error,
                  { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
                ]}
              >
                {t('Country is required')}
              </Text>
            )}
          </View>
          <View style={styles.controller}>
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
                  placeholder="License Number"
                  renderIcon={() => (
                    <FastImage
                      source={images.LicenseVerification.licenseNumber}
                      resizeMode="contain"
                      style={styles.socialImage}
                    />
                  )}
                />
              )}
              name="licenseNumber"
            />
            {formState.errors.licenseNumber && (
              <Text
                style={[
                  styles.error,
                  { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
                ]}
              >
                {t('License Number is required')}
              </Text>
            )}
          </View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={[
                  styles.textView,
                ]}
                onPress={async () => {
                  try {
                    const result = await launchImageLibrary({
                      mediaType: 'photo',
                      selectionLimit: 1,
                    });
                    if (!result.didCancel && result.assets && result.assets.length > 0) {
                      const uriParts = result.assets[0].uri.split('/');
                      const imageName = uriParts[uriParts.length - 1];
                      setLicenseFrontName(imageName);
                      onChange(result.assets[0].uri);
                      setValue('licenseFront', result.assets[0].uri)
                    }
                  } catch (error) {
                    console.error('Error selecting image:', error);
                  }
                }}
              >
                <React.Fragment>
                  <FastImage
                    source={images.LicenseVerification.license}
                    resizeMode="contain"
                    style={styles.socialImage}
                  />
                  {value ? (
                    <Text style={[styles.textStyles, { marginRight: 30, color: '#FFF' }]}>
                      {licenseFrontName}
                    </Text>
                  ) : (
                    <Text style={styles.textStyles}>Upload Driver's License (Front)</Text>
                  )}
                </React.Fragment>
              </TouchableOpacity>
            )}
            name="licenseFront"
          />
          {!formState?.values?.licenseFront && formState.errors.licenseFront && (
            <Text style={[styles.error, { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' }]}>
              {t("Driver's License (Front) is required")}
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={[
                  styles.textView,
                ]}
                onPress={async () => {
                  try {
                    const result = await launchImageLibrary({
                      mediaType: 'photo',
                      selectionLimit: 1,
                    });
                    if (!result.didCancel && result.assets && result.assets.length > 0) {
                      const uriParts = result.assets[0].uri.split('/');
                      const imageName = uriParts[uriParts.length - 1];
                      setLicenseBackName(imageName);
                      onChange(result.assets[0].uri);
                      setValue('licenseBack', result.assets[0].uri)
                    }
                  } catch (error) {
                    console.error('Error selecting image:', error);
                  }
                }}
              >
                <React.Fragment>
                  <FastImage
                    source={images.LicenseVerification.license}
                    resizeMode="contain"
                    style={styles.socialImage}
                  />
                  {value ? (
                    <Text style={[styles.textStyles, { marginRight: 30, color: '#FFF' }]}>
                      {licenseBackName}
                    </Text>
                  ) : (
                    <Text style={styles.textStyles}>Upload Driver's License (Back)</Text>
                  )}
                </React.Fragment>
              </TouchableOpacity>
            )}
            name="licenseBack"
          />
          {!formState?.values?.licenseBack && formState.errors.licenseBack && (
            <Text style={[styles.error, { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' }]}>
              {t("Driver's License (Back) is required")}
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={[
                  styles.textView,
                ]}
                onPress={async () => {
                  try {
                    const result = await launchImageLibrary({
                      mediaType: 'photo',
                      selectionLimit: 1,
                    });
                    if (!result.didCancel && result.assets && result.assets.length > 0) {
                      const uriParts = result.assets[0].uri.split('/');
                      const imageName = uriParts[uriParts.length - 1];
                      setPassportFrontName(imageName);
                      onChange(result.assets[0].uri);
                      setValue('passportFrontName', result.assets[0].uri)
                    }
                  } catch (error) {
                    console.error('Error selecting image:', error);
                  }
                }}
              >
                <React.Fragment>
                  <FastImage
                    source={images.LicenseVerification.license}
                    resizeMode="contain"
                    style={styles.socialImage}
                  />
                  {value ? (
                    <Text style={[styles.textStyles, { marginRight: 30, color: '#FFF' }]}>
                      {passportFrontName}
                    </Text>
                  ) : (
                    <Text style={styles.textStyles}>Upload IC / Passport (Front)</Text>
                  )}
                </React.Fragment>
              </TouchableOpacity>
            )}
            name="passportFrontName"
          />
          {!formState?.values?.passportFrontName && formState.errors.passportFrontName && (
            <Text style={[styles.error, { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' }]}>
              {t("Driver's passport (Front) required")}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={[
                  styles.textView,
                ]}
                onPress={async () => {
                  try {
                    const result = await launchImageLibrary({
                      mediaType: 'photo',
                      selectionLimit: 1,
                    });
                    if (!result.didCancel && result.assets && result.assets.length > 0) {
                      const uriParts = result.assets[0].uri.split('/');
                      const imageName = uriParts[uriParts.length - 1];
                      setPassportBackName(imageName);
                      onChange(result.assets[0].uri);
                      setValue('passportBackName', result.assets[0].uri)
                    }
                  } catch (error) {
                    console.error('Error selecting image:', error);
                  }
                }}
              >
                <React.Fragment>
                  <FastImage
                    source={images.LicenseVerification.license}
                    resizeMode="contain"
                    style={styles.socialImage}
                  />
                  {value ? (
                    <Text style={[styles.textStyles, { marginRight: 30, color: '#FFF' }]}>
                      {passportBackName}
                    </Text>
                  ) : (
                    <Text style={styles.textStyles}>Upload IC / Passport (Back)</Text>
                  )}
                </React.Fragment>
              </TouchableOpacity>
            )}
            name="passportBackName"
          />
          {!formState?.values?.passportBackName && formState.errors.passportBackName && (
            <Text style={[styles.error, { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' }]}>
              {t("Driver's passport (Back) required")}
            </Text>
          )}






          <View style={styles.buttonsContainer}>
            <PrimaryButton
              style={styles.button}
              title="Continue"
              textStyle={styles.txtstyle}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default LicenseVerification;

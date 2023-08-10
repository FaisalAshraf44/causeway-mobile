import { StackActions, useNavigation } from '@react-navigation/native';
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


const LicenseVerification: React.FC = () => {



  const styles = useStyle();
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { control, handleSubmit, formState } = useForm();
  const goBack = () => NavigationService.goBack();
  const [licenseFront, setLicenseFront] = useState<string | undefined>()
  const [licenseBack, setLicenseBack] = useState<string | undefined>()
  const [passportFront, setPassportFront] = useState<string | undefined>()
  const [passportBack, setPassportBack] = useState<string | undefined>()
  const [verificationResponse, setVerificationResponse] = useState<any>(null);

  const dispatch = useDispatch();


  const onSubmit = () => {
    console.log('profile')
    if (!formState.errors.name && !formState.errors.country && !formState.errors.licenseNumber && licenseFront && licenseBack && passportFront && passportBack) {
      console.log('profiel')
      navigation.navigate('Profile');
      setTimeout(() => {
        navigation.goBack();
        dispatch(
          enableSnackbar(
            'Thank you for verifying profile'
          )
        );
      }, 100);
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
          <TouchableOpacity
            style={[
              styles.textView,
              licenseFront && styles.imageContainer,
            ]}
            onPress={async () => {
              try {
                const result = await launchImageLibrary({
                  mediaType: 'photo',
                  selectionLimit: 1,
                });

                if (!result.didCancel && result.assets && result.assets.length > 0) {
                  setLicenseFront(result.assets[0].uri);
                }
              } catch (error) {
                console.error('Error selecting image:', error);
              }
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <React.Fragment>
                  {licenseFront ? (
                    <FastImage
                      source={{ uri: licenseFront }}
                      resizeMode="contain"
                      style={styles.selectedImage}
                    />
                  ) : (
                    <React.Fragment>
                      <FastImage
                        source={images.LicenseVerification.license}
                        resizeMode="contain"
                        style={styles.socialImage}
                      />
                      <Text style={styles.textStyles}>Upload Driver's License (Front)</Text>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
              name="licenseFront"
            />

          </TouchableOpacity>
          {!licenseFront && formState.errors.licenseFront && (
            <Text style={[styles.error,
            { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' }]}>
              {t('Driver\'s License (Front) is required')}
            </Text>
          )}


          <TouchableOpacity
            style={[
              styles.textView,
              licenseBack && styles.imageContainer,
            ]}
            onPress={async () => {
              try {
                const result = await launchImageLibrary({
                  mediaType: 'photo',
                  selectionLimit: 1,
                });

                if (!result.didCancel && result.assets && result.assets.length > 0) {
                  setLicenseBack(result.assets[0].uri);
                }
              } catch (error) {
                console.error('Error selecting image:', error);
              }
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <React.Fragment>
                  {licenseBack ? (
                    <FastImage
                      source={{ uri: licenseBack }}
                      resizeMode="contain"
                      style={styles.selectedImage}
                    />
                  ) : (
                    <React.Fragment>
                      <FastImage
                        source={images.LicenseVerification.license}
                        resizeMode="contain"
                        style={styles.socialImage}
                      />
                      <Text style={styles.textStyles}>Upload Driver's License (Back)</Text>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
              name="licenseBack"
            />

          </TouchableOpacity>
          {!licenseBack && formState.errors.licenseBack && (
            <Text style={[
              styles.error,
              { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
            ]}>
              {t('Driver\'s License (Back) is required')}
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.textView,
              passportFront && styles.imageContainer,
            ]}
            onPress={async () => {
              try {
                const result = await launchImageLibrary({
                  mediaType: 'photo',
                  selectionLimit: 1,
                });

                if (!result.didCancel && result.assets && result.assets.length > 0) {
                  setPassportFront(result.assets[0].uri);
                }
              } catch (error) {
                console.error('Error selecting image:', error);
              }
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <React.Fragment>
                  {passportFront ? (
                    <FastImage
                      source={{ uri: passportFront }}
                      resizeMode="contain"
                      style={styles.selectedImage}
                    />
                  ) : (
                    <React.Fragment>
                      <FastImage
                        source={images.LicenseVerification.upload}
                        resizeMode="contain"
                        style={styles.socialImage}
                      />
                      <Text style={styles.textStyles}>Upload IC / Passport (Front)</Text>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
              name="passportFront"
            />

          </TouchableOpacity>
          {!passportFront && formState.errors.passportFront && (
            <Text style={[
              styles.error,
              { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
            ]}>
              {t('IC / Passport (Front) is required')}
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.textView,
              passportBack && styles.imageContainer,
            ]}
            onPress={async () => {
              try {
                const result = await launchImageLibrary({
                  mediaType: 'photo',
                  selectionLimit: 1,
                });

                if (!result.didCancel && result.assets && result.assets.length > 0) {
                  setPassportBack(result.assets[0].uri);
                }
              } catch (error) {
                console.error('Error selecting image:', error);
              }
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <React.Fragment>
                  {passportBack ? (
                    <FastImage
                      source={{ uri: passportBack }}
                      resizeMode="contain"
                      style={styles.selectedImage}
                    />
                  ) : (
                    <React.Fragment>
                      <FastImage
                        source={images.LicenseVerification.upload}
                        resizeMode="contain"
                        style={styles.socialImage}
                      />
                      <Text style={styles.textStyles}>Upload IC / Passport (Back)</Text>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
              name="passportBack"
            />

          </TouchableOpacity>
          {!passportBack && formState.errors.passportBack && (
            <Text style={[
              styles.error,
              { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
            ]}>
              {t('IC / Passport (Back) is required')}
            </Text>
          )}

          <View style={styles.buttonsContainer}>
            <PrimaryButton
              style={styles.button}
              title="Continue"
              textStyle={styles.txtstyle}
              onPress={onSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default LicenseVerification;

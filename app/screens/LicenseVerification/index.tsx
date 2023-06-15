import { useNavigation } from '@react-navigation/native';
import InputBoxWithIcon from 'app/components/InputBoxWithIcon';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import React, { useLayoutEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyle } from './styles';

const LicenseVerification: React.FC = () => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'License Verification',
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerTransparent: false,
    });
  }, []);
  const styles = useStyle();
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { control, formState } = useForm();
  return (
    <SafeAreaView style={styles.container}>
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
            render={({ field: { onChange, value } }) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                numberOfCharacter={30}
                value={value}
                placeholder="Name"
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
            <Text
              style={[
                styles.error,
                { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
              ]}
            >
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

          {formState.errors.name && (
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

          {formState.errors.name && (
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
                placeholder="Upload Driver's License (Front)"
                renderIcon={() => (
                  <FastImage
                    source={images.LicenseVerification.license}
                    resizeMode="contain"
                    style={styles.socialImage}
                  />
                )}
              />
            )}
            name="licenseFront"
          />

          {formState.errors.name && (
            <Text
              style={[
                styles.error,
                { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
              ]}
            >
              {t('Driver License is required')}
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
                placeholder="Upload Driver's License (Back)"
                renderIcon={() => (
                  <FastImage
                    source={images.LicenseVerification.license}
                    resizeMode="contain"
                    style={styles.socialImage}
                  />
                )}
              />
            )}
            name="licenseBack"
          />

          {formState.errors.name && (
            <Text
              style={[
                styles.error,
                { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
              ]}
            >
              {t('Driver License is required')}
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
                placeholder="Upload IC / Passport (Front)"
                renderIcon={() => (
                  <FastImage
                    source={images.LicenseVerification.license}
                    resizeMode="contain"
                    style={styles.socialImage}
                  />
                )}
              />
            )}
            name="passportFront"
          />

          {formState.errors.name && (
            <Text
              style={[
                styles.error,
                { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
              ]}
            >
              {t('Required')}
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
                placeholder="Upload IC / Passport (Back)"
                renderIcon={() => (
                  <FastImage
                    source={images.LicenseVerification.license}
                    resizeMode="contain"
                    style={styles.socialImage}
                  />
                )}
              />
            )}
            name="passportBack"
          />

          {formState.errors.name && (
            <Text
              style={[
                styles.error,
                { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
              ]}
            >
              {t('Required')}
            </Text>
          )}
        </View>
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            style={styles.button}
            title="Continue"
            textStyle={styles.txtstyle}
            onPress={() => console.log('Button Pressed')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LicenseVerification;

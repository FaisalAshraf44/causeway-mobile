import { useNavigation } from '@react-navigation/native';
import InputBoxWithIcon from 'app/components/InputBoxWithIcon';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import NavigationService from 'app/navigation/NavigationService';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Keyboard, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStyle } from './styles';
import { useDispatch } from 'react-redux';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import forgotPassword from 'app/services/forgotPassword';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const ForgotPassword: React.FC = () => {
  const goBack = () => NavigationService.goBack();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useStyle();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, reset, trigger, formState, getValues } =
    useForm();
  const dispatch = useDispatch();

  const forgetPassword = async (data?: any) => {
    Keyboard.dismiss();
    if (!ValidateEmail(data?.email)) {
      dispatch(enableSnackbar('Please input the correct email address.'));
      return;
    }

    try {
      setIsLoading(true);
      const response = await forgotPassword(data?.email);

      if (response?.status == 200) {
        navigation.navigate('OtpPassword', { email: data?.email });
      } else {
        dispatch(enableSnackbar('Something went wrong. Please try again.'));
      }
    } catch (err) {
      dispatch(enableSnackbar('Account does not exist'));
    } finally {
      setIsLoading(false);
    }
  };

  const ValidateEmail = (email: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }

    return false;
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="always"
    >
      <FastImage
        source={images.global.logoMini}
        resizeMode="contain"
        style={styles.Img}
      />
      <View style={styles.subcontainer}>
        <Text style={styles.text1}>Can't remember your password?</Text>
        <Text style={styles.text2}>Don't worry, we've got you covered</Text>
        <Text style={styles.text3}>
          Enter your email so that we can send you an otp code to reset your
          password.
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
                inputStyle={styles.inputtext}
                numberOfCharacter={40}
                value={value}
                style={styles.input}
                placeholder="Email"
                renderIcon={() => (
                  <MaterialCommunityIcons
                    name="email"
                    size={widthPercentageToDP(6)}
                    color={theme.colors.lightgrey}
                  />
                )}
              />
            )}
            name="email"
          />

          {formState.errors.email && (
            <Text
              style={[
                styles.error,
                { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
              ]}
            >
              {t('Email is required')}
            </Text>
          )}
        </View>
        <PrimaryButton
          style={styles.button}
          title="Send"
          textStyle={styles.txtstyle}
          disabledWhileAnimating
          animating={isLoading}
          onPress={handleSubmit(forgetPassword)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;

import {
  CommonActions,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStyle } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import { useDispatch } from 'react-redux';
import resetPassword from 'app/services/resetPassword';
const ResetPassword: React.FC = () => {
  const goBack = () => NavigationService.goBack();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useStyle();
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [successful, setSuccesful] = useState(false);
  const { control, handleSubmit, reset, trigger, formState, getValues } =
    useForm();

  const resetPasswordCall = async (data?: any) => {
    Keyboard.dismiss();

    if (data?.password != data?.confirmPassword) {
      dispatch(enableSnackbar('Passwords do not match'));
      return;
    }
    try {
      setIsLoading(true);
      const response = await resetPassword(
        route?.params?.token,
        data?.password
      );

      if (response?.status == 200) {
        setSuccesful(true);
      }
    } catch (err) {
      console.log('err', err);
      dispatch(enableSnackbar('Something went wrong. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  if (successful)
    return (
      <View style={styles.containerSuccessful}>
        <FastImage
          source={images.global.logoMini}
          resizeMode="stretch"
          style={[
            styles.Img,
            {
              marginVertical: heightPercentageToDP(3),
              height: heightPercentageToDP(20),
              width: widthPercentageToDP(50),
            },
          ]}
        />
        <Text style={styles.textSuccessful}>
          Your password has been reset successfully
        </Text>
        <PrimaryButton
          style={styles.button}
          title="Okay"
          textStyle={styles.txtstyle}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: 'Login' }],
              })
            )
          }
        />
      </View>
    );
  else
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
          <Text style={styles.text1}>Reset Password</Text>
          <Text style={styles.text2}>
            Create a new password that's secure and easy to remember.
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
                  numberOfCharacter={30}
                  type="password"
                  value={value}
                  style={styles.input}
                  placeholder="New Password"
                  renderIcon={() => (
                    <MaterialCommunityIcons
                      name="lock"
                      size={widthPercentageToDP(6)}
                      color={theme.colors.lightgrey}
                    />
                  )}
                />
              )}
              name="password"
            />
            {formState.errors.password && (
              <Text
                style={[
                  styles.error,
                  { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
                ]}
              >
                {t('Password is required')}
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
                  inputStyle={styles.inputtext}
                  numberOfCharacter={30}
                  value={value}
                  style={styles.input}
                  type="password"
                  placeholder="Confirm Password"
                  renderIcon={() => (
                    <MaterialCommunityIcons
                      name="lock"
                      size={widthPercentageToDP(6)}
                      color={theme.colors.lightgrey}
                    />
                  )}
                />
              )}
              name="confirmPassword"
            />
            {formState.errors.confirmPassword && (
              <Text
                style={[
                  styles.error,
                  { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
                ]}
              >
                {t('Confirm password is required')}
              </Text>
            )}
          </View>
          <PrimaryButton
            style={styles.button}
            title="Reset Password"
            textStyle={styles.txtstyle}
            onPress={handleSubmit(resetPasswordCall)}
          />
        </View>
      </KeyboardAwareScrollView>
    );
};

export default ResetPassword;

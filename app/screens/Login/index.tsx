import { useNavigation, useRoute } from '@react-navigation/native';
import InputBoxWithIcon from 'app/components/InputBoxWithIcon';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import signInUser from 'app/services/signInUser';
import { onTempLogin } from 'app/store/slice/loadingSlice';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import { onLogin } from 'app/store/slice/userSlice';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Keyboard, Pressable, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useStyle } from './styles';

const Login: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const route = useRoute<any>();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { control, handleSubmit, reset, trigger, formState, getValues } =
    useForm();
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const signIn = async (data?: any) => {
    if (!ValidateEmail(data?.email)) {
      Keyboard.dismiss();

      dispatch(enableSnackbar('Please input the correct email address.'));
      return;
    }
    try {
      setIsLoading(true);
      const response = await signInUser(data?.email, data?.password);

      if (response?.status == 200) {
        if (rememberMe) dispatch(onLogin(response?.data));
        else dispatch(onTempLogin(response?.data));
      } else {
        dispatch(enableSnackbar('Email/Password is not correct.'));
      }
      if (route?.name == 'SignIn') {
        navigation.goBack();
        return;
      }
      navigation.navigate('Explore');
      dispatch(enableSnackbar('Login Successfull.'));
    } catch (err) {
      dispatch(enableSnackbar('Email/Password is not correct.'));
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
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <FastImage
          source={images.global.logoMini}
          resizeMode="contain"
          style={styles.logo}
        />

        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.text}>Enter details to continue</Text>
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
                placeholder="Email"
                renderIcon={() => (
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={widthPercentageToDP(5)}
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
                placeholder="Password"
                type="password"
                renderIcon={() => (
                  <Entypo
                    name="lock"
                    size={widthPercentageToDP(5)}
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
        <View style={styles.bottomContainer}>
          <BouncyCheckbox
            size={22}
            // fillColor={theme.colors.text}
            unfillColor="#FFFFFF"
            text="Remember me"
            useNativeDriver
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIcon}
            style={{ backgroundColor: theme.colors.background }}
            textStyle={{ fontFamily: theme.fonts.regularFont }}
            isChecked={rememberMe}
            onPress={(isChecked: boolean) => {
              setRememberMe(isChecked);
            }}
          />
          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={[styles.text, { marginBottom: heightPercentageToDP(0) }]}
            >
              Forgot Password?
            </Text>
          </Pressable>
        </View>
        <PrimaryButton
          title="Sign In"
          onPress={handleSubmit(signIn)}
          disabledWhileAnimating
          animating={isLoading}
        />
        <View
          style={{
            backgroundColor: theme.colors.background,
            position: 'absolute',
            bottom: heightPercentageToDP(2),
          }}
        >
          <Text
            style={[
              [
                styles.text,
                {
                  marginTop: heightPercentageToDP(9),
                  marginVertical: heightPercentageToDP(2),
                  color: theme.colors.text,
                  alignSelf: 'center',
                },
              ],
            ]}
          >
            By logging in you agree to our{' '}
            <Text
              style={[
                styles.text,
                {
                  marginVertical: heightPercentageToDP(2),
                  color: theme.colors.primary,
                  alignSelf: 'center',
                },
              ]}
            >
              Terms of service and privacy policy
            </Text>
          </Text>

          <Text
            style={[
              styles.text,
              {
                marginVertical: heightPercentageToDP(2),
                color: theme.colors.text,
                alignSelf: 'center',
              },
            ]}
          >
            Don't have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Signup')}
              style={[
                styles.text,
                {
                  marginVertical: heightPercentageToDP(2),
                  color: theme.colors.primary,
                  alignSelf: 'center',
                },
              ]}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default Login;

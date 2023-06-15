import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import InputBoxWithIcon from 'app/components/InputBoxWithIcon';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Keyboard, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStyle } from './styles';
import { useDispatch } from 'react-redux';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import signUpUser from 'app/services/signUpUser';
import { onLogin } from 'app/store/slice/userSlice';

const Signup: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { control, handleSubmit, reset, trigger, formState, getValues } =
    useForm();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (data?: any) => {
    Keyboard.dismiss();

    if (!ValidateEmail(data?.email)) {
      dispatch(enableSnackbar('Please input the correct email address.'));
      return;
    }
    if (data?.password != data?.confirmPassword) {
      dispatch(enableSnackbar('Passwords do not match'));
      return;
    }
    try {
      setIsLoading(true);
      const response = await signUpUser(
        data?.name,
        data?.email,
        data?.password,
        data?.phone
      );

      if (response?.status == 200) {
        dispatch(onLogin(response?.data));
      } else {
        dispatch(enableSnackbar('Something went wrong. Please try again.'));
      }
      navigation.navigate('Explore');

      dispatch(enableSnackbar('Successfully signed up.'));
    } catch (err) {
      dispatch(enableSnackbar('Something went wrong. Please try again.'));
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
    >
      <FastImage
        source={images.global.logoMini}
        resizeMode="contain"
        style={styles.logo}
      />

      <Text style={styles.heading}>Sign Up</Text>
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
              placeholder="Name"
              renderIcon={() => (
                <AntDesign
                  name="user"
                  size={widthPercentageToDP(5)}
                  color={theme.colors.lightgrey}
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
              placeholder="Phone"
              keyboardType="dialpad"
              renderIcon={() => (
                <Feather
                  name="phone"
                  size={widthPercentageToDP(5)}
                  color={theme.colors.lightgrey}
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

      <View
        style={[styles.controller, { marginBottom: heightPercentageToDP(2) }]}
      >
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
              placeholder="Confirm Password"
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
          name="confirmPassword"
        />

        {formState.errors.confirmPassword && (
          <Text
            style={[
              styles.error,
              { maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end' },
            ]}
          >
            {t('Confirm Password is required')}
          </Text>
        )}
      </View>
      <PrimaryButton
        title="Sign Up"
        disabledWhileAnimating
        onPress={handleSubmit(signUp)}
        animating={isLoading}
      />

      <View style={[styles.row, { marginTop: heightPercentageToDP(2) }]}>
        <View style={styles.halfDivider} />
        <Text style={styles.text}>or continue with</Text>
        <View style={styles.halfDivider} />
      </View>

      <View style={styles.row}>
        <View style={styles.socialImageContainer}>
          <FastImage
            source={images.socialLogin.google}
            style={styles.socialImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.socialImageContainer}>
          <FastImage
            source={images.socialLogin.apple}
            style={styles.socialImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.socialImageContainer}>
          <FastImage
            source={images.socialLogin.facebook}
            style={styles.socialImage}
            resizeMode="contain"
          />
        </View>
      </View>
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
        Already have an account?{' '}
        <Text
          onPress={() => navigation.navigate('Login')}
          style={[
            styles.text,
            {
              marginVertical: heightPercentageToDP(2),
              color: theme.colors.primary,
              alignSelf: 'center',
            },
          ]}
        >
          Sign In
        </Text>
      </Text>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

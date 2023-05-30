import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStyle } from './styles';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import images from 'app/config/images';
import PrimaryButton from 'app/components/PrimaryButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputBoxWithIcon from 'app/components/InputBoxWithIcon';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Login: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { control, handleSubmit, reset, trigger, formState, getValues } =
    useForm();
  return (
    <>
      <KeyboardAwareScrollView
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
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                numberOfCharacter={0}
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

          {formState.errors.location && (
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
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                numberOfCharacter={0}
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

          {formState.errors.location && (
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
            onPress={(isChecked: boolean) => {}}
          />
          <Text
            style={[styles.text, { marginBottom: heightPercentageToDP(0) }]}
          >
            Forgot Password?
          </Text>
        </View>
        <PrimaryButton title="Sign In" onPress={() => {}} />
      </KeyboardAwareScrollView>
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
    </>
  );
};

export default Login;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useStyle } from './styles';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import images from 'app/config/images';
import PrimaryButton from 'app/components/PrimaryButton';
import InputBoxWithIcon from 'app/components/InputBoxWithIcon';
import { Controller, useForm } from 'react-hook-form';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Signup: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { control, handleSubmit, reset, trigger, formState, getValues } =
    useForm();
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
            required: false,
          }}
          render={({ field: { onChange, value } }) => (
            <InputBoxWithIcon
              onChangeText={onChange}
              numberOfCharacter={0}
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

        {formState.errors.location && (
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

        {formState.errors.location && (
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

      <View
        style={[styles.controller, { marginBottom: heightPercentageToDP(2) }]}
      >
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

        {formState.errors.location && (
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
      <PrimaryButton title="Sign Up" onPress={() => {}} />

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

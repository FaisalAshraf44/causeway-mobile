import { useNavigation, useRoute } from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import NavigationService from 'app/navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import OTPTextInput from 'react-native-otp-textinput';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import { useDispatch } from 'react-redux';
import verifyOtp from 'app/services/verifyOtp';
const OtpPassword: React.FC = () => {
  const navigation = useNavigation<any>();
  const goBack = () => NavigationService.goBack();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useStyle();
  const [email, setEmail] = useState('');
  const { control, handleSubmit, reset, trigger, formState, getValues } =
    useForm();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute<any>();

  useEffect(() => {
    if (otp?.length > 3) {
      verifyOtpForReset();
    }
  }, [otp]);

  const verifyOtpForReset = async () => {
    try {
      setIsLoading(true);
      const response = await verifyOtp(route?.params?.email, otp);
      console.log('res', response?.data);
      if (response?.status == 200) {
        navigation.navigate('ResetPassword', {
          token: response?.data?.resetPasswordToken,
        });
      }
    } catch (err) {
      dispatch(enableSnackbar('OTP is not correct.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FastImage
        source={images.global.logoMini}
        resizeMode="contain"
        style={styles.Img}
      />
      <View style={styles.subcontainer}>
        <Text style={styles.text1}>OTP Verification</Text>
        <Text style={styles.text2}>
          Enter OTP sent to your email for the verification process.
        </Text>
        <OTPTextInput
          containerStyle={styles.containerStyle}
          inputCount={4}
          tintColor={theme.colors.borderColor}
          offTintColor={theme.colors.borderColor}
          ref={(e: any) => console.log(e)}
          textInputStyle={styles.otpTextInput}
          textContentType={'oneTimeCode'}
          keyboardType="numeric"
          handleTextChange={setOtp}
        />
        <PrimaryButton
          style={styles.button}
          title="Verify"
          textStyle={styles.txtstyle}
          animating={isLoading}
          disabledWhileAnimating
          onPress={verifyOtpForReset}
        />
      </View>
      <View style={styles.resendContainer}>
        <Text style={styles.didntreceived}>If you don’t recieve a code!</Text>
        <Text style={styles.resend}>Resend it</Text>
      </View>
    </View>
  );
};

export default OtpPassword;

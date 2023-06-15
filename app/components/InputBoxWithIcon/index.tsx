import images from 'app/config/images';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  I18nManager,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useStyle } from './style';
import { Props } from './types';
import { isTablet } from 'react-native-device-info';
const InputBoxWithIcon: React.FC<Props> = (props) => {
  const styles = useStyle();
  const [isFocused, setIsFocused] = useState(false);
  const [isPaswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const theme = useTheme();
  const { t } = useTranslation();

  const togglePassword = () => {
    setIsPasswordVisible((prev: boolean) => !prev);
  };
  const clear = () => {
    props.onChangeText('');
    setTimeout(() => {
      props?.onBlur ? props?.onBlur() : null;
    }, 1000);
  };

  const ValidateEmail = (email: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }

    return false;
  };

  const ValidatePassword = (email: string) => {
    if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(email)) {
      return true;
    }

    return false;
  };

  const onTextChange = (text: string) => {
    if (!props.disabled) {
      props.onChangeText(text);
      if (props.showError) {
        if (props.error) {
          if (props.type === 'email') {
            if (ValidateEmail(text)) {
              props.error(false);
              setErrorMessage('');
            } else {
              props.error(true);
              setErrorMessage(t('Please enter a valid email address'));
            }
          } else if (props.type === 'password') {
            if (ValidatePassword(text)) {
              props.error(false);
              setErrorMessage('');
            } else {
              props.error(true);
              setErrorMessage(
                t(
                  'Password must contain 6-20 character with at least one numeric digit and one special character'
                )
              );
            }
          } else {
            props.error(false);
            setErrorMessage('');
          }
        }
      }
    }
  };

  return (
    <>
      <View
        style={[
          styles.textView,
          {
            borderColor: theme.colors.borderColor,
            width: props?.width ? props.width : widthPercentageToDP(92),
          },
          props.style,
        ]}
        onLayout={props?.onLayout}
      >
        {props.renderIcon != null ? props.renderIcon() : null}
        {props.disabled ? (
          <Text
            style={[
              styles.input,
              {
                maxWidth: props?.width
                  ? props?.width - widthPercentageToDP(8)
                  : widthPercentageToDP(67),
                includeFontPadding: false,
                color: 'grey',
                textAlign: 'left',
                // marginTop: heightPercentageToDP(0.4),
              },
            ]}
          >
            {props?.value}
          </Text>
        ) : (
          <TextInput
            onChangeText={(val) => {
              const cleanNumber = val.replace(/[^0-9]/g, '');
              onTextChange(
                props?.keyboardType == 'dialpad' ? cleanNumber : val
              );
            }}
            value={props.value}
            multiline={props?.multiline ? true : false}
            style={[
              styles.input,
              {
                color: theme.colors.text,
                width: props?.width
                  ? props?.width - widthPercentageToDP(8)
                  : widthPercentageToDP(67),
                includeFontPadding: false,

                // marginTop: heightPercentageToDP(0.4),
              },
              props?.inputStyle,
            ]}
            placeholderTextColor={theme.colors.lightgrey}
            onFocus={() => {
              if (!props.disabled) setIsFocused(true);
            }}
            maxLength={props?.numberOfCharacter}
            keyboardType={
              props.keyboardType === 'dialpad' ? 'phone-pad' : 'default'
            }
            onBlur={() => {
              setIsFocused(false);
              setTimeout(() => {
                props?.onBlur ? props?.onBlur() : null;
              }, 1000);
            }}
            autoCapitalize="none"
            placeholder={props.placeholder}
            textAlign={I18nManager.isRTL ? 'right' : 'left'}
            autoCorrect={false}
            scrollEnabled
            secureTextEntry={
              props.type == 'password' && !isPaswordVisible ? true : false
            }
          />
        )}
        {props.allowClear && props.value != '' && (
          <TouchableOpacity onPress={clear} style={styles.clear}>
            <Entypo
              name={'circle-with-cross'}
              size={
                isTablet() ? widthPercentageToDP(4) : widthPercentageToDP(6)
              }
            />
          </TouchableOpacity>
        )}
        {props.type === 'password' && (
          <TouchableOpacity onPress={togglePassword} style={styles.eye}>
            <Feather
              name={isPaswordVisible ? 'eye' : 'eye-off'}
              size={
                isTablet() ? widthPercentageToDP(4) : widthPercentageToDP(6)
              }
              color={theme.colors.lightgrey}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage != '' && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </>
  );
};

export default InputBoxWithIcon;

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
import { useTheme } from 'react-native-paper';

const Chooser: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Chooser')}>
        <FastImage
          source={images.global.logo}
          resizeMode="contain"
          style={styles.logo}
        />
      </TouchableOpacity>

      <PrimaryButton
        title="Sign Up"
        onPress={() => navigation.navigate('Signup')}
      />
      <PrimaryButton
        title="Log In"
        onPress={() => navigation.navigate('Login')}
        style={styles.loginButton}
      />
      <View style={styles.row}>
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
      <View
        style={[
          styles.row,
          { marginTop: heightPercentageToDP(3), justifyContent: 'center' },
        ]}
      >
        <FastImage source={images.chooser.google} style={styles.headphone} />
        <Text
          style={[styles.text, { paddingHorizontal: widthPercentageToDP(2) }]}
        >
          Need help with?
        </Text>
        <AntDesign
          name="right"
          size={widthPercentageToDP(3)}
          color={theme.colors.lightgrey}
        />
      </View>
    </View>
  );
};

export default Chooser;

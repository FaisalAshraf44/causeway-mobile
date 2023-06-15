import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import PrimaryButton from 'app/components/PrimaryButton';
import { useStyle } from './styles';
import { useTranslation } from 'react-i18next';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ClickBoxWithIcon from 'app/components/ClickBoxWithIcon';
import FastImage from 'react-native-fast-image';
import images from 'app/config/images';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store/slice';
import { signOut } from 'app/utils/extras';
import { use } from 'i18next';
import { getUserDetails } from 'app/utils/extras';
const Profile: React.FC = () => {
  const styles = useStyle();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const user = useSelector((state: RootState) => state?.user.user);
  const theme = useTheme();
  const userDetails = getUserDetails();

  return (
    <ScrollView style={styles.scroll}>
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          {user ? (
            <View style={styles.rowContainer}>
              <FastImage
                resizeMode="contain"
                source={{
                  uri: 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
                }}
                style={styles.profileImg}
              />
              <View style={styles.paddingHor}>
                <View style={styles.rowContainer}>
                  <View style={styles.widthSpaceContainer}>
                    <Text style={styles.nameText}>{userDetails?.name}</Text>
                    <FastImage
                      resizeMode="contain"
                      source={images.Profile.verify}
                      style={styles.verifyImage}
                    />
                  </View>
                  <TouchableOpacity onPress={signOut}>
                    <FastImage
                      resizeMode="contain"
                      source={images.Profile.logout}
                      style={styles.logoutImage}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
          ) : null}
          <View style={styles.hostContainer}>
            <View>
              <Text style={styles.hostText}>Become A Host</Text>
              <Text style={styles.hostSubText}>
                Earn extra income while your car sits idle
              </Text>
              <Text style={styles.subText}>
                By listing your car on Causeway.
              </Text>
              <PrimaryButton
                style={styles.button}
                title="Subscribe"
                textStyle={styles.font}
                onPress={() =>
                  navigation.navigate('AppStack', { screen: 'Host' })
                }
              />
            </View>
            <FastImage
              resizeMode="stretch"
              source={images.Profile.man}
              style={styles.manImage}
            />
          </View>
          <View style={styles.componentContainer}>
            <ClickBoxWithIcon
              icon={images.Profile.profile}
              title={user ? 'Profile' : 'Sign In/Sign up'}
              onPress={() => {
                if (user)
                  navigation.navigate('AppStack', { screen: 'UserProfile' });
                else navigation.navigate('LoginStack');
              }}
              style={styles.componentStyle}
            />
            {user ? (
              <ClickBoxWithIcon
                icon={images.Profile.profile}
                title="Verify profile"
                onPress={() => {
                  navigation.navigate('AppStack', {
                    screen: 'ProfileVerification',
                  });
                }}
                style={styles.componentStyle}
              />
            ) : null}

            {/* <TouchableOpacity>
              <ClickBoxWithIcon
                icon={images.Profile.setting}
                title="Account Settings"
                onPress={() => {
                  if (user)
                    navigation.navigate('AppStack', {
                      screen: 'AccountSetting',
                    });
                  else navigation.navigate('LoginStack');
                }}
                style={styles.componentStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <ClickBoxWithIcon
                icon={images.Profile.questionMark}
                title="How Causeway Car Rental Work?"
                onPress={() => {}}
                style={styles.componentStyle}
              />
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity style={styles.helpContainer}>
            <FastImage
              resizeMode="contain"
              source={images.Profile.headphone}
              style={styles.profileImg}
            />
            <Text style={styles.helpText}>How can we help you?</Text>
          </TouchableOpacity>
          <View style={styles.privacyContainer}>
            <TouchableOpacity style={styles.rowContainer}>
              <Text style={styles.privacyText}>Terms & Conditions</Text>
              <FastImage
                resizeMode="contain"
                source={images.Payment.next}
                style={styles.nextIcon}
                tintColor={theme.colors.lightgrey}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rowContainer}>
              <Text style={styles.privacyText}>Privacy Policy</Text>
              <FastImage
                resizeMode="contain"
                source={images.Payment.next}
                style={styles.nextIcon}
                tintColor={theme.colors.lightgrey}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.socialIconContainer}>
            <TouchableOpacity>
              <FastImage
                resizeMode="contain"
                source={images.Profile.google}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FastImage
                resizeMode="contain"
                source={images.Profile.facebook}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FastImage
                resizeMode="contain"
                source={images.Profile.instagram}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={() => navigation.navigate('LoginStack')}>
        <Text style={styles.title}>{t('Create user')}</Text>
      </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

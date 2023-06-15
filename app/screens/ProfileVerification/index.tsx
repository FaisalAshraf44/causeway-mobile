import { useNavigation } from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyle } from './styles';
const ProfileVerification: React.FC = () => {
  const styles = useStyle();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.titleText}>Get approved to drive</Text>
        <Text style={styles.titleSubText}>
          Since this is your first trip, you’ll need to provide us with some
          information before you can check out.
        </Text>
        <View style={styles.cardContainer}>
          <View style={styles.cardSubContainer}>
            <View style={styles.rowContainer}>
              <FastImage
                source={images.ProfileVerification.profile}
                style={styles.cardImage}
                resizeMode="contain"
              />
              <View style={styles.horPadding}>
                <Text style={styles.profileText}>Profile Photo</Text>
                <Text style={styles.profileSubText}>
                  Your causeway Car Rental will use to identify you at pickup
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.cardSubContainer}>
            <View style={styles.rowContainer}>
              <FastImage
                source={images.ProfileVerification.call}
                style={styles.cardImage}
                resizeMode="contain"
              />
              <View style={styles.horPadding}>
                <Text style={styles.profileText}>Phone Number</Text>
                <Text style={styles.profileSubText}>
                  We’ll send you a verification code to help secure your
                  account.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.cardSubContainer}>
            <View style={styles.rowContainer}>
              <FastImage
                source={images.ProfileVerification.card}
                style={styles.cardImage}
                resizeMode="contain"
              />
              <View style={styles.horPadding}>
                <Text style={styles.profileText}>
                  Driver’s License & IC / Passport
                </Text>
                <Text style={styles.profileSubText}>
                  You must have a valid driver’s license to book on Causeway Car
                  Rental.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.informativeTextContainer}>
          <Text style={styles.informativeText}>
            Your information is stored securely. Hosts only see your name and
            date of birth after you book a trip. The rest stays private. learn
            from about Causeway Car Rental
            <Text style={styles.policyText}> Privacy Policy</Text>.
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            style={styles.button}
            title="Continue"
            textStyle={styles.txtstyle}
            onPress={() => navigation.navigate('UploadPhoto')}
          />
          <TouchableOpacity
            style={styles.skipContainer}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.skipText}>Skip Verification</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileVerification;

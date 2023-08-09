import { useNavigation } from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyle } from './styles';
const ProfileVerification: React.FC = () => {
  const styles = useStyle();
  const navigation = useNavigation<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleCross = () => {
    navigation.goBack()
  }
  const handleVerifyLater = () => {
    setIsModalVisible(!isModalVisible);
    navigation.goBack()
  }
  const handleVerifyNow = () => {
    setIsModalVisible(!isModalVisible);
    navigation.navigate('UploadPhoto')
  }

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TouchableOpacity
        onPress={handleCross}
        activeOpacity={0.7}
      >
        <FastImage
          source={images.ProfileVerification.cross}
          style={{ height: 28, width: 28, marginTop: 31, marginLeft: 20, }}
          resizeMode="contain"
        />
      </TouchableOpacity>
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
            onPress={toggleModal}
          >
            <Text style={styles.skipText}>Skip Verification</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
              <FastImage
                source={images.ProfileVerification.caution}
                style={styles.cardImage}
                resizeMode="contain"
              />
              <Text style={[styles.modalText, { marginLeft: 6 }]}>
                Profile Verification will be required to proceed the booking.
              </Text>
            </View>
            <Text style={[styles.modalText, { color: '#A7A7A7', fontSize: 11 }]}>
              Are you sure want to skip and verify later?
            </Text>
            <TouchableOpacity onPress={handleVerifyLater} style={styles.modalButton}
              activeOpacity={0.7}>
              <Text style={styles.modalButtonText}>I’ll Verify Later</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleVerifyNow} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}
              activeOpacity={0.7}
            >
              <Text style={{ color: '#A7A7A7' }}>Verify Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileVerification;

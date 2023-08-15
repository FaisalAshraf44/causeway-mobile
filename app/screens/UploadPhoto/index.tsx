import { useNavigation } from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import React, { useLayoutEffect, useState } from 'react';
import { I18nManager, Pressable, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyle } from './styles';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { isTablet } from 'react-native-device-info';
import NavigationService from 'app/navigation/NavigationService';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';


const UploadPhoto: React.FC = () => {
  const styles = useStyle();
  const [isPhotoAdded, setIsPhotoAdded] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | undefined>(
    undefined
  );
  const [isAdded, setIsAdded] = useState(false)
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const theme = useTheme();
  const goBack = () => NavigationService.goBack();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Profile Photo',
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,

      },
      headerLeft: () => {
        return (
          <Pressable
            onPress={goBack}
            style={{ paddingRight: widthPercentageToDP(3) }}
          >
            <AntDesign
              name={I18nManager.isRTL ? 'right' : 'left'}
              color={theme.colors.text}
              size={
                isTablet() ? widthPercentageToDP(4) : widthPercentageToDP(5)
              }
            />
          </Pressable>
        );
      },
      headerShown: true,
      headerTransparent: false,
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
      },
    });
  }, []);

  const handleContinue = async () => {
    try {

      const filename = Date.now().toString();
      const uploadTask = storage().ref(`profilePictures/${filename}`).putFile(selectedImageUri);
      await uploadTask;

      const downloadUrl = await storage().ref(`profilePictures/${filename}`).getDownloadURL();

      navigation.navigate('PhoneVerification', {
        downloadUrl: downloadUrl,
      });

      setShowError(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setShowError(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.guideText}>
          Please provide a clear photo of your face so your hosts can recognize you.
        </Text>
        <View style={styles.columnContainer}>
          <FastImage
            source={selectedImageUri ? { uri: selectedImageUri } : images.UploadPhoto.profile}
            resizeMode="contain"
            style={styles.profileImage}
          />
          {isPhotoAdded ? (
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={async () => {
                try {
                  const result = await launchImageLibrary({
                    mediaType: 'photo',
                    selectionLimit: 1,
                  });

                  if (!result.didCancel && result.assets && result.assets.length > 0) {
                    setSelectedImageUri(result.assets[0].uri);
                  }
                } catch (error) {
                  console.error('Error selecting image:', error);
                }
              }}
            >
              <FastImage
                source={images.UploadPhoto.add}
                resizeMode="contain"
                style={styles.addImage}
              />
              <Text style={styles.addText}>Change Photo</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={async () => {
                try {
                  const result = await launchImageLibrary({
                    mediaType: 'photo',
                    selectionLimit: 1,
                  });

                  if (!result.didCancel && result.assets && result.assets.length > 0) {
                    setSelectedImageUri(result.assets[0].uri);
                    setIsPhotoAdded(true);
                    setShowError(false)
                  }
                } catch (error) {
                  console.error('Error selecting image:', error);
                }
              }}
            >
              <FastImage
                source={images.UploadPhoto.add}
                resizeMode="contain"
                style={styles.addImage}
              />
              <Text style={styles.addText}>Add a Photo</Text>
            </TouchableOpacity>
          )}
        </View>
        {showError && (
          <Text style={styles.error}>Please add a photo before continuing</Text>
        )}
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            style={styles.button}

            title="Continue"
            textStyle={styles.txtstyle}
            onPress={handleContinue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadPhoto;

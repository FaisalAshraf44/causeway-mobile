import { useNavigation } from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import React, { useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyle } from './styles';
const UploadPhoto: React.FC = () => {
  const styles = useStyle();
  const [isAdded, setIsAdded] = useState(false);
  const navigation = useNavigation<any>();
  const theme = useTheme();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Profile Photo',
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerTransparent: false,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.guideText}>
          Please provide clear photo of your face so your hosts can recognize
          you.
        </Text>
        <View style={styles.columnContainer}>
          <FastImage
            source={images.UploadPhoto.profile}
            resizeMode="contain"
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.rowContainer}>
            <FastImage
              source={images.UploadPhoto.add}
              resizeMode="contain"
              style={styles.addImage}
            />
            <Text style={styles.addText}>Add a Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            style={styles.button}
            // disabled={isAdded ? false : true}
            title="Continue"
            textStyle={styles.txtstyle}
            onPress={() => navigation.navigate('PhoneVerification')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadPhoto;

import { useNavigation } from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import React, { useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';
const PhoneNumber: React.FC = () => {
  const styles = useStyle();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Phone Number',
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerTransparent: false,
    });
  }, []);
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const [dropDownValue, setDropDownValue] = useState(null);
  const [isNumberEntered, setIsNumberEntered] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.phoneGuideText}>
          Enter your mobile number and we’ll test you a verification code.
        </Text>
        <Text style={[styles.phoneGuideText, styles.paddingVer]}>
          Country Code
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          containerStyle={styles.containerStyle}
          itemTextStyle={styles.itemTextStyle}
          activeColor={theme.colors.darkgrey}
          valueField="value"
          placeholder="(+60)"
          value={dropDownValue}
          onChange={(item: any) => {
            setDropDownValue(item.value);
          }}
          renderLeftIcon={() => (
            <View style={styles.rowDirection}>
              <FastImage
                source={images.UploadPhoto.flag}
                resizeMode="contain"
                style={styles.addImage}
              />
              <FastImage
                source={images.UploadPhoto.down}
                resizeMode="contain"
                style={styles.arrowImage}
              />
            </View>
          )}
          renderRightIcon={() => undefined}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Mobile Number"
          placeholderTextColor={theme.colors.lightgrey}
        />
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            style={styles.button}
            // disabled={isNumberEntered ? false : true}
            title="Continue"
            textStyle={styles.txtstyle}
            onPress={() => navigation.navigate('LicenseVerification')}
          />
        </View>
      </View>
    </View>
  );
};

export default PhoneNumber;

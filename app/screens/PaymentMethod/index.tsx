import { useNavigation } from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import NavigationService from 'app/navigation/NavigationService';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useStyle } from './styles';
import FastImage from 'react-native-fast-image';
import images from 'app/config/images';
const PaymentMethod: React.FC = () => {
  const [prices, setPrices] = useState({
    childSeat: '+20 Rm/Day',
    stroller: '+20 Rm/Day,',
  });
  const [selection, setSelection] = useState<number>(0);
  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Payment Details',
      headerShown: true,
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
      },
      headerTransparent: false,
    });
  }, []);

  const goBack = () => NavigationService.goBack();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useStyle();

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.optionSubContainer}>
          <Pressable style={styles.outerRadio} onPress={() => setSelection(1)}>
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection == 1 ? theme.colors.lightgrey : undefined,
                  borderRadius: selection == 1 ? widthPercentageToDP(10) : 0,
                },
              ]}
            ></View>
          </Pressable>
          <FastImage
            source={images.PaymentDetails.masterCard}
            resizeMode="contain"
            style={styles.paymentImg}
          />
        </View>
        <View style={styles.optionSubContainer}>
          <Pressable style={styles.outerRadio} onPress={() => setSelection(2)}>
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection == 2 ? theme.colors.lightgrey : undefined,
                  borderRadius: selection == 2 ? widthPercentageToDP(10) : 0,
                },
              ]}
            ></View>
          </Pressable>

          <FastImage
            source={images.PaymentDetails.visaCard}
            resizeMode="contain"
            style={styles.paymentImg}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            style={styles.button}
            disabled={selection != 0 ? false : true}
            title="Continue"
            textStyle={styles.txtstyle}
            onPress={() => navigation.navigate('PaymentDetails')}
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentMethod;

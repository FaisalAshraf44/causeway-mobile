import { useNavigation } from '@react-navigation/native';
import ConfirmationCard from 'app/components/ConfirmationCard';
import PrimaryButton from 'app/components/PrimaryButton';
import NavigationService from 'app/navigation/NavigationService';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const Confirmed: React.FC = () => {
  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Confirmed',
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
        <Text style={styles.confirmationText}>Your Booking is confirmed</Text>
        <View style={styles.cardContainer}>
          <ConfirmationCard
            carName="Audi A6"
            carModel="HSW 4736 SK"
            type="Automatic Transmission"
            startDate="Mon, 12 Jan, 10:00 am"
            endDate="Tue, 13 Jan, 11:00 am"
            totalFair="RM160/day"
            width={widthPercentageToDP(68)}
          />
        </View>
        <View style={styles.temp}>
          <View style={styles.bottomSubContainer}>
            <Text style={styles.confirmationText}>Congratulations, ABCD!</Text>
            <Text style={styles.bottomText}>
              You're all set ! we look forward to providing you with a great
              rental experience.
            </Text>
          </View>
          <PrimaryButton
            style={[styles.button]}
            title="My Bookings"
            textStyle={styles.txtstyle}
            onPress={() => {
              navigation.navigate('Bookings');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Confirmed;

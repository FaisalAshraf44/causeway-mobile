import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';

const AccountSetting: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Account Settings',
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
        // paddingLeft: widthPercentageToDP(4),
      },

      headerTransparent: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.loginText}>Login Settings</Text>
          <View>
            <Text style={styles.titleText}>Email</Text>
            <Text style={styles.titleSubText}>Andrewtait333@gmail.come</Text>
            <View style={styles.lineOuterView}>
              <View style={styles.lineInnerView}></View>
            </View>
          </View>
          <View>
            <Text style={styles.titleText}>Password</Text>
            <View style={styles.lineOuterView}>
              <View style={styles.lineInnerView}></View>
            </View>
          </View>
          <View>
            <Text style={styles.titleText}>Google</Text>
            <Text style={styles.titleSubText}>Andrewtait333@gmail.come</Text>
            <View style={styles.lineOuterView}>
              <View style={styles.lineInnerView}></View>
            </View>
          </View>
          <View>
            <Text style={styles.titleText}>Facebook</Text>
            <Text style={styles.titleSubText}>Not Connected</Text>
            <View style={styles.lineOuterView}>
              <View style={styles.lineInnerView}></View>
            </View>
          </View>
          <View>
            <Text style={styles.titleText}>Mobile Phone</Text>
            <View style={styles.lineOuterView}>
              <View style={styles.lineInnerView}></View>
            </View>
          </View>
        </View>
        <Text style={styles.loginText}>Notification Settings</Text>
        <View style={styles.paddingVer}>
          <Text style={styles.notificationsubText}>Notification manager</Text>
          <Text style={styles.titleSubText}>Set notification here</Text>
          <View style={styles.lineOuterView}>
            <View style={styles.lineInnerView}></View>
          </View>
        </View>

        <Text style={styles.titleText}>Approval status</Text>
        <View style={styles.lineOuterView}>
          <View style={styles.lineInnerView}></View>
        </View>
        <View>
          <Text style={styles.titleText}>Close my account</Text>
        </View>
      </View>
    </View>
  );
};

export default AccountSetting;

import React, { useEffect } from 'react';
import { View, TouchableOpacity, I18nManager } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Title, Text, List, RadioButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ThemeController from '../../components/ThemeController';
import { useDispatch, useSelector } from 'react-redux';
import RNRestart from 'react-native-restart';
import * as loginActions from 'app/store/slice/userSlice';
import { useStyle } from './styles';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootState } from 'app/store/slice';
import { signOut } from 'app/utils/extras';
// import i18n from "../../components/Languages/i18n";
const Drawer: React.FC = (props) => {
  const [checked, setChecked] = React.useState('first');
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());
  const theme = useTheme();
  const styles = useStyle();
  const navigation = useNavigation<any>();
  const user = useSelector((state: RootState) => state?.user.user);

  useEffect(() => {
    if (i18n.language === 'en') setChecked('first');
    else if (i18n.language === 'es') setChecked('second');
    else if (i18n.language === 'de') setChecked('third');
  }, []);
  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
            }}
            size={50}
          />
          <Title style={styles.title}>
            {user?.name ? user?.name : 'Guest'}
          </Title>
          <View style={styles.row} />
        </View>

        {user ? (
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={theme.colors.text}
                size={size}
              />
            )}
            label={t('Profile')}
            activeTintColor="#2196f3"
            activeBackgroundColor="rgba(0, 0, 0, .04)"
            inactiveTintColor="rgba(0, 0, 0, .87)"
            inactiveBackgroundColor="transparent"
            labelStyle={{ color: theme.colors.text }}
            onPress={() => {
              navigation.navigate('AppStack', { screen: 'UserProfile' });
            }}
          />
        ) : null}

        {user ? (
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="logout"
                color={theme.colors.text}
                size={size}
              />
            )}
            onPress={() => {
              signOut();
            }}
            label={t('Log out')}
            activeTintColor="#2196f3"
            activeBackgroundColor="rgba(0, 0, 0, .04)"
            inactiveTintColor="rgba(0, 0, 0, .87)"
            inactiveBackgroundColor="transparent"
            labelStyle={{ color: theme.colors.text }}
          />
        ) : (
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="login"
                color={theme.colors.text}
                size={size}
              />
            )}
            onPress={() => {
              navigation.navigate('LoginStack');
            }}
            label={t('Log in')}
            activeTintColor="#2196f3"
            activeBackgroundColor="rgba(0, 0, 0, .04)"
            inactiveTintColor="rgba(0, 0, 0, .87)"
            inactiveBackgroundColor="transparent"
            labelStyle={{ color: theme.colors.text }}
          />
        )}
      </DrawerContentScrollView>
    </View>
  );
};

export default Drawer;

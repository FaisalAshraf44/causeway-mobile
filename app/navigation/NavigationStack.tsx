import { createDrawerNavigator } from '@react-navigation/drawer';
import ResetPassword from 'app/screens/ResetPassword';
import Choose from 'app/screens/Choose';
import Payment from 'app/screens/Checkout';
import Confirmed from 'app/screens/Confirmed';
import OtpPassword from 'app/screens/OtpPassword';
import ValueAdd from 'app/screens/ValueAdd';
import InsurancePackage from 'app/screens/InsurancePackage';
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import AccountSetting from 'app/screens/AccountSetting';
import UserProfile from 'app/screens/UserProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import images from 'app/config/images';
import CarDetail from 'app/screens/CarDetail';
import ForgotPassword from 'app/screens/ForgotPassword';
import CarListing from 'app/screens/CarListing';
import Onboard from 'app/screens/Onboard';
import Search from 'app/screens/Search';
import { RootState } from 'app/store/slice/';
import { disableSnackbar } from 'app/store/slice/snackbarSlice';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, Pressable, StatusBar } from 'react-native';
import { isTablet } from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Snackbar, useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import BottomTabNavigation from './BottomTabNavigation';
import Drawer from './Drawer';
import { navigationRef } from './NavigationService';
import Chooser from 'app/screens/Chooser';
import Login from 'app/screens/Login';
import SignIn from 'app/screens/Signup';
import Signup from 'app/screens/Signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Map from 'app/screens/Map';
import Promo from 'app/screens/Promo';
import BookingDetail from 'app/screens/BookingDetail';
import Profile from 'app/screens/Profile';
import Notification from 'app/screens/Notification';
import ProfileVerification from 'app/screens/ProfileVerification';
import UploadPhoto from 'app/screens/UploadPhoto';
import PhoneNumber from 'app/screens/PhoneNumber';
import LicenseVerification from 'app/screens/LicenseVerification';
import BlogDescription from 'app/screens/Blog';
import Blog from 'app/screens/Blog';
import Checkout from 'app/screens/Checkout';
import PaymentMethod from 'app/screens/PaymentMethod';
import PaymentDetails from 'app/screens/PaymentDetails';
import Message from 'app/screens/Message';
import FilteredSearch from 'app/screens/FilteredSearch';
import Host from 'app/screens/Host';
import HostDetails from 'app/screens/HostDetails';
import HostFeatureAddition from 'app/screens/HostFeatureAddition';
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppDrawer = createDrawerNavigator();
const OuterStack = createNativeStackNavigator();

const OnboardNavigator = () => {
  const theme = useTheme();

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Onboard'} component={Onboard} />
    </AuthStack.Navigator>
  );
};

const DrawerNavigator = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const user = useSelector((state: RootState) => state?.user.user);
  const bottomTabOptions = {
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <FastImage
            source={images.drawer.drawer}
            style={{
              width: widthPercentageToDP(12),
              height: heightPercentageToDP(3),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      );
    },
    headerRight: () => {
      return (
        <>
          {user ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AppStack', { screen: 'Notification' })
              }
            >
              <FastImage
                source={images.drawer.notification}
                style={{
                  width: widthPercentageToDP(12),
                  height: heightPercentageToDP(3),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : null}
        </>
      );
    },
    headerTransparent: true,
    headerTitle: '',
    headerStyle: {
      backgroundColor: theme.colors.background, //Set Header color
    },
  };

  const goBack = () => {
    navigation.goBack();
  };

  const defaultOptions: any = {
    headerBackTitle: '',
    headerLeft: () => (
      <Pressable
        onPress={goBack}
        style={{ paddingLeft: widthPercentageToDP(3) }}
      >
        <AntDesign
          name={I18nManager.isRTL ? 'right' : 'left'}
          color={'white'}
          size={isTablet() ? widthPercentageToDP(4) : widthPercentageToDP(4.5)}
        />
      </Pressable>
    ),
    headerShown: true,
    headerTitleAlign: 'left',
    headerTitle: t(''),
    headerTransparent: true,
    headerTitleStyle: {
      color: theme.colors.text,
      fontFamily: theme.fonts.regularFont,
    },
  };
  const noHeader: any = {
    headerShown: false,
  };

  return (
    <AppDrawer.Navigator drawerContent={() => <Drawer />}>
      <AppDrawer.Screen
        name={t('Home')}
        component={BottomTabNavigation}
        options={bottomTabOptions}
      />
      <AppDrawer.Screen
        name={'CarListing'}
        component={CarListing}
        options={defaultOptions}
      />

      <AppDrawer.Screen
        name={'Search'}
        component={Search}
        options={defaultOptions}
      />
      <AppDrawer.Screen
        name={'LoginStack'}
        component={LoginStackNavigator}
        options={defaultOptions}
      />
      <AppDrawer.Screen
        name={'AppStack'}
        component={AppNavigator}
        options={{ ...defaultOptions, headerShown: false }}
      />
    </AppDrawer.Navigator>
  );
};

const AppNavigator = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  return (
    <OuterStack.Navigator
      initialRouteName="Promo"
      screenOptions={{
        headerShown: true,
        animation: 'fade_from_bottom',

        headerLeft: () => (
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
        ),
      }}
    >
      <Stack.Screen
        name={'Choose'}
        component={Choose}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'CarDetail'} component={CarDetail} />
      <Stack.Screen
        name={'InsurancePackage'}
        component={InsurancePackage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'FilteredSearch'} component={FilteredSearch} />
      <Stack.Screen name={'Checkout'} component={Checkout} />
      <Stack.Screen name={'Map'} component={Map} />
      <Stack.Screen
        name={'Host'}
        component={Host}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'HostDetails'} component={HostDetails} />
      <Stack.Screen
        name={'HostFeatureAddition'}
        component={HostFeatureAddition}
      />
      <Stack.Screen name={'ValueAdd'} component={ValueAdd} />
      <Stack.Screen name={'Promo'} component={Promo} />
      <Stack.Screen name={'Message'} component={Message} />
      <Stack.Screen name={'Confirmed'} component={Confirmed} />
      <Stack.Screen name={'BookingDetail'} component={BookingDetail} />
      <Stack.Screen name={'UserProfile'} component={UserProfile} />
      <Stack.Screen name={'AccountSetting'} component={AccountSetting} />
      <Stack.Screen name={'Notification'} component={Notification} />
      <Stack.Screen name={'PaymentMethod'} component={PaymentMethod} />
      <Stack.Screen name={'PaymentDetails'} component={PaymentDetails} />
      <Stack.Screen
        name={'ProfileVerification'}
        component={ProfileVerification}
      />
      <Stack.Screen name={'UploadPhoto'} component={UploadPhoto} />
      <Stack.Screen name={'PhoneVerification'} component={PhoneNumber} />
      <Stack.Screen
        name={'LicenseVerification'}
        component={LicenseVerification}
      />
      <Stack.Screen name={'Blog'} component={Blog} />
      <Stack.Screen
        name={'SignIn'}
        component={Login}
        options={{ headerShown: false }}
      />
    </OuterStack.Navigator>
  );
};

const LoginStackNavigator = () => {
  return (
    <OuterStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen name={'Chooser'} component={Chooser} />
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'Signup'} component={Signup} />
      <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
      <Stack.Screen name={'ResetPassword'} component={ResetPassword} />
      <Stack.Screen name={'OtpPassword'} component={OtpPassword} />
    </OuterStack.Navigator>
  );
};
const App: React.FC = () => {
  const theme = useTheme();
  const firstRun = useSelector((state: RootState) => state.user.firstRun);
  const message = useSelector(
    (state: RootState) => state.snackbar.snackbarMessage
  );
  const isVisible = useSelector(
    (state: RootState) => state.snackbar.snackbarVisible
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(disableSnackbar());
    }, 3000);
  }, [isVisible, dispatch]);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={'black'} />
      {!firstRun ? <DrawerNavigator /> : <OnboardNavigator />}
      <Snackbar
        visible={isVisible}
        onDismiss={() => {}}
        style={{ zIndex: 5000 }}
      >
        {message}
      </Snackbar>
    </NavigationContainer>
  );
};

export default App;

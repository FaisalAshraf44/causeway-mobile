import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootState } from 'app/store/slice/';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, Pressable, StatusBar } from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import BottomTabNavigation from './BottomTabNavigation';
import { navigationRef } from './NavigationService';
import Onboard from 'app/screens/Onboard';
import Drawer from './Drawer';
import FastImage from 'react-native-fast-image';
import images from 'app/config/images';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { disableSnackbar } from 'app/store/slice/snackbarSlice';
import { useEffect } from 'react';
import CarListing from 'app/screens/CarListing';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { isTablet } from 'react-native-device-info';
import CarDetails from 'app/screens/CarDetail';
import CarDetail from 'app/screens/CarDetail';
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppDrawer = createDrawerNavigator();

const OnboardNavigator = () => {
  const theme = useTheme();

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Onboard'} component={Onboard} />
    </AuthStack.Navigator>
  );
};

const AppNavigator = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
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
        <TouchableOpacity>
          <FastImage
            source={images.drawer.notification}
            style={{
              width: widthPercentageToDP(12),
              height: heightPercentageToDP(3),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
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
        name={'CarDetail'}
        component={CarDetail}
        options={defaultOptions}
      />
    </AppDrawer.Navigator>
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
      {!firstRun ? <AppNavigator /> : <OnboardNavigator />}
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

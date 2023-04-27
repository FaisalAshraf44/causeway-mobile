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
import { StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
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

  return (
    <AppDrawer.Navigator drawerContent={() => <Drawer />}>
      <AppDrawer.Screen
        name={t('Home')}
        component={BottomTabNavigation}
        options={bottomTabOptions}
      />
    </AppDrawer.Navigator>
  );
};
const App: React.FC = () => {
  const firstRun = useSelector((state: RootState) => state.user.firstRun);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={'red'} />
      {!firstRun ? <AppNavigator /> : <OnboardNavigator />}
    </NavigationContainer>
  );
};

export default App;

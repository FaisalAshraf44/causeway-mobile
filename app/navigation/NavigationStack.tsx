import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
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

  return (
    <AppDrawer.Navigator drawerContent={() => <Drawer />}>
      <AppDrawer.Screen
        name={t('Home')}
        component={BottomTabNavigation}
        options={{
          drawerLabel: 'Gsoft Boiler Plate',
          headerStyle: {
            backgroundColor: theme.colors.accent, //Set Header color
          },
          headerTintColor: theme.colors.primary, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </AppDrawer.Navigator>
  );
};
const App: React.FC = () => {
  const firstRun = useSelector((state: RootState) => state.user.firstRun);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar />

      {!firstRun ? <AppNavigator /> : <OnboardNavigator />}
    </NavigationContainer>
  );
};

export default App;

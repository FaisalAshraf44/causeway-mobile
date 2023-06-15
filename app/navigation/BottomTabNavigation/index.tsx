import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import images from 'app/config/images';
import Bookings from 'app/screens/Bookings';
import Favourites from 'app/screens/Favourites';
import Inbox from 'app/screens/Inbox';
import Profile from 'app/screens/Profile';
import * as React from 'react';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import Explore from '../../screens/Explore';
import { useStyle } from './styles';
const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const theme = useTheme();
  const style = useStyle();
  const screenOptions = {
    tabBarIconStyle: style.tabbarIcon,
    tabBarActiveTintColor: theme.colors.primary,
    tabBarStyle: style.tabbar,
    tabBarLabelStyle: style.tabbarLabel,
    tabBarInactiveTintColor: theme.colors.inactive,
  };
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          headerShown: false,
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <FastImage
              source={images.bottomBar.search}
              tintColor={color}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          headerShown: false,
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color, size }) => (
            <FastImage
              source={images.bottomBar.heart}
              tintColor={color}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={Bookings}
        options={{
          headerShown: false,
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ color, size }) => (
            <FastImage
              source={images.bottomBar.calender}
              tintColor={color}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          headerShown: false,
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => (
            <FastImage
              source={images.bottomBar.message}
              tintColor={color}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FastImage
              source={images.bottomBar.profile}
              tintColor={color}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigation;

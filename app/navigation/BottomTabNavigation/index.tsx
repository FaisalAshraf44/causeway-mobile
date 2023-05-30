import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import images from 'app/config/images';
import * as React from 'react';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import Explore from '../../screens/Explore';
import { useStyle } from './styles';
import { BlurView } from '@react-native-community/blur';
import { View } from 'react-native';
import Profile from 'app/screens/Profile';
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

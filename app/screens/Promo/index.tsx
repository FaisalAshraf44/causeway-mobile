import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import getPromo from 'app/services/getPromo';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { I18nManager, Pressable } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import MyPromos from './MyPromos';
import Redeemable from './Redeemable';
import { useStyle } from './styles';
const Promo: React.FC = () => {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const goBack = () => navigation.goBack();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Promos',
      headerShown: true,
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerLeft: () => {
        return (
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
        );
      },
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
      },
      headerTransparent: false,
    });
  }, []);

  const theme = useTheme();
  const styles = useStyle();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery != '') {
      const filter = data?.filter((item: any) => {
        return (
          item?.promoText.includes(searchQuery) ||
          item?.heading.includes(searchQuery) ||
          item?.description.includes(searchQuery)
        );
      });
      setFiltered(filter);
    } else {
      setFiltered([]);
    }
  }, [searchQuery]);

  const getPromoData = async () => {
    try {
      setIsLoading(true);
      const response = await getPromo();

      if (response?.status == 201) {
        setData(response?.data?.results);
      }
    } catch (err: any) {
      if (err?.response?.status == 401) {
        dispatch(enableSnackbar('Please sign in to continue'));
        navigation.navigate('SignIn');
      } else {
        dispatch(enableSnackbar('Something went wrong'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let subscribed = true;
    if (subscribed && isFocused) {
      getPromoData();
    }
    return () => {
      subscribed = false;
    };
  }, [isFocused]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIndicatorStyle: styles.tabbarIndicator,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.lightgrey,
      }}
    >
      <Tab.Screen name="My Promos" component={MyPromos} />
      <Tab.Screen name="Redeemable Promos" component={Redeemable} />
    </Tab.Navigator>
  );
};

export default React.memo(Promo);

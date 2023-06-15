import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import ConfirmationCard from 'app/components/ConfirmationCard';
import images from 'app/config/images';
import getBookings from 'app/services/getBookings';
import { RootState } from 'app/store/slice';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useStyle } from './styles';
import PromoCardPlaceholder from 'app/components/PromoCard/Placeholder';
import moment from 'moment';

const Bookings: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const Tab = createMaterialTopTabNavigator();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const user = useSelector((state: RootState) => state?.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getBookingsData = async () => {
    try {
      setIsLoading(true);
      const response = await getBookings();

      if (response?.status == 201) {
        setData(response?.data?.results);
      }
    } catch (err: any) {
      if (err?.response?.status == 401) {
        dispatch(enableSnackbar('Please sign in to continue'));
        navigation.navigate('SignIn');
      } else {
        console.log('err', err);
        dispatch(enableSnackbar('Something went wrong'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const subscribed = true;
    if (!user) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('Explore');
      }
      setTimeout(() => {
        navigation.navigate('LoginStack', {
          screen: 'Login',
          params: { fromBooking: true },
        });
      }, 200);
    } else {
      if (subscribed) {
        getBookingsData();
      }
    }
  }, [isFocused]);

  const renderCards = ({ item }: any) => {
    return (
      <Pressable
        style={styles.cardContainer}
        onPress={() =>
          navigation.navigate('AppStack', {
            screen: 'BookingDetail',
            params: item,
          })
        }
      >
        <ConfirmationCard
          carName={item?.car?.make + ' ' + item?.car?.model}
          carModel={item?.bookingId}
          type="Automatic Transmission"
          startDate={moment(item?.bookingStartDateTime).format(
            'ddd, DD MMM, hh:mm a'
          )}
          features={item?.car?.features}
          endDate={moment(item?.bookingEndDateTime).format(
            'ddd, DD MMM, hh:mm a'
          )}
          totalFair={`RM${item?.car?.rentPerDay}/day`}
          width={widthPercentageToDP(67)}
        />
      </Pressable>
    );
  };

  const renderEmptyComponent = useCallback(() => {
    return (
      <View>
        <Lottie source={images.global.noData} style={styles.empty} autoPlay />
        <Text
          style={[
            styles.subheader,
            { color: theme.colors.text, textAlign: 'center' },
          ]}
        >
          No Bookings available
        </Text>
      </View>
    );
  }, []);

  const Active = () => {
    return (
      <View style={styles.container}>
        {isLoading ? (
          <PromoCardPlaceholder />
        ) : (
          <FlatList
            data={data?.filter((item: any) => {
              return item?.bookingStatus != 'Completed';
            })}
            renderItem={renderCards}
            contentContainerStyle={styles.containerFlatlist}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </View>
    );
  };

  const Completed = () => {
    return (
      <View style={styles.container}>
        {isLoading ? (
          <PromoCardPlaceholder />
        ) : (
          <FlatList
            data={data?.filter((item: any) => {
              return item?.bookingStatus == 'Completed';
            })}
            renderItem={renderCards}
            contentContainerStyle={styles.containerFlatlist}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.parent}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIndicatorStyle: styles.tabbarIndicator,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.lightgrey,
        }}
      >
        <Tab.Screen name="Active" component={Active} />
        <Tab.Screen name="Completed" component={Completed} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Bookings;

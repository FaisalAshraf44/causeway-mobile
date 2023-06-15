import { useIsFocused, useNavigation } from '@react-navigation/native';
import images from 'app/config/images';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  I18nManager,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { isTablet } from 'react-native-device-info';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import { useDispatch } from 'react-redux';
import getNotification from 'app/services/getNotification';
import Placeholder from './Placeholder';
const Notification: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const [isEmpty, setIsEmpty] = useState(false);
  const isFocused = useIsFocused();
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Notifications',
      headerShown: true,
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerLeft: () => {
        return (
          <Pressable
            onPress={() => navigation.goBack()}
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
        marginLeft: widthPercentageToDP(5),
      },

      headerTransparent: true,
    });
  }, []);

  const getNotificationData = async () => {
    try {
      const response = await getNotification({});

      if (response?.status == 201) {
        setData(response?.data?.results);
      }
    } catch (err: any) {
      if (err?.response?.status == 401) {
        dispatch(enableSnackbar('Please sign in to continue'));
      } else {
        dispatch(enableSnackbar('Something went wrong'));
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    let subscribed = true;
    if (subscribed && isFocused) getNotificationData();

    return () => {
      subscribed = false;
    };
  }, [isFocused]);

  const clear = () => {
    if (data?.length < 1) return null;
    return (
      <>
        <View style={styles.padding}>
          <TouchableOpacity style={styles.button} onPress={() => setData([])}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.subView}>
        <FastImage
          resizeMode="stretch"
          style={styles.profileImg}
          source={images.notification.notification}
        />
        <Text style={styles.nameText}>No Notification Yet</Text>
        <Text style={styles.subText}>
          Stay in the loop with our Notifications
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.rowContainer}>
      <Text style={styles.notificationText}>{item.notification}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );

  if (isLoading) return <Placeholder />;
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.subContainer}>
        <FlatList
          data={data}
          contentContainerStyle={{ flex: data?.length < 1 ? 1 : undefined }}
          ListFooterComponent={clear}
          ListEmptyComponent={renderEmptyComponent}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;

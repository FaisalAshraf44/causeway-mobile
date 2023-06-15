import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import images from 'app/config/images';
import getMessages from 'app/services/getMessages';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import { getInitials } from 'app/utils/stringUtils';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { useStyle } from './styles';
import Placeholder from './Placeholder';

const Inbox: React.FC = () => {
  const route = useRoute<any>();
  const styles = useStyle();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const getMessagesData = async () => {
    try {
      setIsLoading(true);
      const response = await getMessages();

      if (response?.status == 200) {
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
      getMessagesData();
    }
    return () => {
      subscribed = false;
    };
  }, [isFocused]);

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
          Your inbox is empty.
        </Text>
      </View>
    );
  }, []);

  const renderChat = ({ item }: any) => {
    return (
      <Pressable
        style={styles.containerBox}
        onPress={() => navigation.navigate('AppStack', { screen: 'Message' })}
      >
        <Avatar.Text
          label={getInitials(item?.users[0]?.name)}
          color={theme.colors.text}
          style={styles.avatar}
          size={widthPercentageToDP(10)}
          labelStyle={styles.avatarText}
        />
        <View style={styles.subContainer}>
          <Text style={styles.name}>{item?.users[0]?.name}</Text>
          <Text style={styles.content}>{item?.lastMessage?.content}</Text>
        </View>
        <Text style={styles.date}>
          {moment(item?.lastMessage?.createdAt).format('DD/MM/YYYY')}
        </Text>
      </Pressable>
    );
  };

  if (isLoading) return <Placeholder />;
  else
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderChat}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    );
};

export default React.memo(Inbox);

import { useNavigation, useRoute } from '@react-navigation/native';
import { RootState } from 'app/store/slice';
import { keyExtractor } from 'app/utils/stringUtils';
import useKeyboard from 'app/utils/useKeyboard';
import moment from 'moment';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useStyle } from './styles';

const Message: React.FC = () => {
  const route = useRoute<any>();
  const styles = useStyle();
  const navigation = useNavigation<any>();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const { isKeyboardVisible, keyboardHeight } = useKeyboard();
  const { t } = useTranslation();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([
    {
      _id: 1,
      text: 'Hi',
      createdAt: new Date(),
      // status: message?.messageStatus,
      messageType: 1,
      user: {
        _id: 1,
        name: 'Hannad Ahmad',
        avatar: '',
      },
    },
    {
      _id: 2,
      text: 'How are you',
      createdAt: new Date(),
      // status: message?.messageStatus,
      messageType: 2,
      user: {
        _id: 1,
        name: 'Hannad Ahmad',
        avatar: '',
      },
    },
    {
      _id: 3,
      text: "I'm good thanks",
      createdAt: new Date(),
      // status: message?.messageStatus,
      messageType: 2,
      user: {
        _id: 1,
        name: 'Haris',
        avatar: '',
      },
    },
  ]);
  const [length, setLength] = useState(0);
  const [message, setMessage] = useState('');
  const [count, setCount] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const ref = useRef<any>();
  // const sendMessageAPI = async (messageBody: any, id: string) => {
  //   try {
  //     const response = await sendMessage({
  //       whatsappContactsId: route?.params?.id,
  //       body: messageBody,
  //       messageBodyType: 0,
  //       messageType: 2,
  //       messageStatus: 7,
  //     });
  //     if (response?.status == 200) {
  //       if (response?.data?.successed) {
  //       }
  //     }
  //   } catch {
  //   } finally {
  //     const tempArr = count.filter((item) => {
  //       return item != id;
  //     });
  //     setCount(tempArr);
  //   }
  // };

  useEffect(() => {
    let subscribed = true;
    if (count.length < 1 && subscribed) {
      setTimeout(async () => {
        // fetchMessages(false);
        setIsLoading(false);
      }, 2000);
    }
    return () => {
      subscribed = false;
    };
  }, [count]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'center',
      headerTitle: route?.params?.title,
      headerTransparent: true,
    });
  }, [isLoading]);

  const createData = (data: any, allRecord?: boolean) => {
    setLength(data?.length);
    if (data?.length > 0) {
      const slicedArr = data?.slice(allRecord ? -5000000 : -50);
      const tempArr = slicedArr?.map((message: any) => {
        return {
          _id: message?.id,
          text: message?.body,
          createdAt: new Date(message?.createdOn),
          // status: message?.messageStatus,
          messageType: message?.messageType,
          user: {
            _id: message?.messageType == 1 ? message?.id : 0,
            name: message?.userName,
            avatar: message?.userImage,
          },
        };
      });
      if (tempArr?.length > 0) {
        setData(tempArr);
      }
    }
  };

  // const fetchMessages = useCallback(async (allRecord?: boolean) => {
  //   try {
  //     // setIsLoading(true);
  //     const response = await getMessages(route?.params?.id);
  //     if (response?.status == 200) {
  //       if (response?.data?.successed) {
  //         //success
  //         createData(response?.data?.data, allRecord);
  //       } else {
  //         //fail
  //         dispatch(enableSnackbar(t('Unable to load orders')));
  //       }
  //     } else {
  //       //fail
  //       dispatch(enableSnackbar(t('Unable to load orders')));
  //     }
  //   } catch {
  //     //fail
  //     dispatch(enableSnackbar(t('Unable to load orders')));
  //   } finally {
  //     setIsLoading(false);
  //     setRefreshing(false);
  //   }
  // }, []);

  const onSend = (message: any) => {
    setMessage('');
    const body = {
      _id: `${keyExtractor()}`,
      createdAt: new Date(),
      text: message,
      status: 4,
      user: { _id: 0, name: null, avatar: null },
    };
    const tempArr: any = [];
    tempArr.push(body);
    const dataClone: any = [...data];
    dataClone.push(body);
    setData(dataClone);
    const axiosArr: any = [...count];
    axiosArr.push(body?._id);
    setCount(tempArr);
    // sendMessageAPI(message, body?._id);
  };

  const renderToolbar = () => {
    const bottom = isKeyboardVisible
      ? heightPercentageToDP(1)
      : heightPercentageToDP(2);
    return (
      <View
        style={[
          styles.messageContainer,
          {
            bottom: Platform.OS == 'android' ? bottom : undefined,
            position: Platform.OS == 'android' ? 'absolute' : 'relative',
            alignSelf: Platform.OS == 'ios' ? 'center' : undefined,
            width: Platform?.OS == 'ios' ? widthPercentageToDP(95) : undefined,
          },
        ]}
      >
        <TextInput
          onChangeText={setMessage}
          placeholder={t('Write Message')}
          value={message}
          placeholderTextColor={'rgba(255, 255, 255, 0.4)'}
          style={styles.font}
        />
        <TouchableOpacity
          onPress={() => (message != '' ? onSend(message) : () => {})}
        >
          <Text style={styles.send}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCustomView = (mess: any) => {
    return (
      <Text
        style={{
          fontSize: widthPercentageToDP(3),
          color: mess?.currentMessage?.messageType == 1 ? 'grey' : 'white',
          paddingHorizontal: widthPercentageToDP(2.5),
          alignSelf:
            mess?.currentMessage?.messageType == 1 ? 'flex-start' : 'flex-end',
          paddingVertical: heightPercentageToDP(0.5),
        }}
      >
        {/* {messageStatus(mess?.currentMessage?.status)} */}
      </Text>
    );
  };

  const renderTime = useCallback((time) => {
    return (
      <View>
        <Text
          style={{
            fontSize: widthPercentageToDP(3),
            color: 'white',
            paddingHorizontal: widthPercentageToDP(2.5),
            alignSelf:
              time?.currentMessage?.messageType == 1
                ? 'flex-start'
                : 'flex-end',
          }}
        >
          {time?.currentMessage?.status == 4
            ? ' '
            : moment(time?.currentMessage?.createdAt).format('hh:mm a')}
        </Text>
        {renderCustomView(time)}
      </View>
    );
  }, []);

  const renderBubble = (props: any) => {
    return (
      <View style={styles.containerBubble}>
        {props?.currentMessage?.user?._id == 2 ? (
          <Text style={styles.time}>
            {moment(props?.currentMessage?.createdAt).format('hh:mm a')}
          </Text>
        ) : null}
        <View style={styles.bubble}>
          <Text style={styles.messageBubble}>
            {props?.currentMessage?.text}
          </Text>
        </View>
        {props?.currentMessage?.user?._id == 1 ? (
          <Text style={styles.time}>
            {moment(props?.currentMessage?.createdAt).format('hh:mm a')}
          </Text>
        ) : null}
      </View>
    );
  };

  if (isLoading) return <ActivityIndicator style={styles.activity} />;
  else
    return (
      <View style={styles.container}>
        <GiftedChat
          alignTop
          // ref={ref}
          messages={data}
          user={{
            _id: 0,
          }}
          // renderTime={renderTime}
          messagesContainerStyle={[
            styles.gifted,
            {
              maxHeight: isKeyboardVisible
                ? heightPercentageToDP(45)
                : heightPercentageToDP(82),
            },
          ]}
          isCustomViewBottom
          loadEarlier={length > data?.length ? true : false}
          onLoadEarlier={() => {
            setRefreshing(true);
            // fetchMessages(true);
          }}
          inverted={false}
          // renderCustomView={renderCustomView}
          renderInputToolbar={renderToolbar}
          renderBubble={renderBubble}
        />
      </View>
    );
};

export default React.memo(Message);

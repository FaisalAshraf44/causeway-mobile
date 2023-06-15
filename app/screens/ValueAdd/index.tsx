import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import ValueAddonCard from 'app/components/ValueAddonCard';
import getValueAddons from 'app/services/getValueAddons';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, I18nManager, Pressable, Text, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { useStyle } from './styles';
import Placeholder from './Placeholder';
const ValueAdd: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const goBack = () => navigation.goBack();

  const theme = useTheme();
  const styles = useStyle();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<any>([]);
  const [totalAddonPrice, setTotalAddonPrice] = useState(0);

  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Value Add-ons',
      headerShown: true,
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerLeft: () => (
        <Pressable
          onPress={goBack}
          style={{ paddingRight: widthPercentageToDP(3) }}
        >
          <AntDesign
            name={I18nManager.isRTL ? 'right' : 'left'}
            color={theme.colors.text}
            size={isTablet() ? widthPercentageToDP(4) : widthPercentageToDP(5)}
          />
        </Pressable>
      ),
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
      },
      headerTransparent: false,
    });
  }, []);

  const getValueAddonData = async () => {
    try {
      setIsLoading(true);
      const response = await getValueAddons();

      if (response?.status == 201) {
        // console.log(response?.data?.results);
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
      getValueAddonData();
    }
    return () => {
      subscribed = false;
    };
  }, [isFocused]);

  const renderCards = ({ item }: any) => {
    return (
      <ValueAddonCard
        name={item?.name}
        price={item?.price}
        returnPrice={(val) => {
          if (val?.type == 'minus') {
            setTotalAddonPrice((prev) => prev - val?.price);
            const filtered: Array<any> = selected?.filter((each: any) => {
              return each?._id != item?._id;
            });
            setSelected(filtered);
          } else {
            setTotalAddonPrice((prev) => prev + val?.price);
            const filtered: Array<any> = selected?.filter((each: any) => {
              return each?._id != item?._id;
            });
            filtered.push(item);
            setSelected(filtered);
          }
        }}
      />
    );
  };

  if (isLoading) return <Placeholder />;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <FlatList data={data} renderItem={renderCards} />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Travel with peace of mind</Text>
        <Text style={styles.headingSubText}>
          Make your family vacation memorable including your little ones.
        </Text>
        <View style={styles.buttonMainContainer}>
          <TouchableOpacity
            onPress={() => {
              const params = {
                ...route?.params,
                addons: selected,
                totalAddonPrice: 0,
              };
              navigation.navigate('Checkout', params);
            }}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <PrimaryButton
            style={[styles.button]}
            disabled={selected?.length < 1}
            title="Continue"
            textStyle={styles.txtstyle}
            onPress={() => {
              const totalAddon = totalAddonPrice * route?.params?.numberOfDays;
              const total = route?.params?.totalPrice + totalAddon;
              const params = {
                ...route?.params,
                addons: selected,
                totalAddonPrice: totalAddon,
                totalPrice: total,
              };

              navigation.navigate('Checkout', params);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ValueAdd;

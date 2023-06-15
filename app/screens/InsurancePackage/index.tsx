import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import InsuranceCard from 'app/components/InsuranceCard';
import PrimaryButton from 'app/components/PrimaryButton';
import NavigationService from 'app/navigation/NavigationService';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, I18nManager, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';
import getInsurance from 'app/services/getInsurance';
import { useDispatch } from 'react-redux';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import moment from 'moment';
import Placeholder from './Placeholder';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { isTablet } from 'react-native-device-info';
const InsurancePackage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const goBack = () => NavigationService.goBack();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useStyle();
  const [checkedId, setCheckedId] = useState<any>();
  const numOfDays = useRef(0);
  const route = useRoute<any>();
  useEffect(() => {
    let insurancePrice = 0;
    const filteredResults: any = data?.filter((item: any) => {
      return item?._id == checkedId?.id && checkedId?.checked;
    });
    if (filteredResults?.length > 0) insurancePrice = filteredResults[0]?.price;
    const totalPricePrev = route?.params?.totalPricePerDay;
    const startDate = moment(route?.params?.bookingDetail?.startDate);
    const endDate = moment(route?.params?.bookingDetail?.endDate);
    const diff = moment(endDate).diff(startDate, 'days');
    numOfDays.current = diff;
    const totalPrice = totalPricePrev * diff + insurancePrice;
    setTotalPrice(totalPrice);
  }, [checkedId]);

  const getInsuranceData = async () => {
    try {
      setIsLoading(true);
      const response = await getInsurance();

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
      getInsuranceData();
    }
    return () => {
      subscribed = false;
    };
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Insurance package (SCDW)',
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
      headerShown: true,
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
      },
      headerTransparent: false,
    });
  }, []);

  const renderCard = ({ item }: any) => {
    return (
      <InsuranceCard
        id={item?._id}
        description={item?.description}
        isFree={item?.isFree}
        isRecommended={item?.isRecommended}
        checked={
          item?.checked == true ||
          (checkedId?.id == item?._id && checkedId.val == true)
            ? true
            : false
        }
        name={item?.name}
        price={'+ RM ' + item?.price}
        returnChecked={(id) => {
          setCheckedId(id);
        }}
      />
    );
  };

  if (isLoading) return <Placeholder />;
  return (
    <View style={styles.container}>
      <FlatList extraData={checkedId} data={data} renderItem={renderCard} />

      <View style={styles.absolute}>
        <>
          <View style={styles.row}>
            <Text style={styles.text1}>Total</Text>
            <Text style={styles.text1}>RM{totalPrice}</Text>
          </View>
          <Text style={styles.priceReduction}>Price Reduction</Text>
        </>

        <PrimaryButton
          title="Next"
          style={styles.button}
          onPress={() => {
            let insurance = undefined;
            const filteredResults: any = data?.filter((item: any) => {
              return item?._id == checkedId?.id && checkedId?.checked;
            });
            if (filteredResults?.length > 0) insurance = filteredResults[0];

            const params = {
              ...route?.params,
              insurance,
              totalPrice: totalPrice,
              numberOfDays: numOfDays?.current,
            };
            navigation.navigate('ValueAdd', params);
          }}
        />
      </View>
    </View>
  );
};

export default InsurancePackage;

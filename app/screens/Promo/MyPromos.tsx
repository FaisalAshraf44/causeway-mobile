import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';
import Lottie from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import getPromo from 'app/services/getPromo';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import PromoCard from 'app/components/PromoCard';
import moment from 'moment';
import images from 'app/config/images';
import Searchbar from 'app/components/Searchbar';
import PromoCardPlaceholder from 'app/components/PromoCard/Placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Redeemable = () => {
  const theme = useTheme();
  const styles = useStyle();
  const navigation = useNavigation();
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

  const apply = async (val: any) => {
    await AsyncStorage.setItem('TEMP_PROMO', val?.promoText);
    await AsyncStorage.setItem(
      'TEMP_PROMODISCOUNT',
      `${val?.discountPercentage}`
    );

    navigation.goBack();
  };

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
        // navigation.navigate('SignIn');
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

  const renderRightIcon = useCallback(() => {
    return (
      <View style={styles.iconView}>
        <AntDesign
          name="plus"
          size={widthPercentageToDP(5)}
          color={theme.colors.lightgrey}
        />
      </View>
    );
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    return (
      <PromoCard
        title={item?.heading}
        description={item?.description}
        expiry={moment(item?.expiry).format('DD, MMM, YYYY')}
        type={item?.promoText}
        onPressApply={() => apply(item)}
      />
    );
  }, []);

  const renderEmptyComponent = () => {
    return (
      <View>
        <Lottie source={images.global.noData} style={styles.empty} autoPlay />
        <Text
          style={[
            styles.subheader,
            { color: theme.colors.text, textAlign: 'center' },
          ]}
        >
          No Promotions available
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.promoContainer}>
      <Searchbar
        onChangeText={setSearchQuery}
        placeholder="Search to add promo"
        placeholderColor={theme.colors.lightgrey}
        rightIcon={renderRightIcon}
        value={searchQuery}
      />
      {isLoading ? (
        <PromoCardPlaceholder />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              enabled
              refreshing={isLoading}
              onRefresh={getPromoData}
            />
          }
          data={
            searchQuery != ''
              ? filtered.filter((item: any) => {
                  return item?.isActive == true;
                })
              : data?.filter((item: any) => {
                  return item?.isActive == true;
                })
          }
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
    </View>
  );
};
export default Redeemable;

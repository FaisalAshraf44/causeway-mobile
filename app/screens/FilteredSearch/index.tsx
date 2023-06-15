import Geolocation from '@react-native-community/geolocation';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import BlogCard from 'app/components/BlogCard';
import ImageCard from 'app/components/ImageCard';
import ImageCardPlaceholder from 'app/components/ImageCard/ImageCardPlaceholder';
import filteredCarListing from 'app/services/filteredCarListing';
import getAddress from 'app/services/getAddress';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import { convertDistance, getDistance } from 'geolib';
import moment from 'moment';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  I18nManager,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import Placeholder from './Placeholder';
import { useStyle } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { isTablet } from 'react-native-device-info';

const FilteredSearch: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyle();
  const theme = useTheme();
  const routes = useRoute<any>();
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(true);
  const currentSkip = useRef(10);
  const [data, setData] = useState<any>([]);
  const route = useRoute<any>();
  const focussed = useIsFocused();
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [scrollLoading, setScollLoading] = useState(false);
  const [location, setLocation] = useState('-');
  const arrayEquals = (a: [], b: []) => {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  };
  const [favoriteData, setFavoriteData] = useState([]);
  const isFocused = useIsFocused();

  const getFilteredBookingsData = async () => {
    setIsLoading(true);
    try {
      Geolocation.getCurrentPosition(async (position) => {
        try {
          let latitude = position?.coords?.latitude;
          let longitude = position?.coords?.longitude;
          const address = await getAddress(latitude, longitude);
          if (address?.status == 200) {
            if (address?.data?.results?.length > 0)
              console.log(
                'Address is ',
                address?.data?.results[0]?.formatted_address
              );
            setLocation(address?.data?.results[0]?.formatted_address);
          }

          const requestBody = {
            filters: {
              location: {
                longitude: longitude,
                latitude: latitude,
              },
              // startDate: route?.params?.startDate,
              // endDate: route?.params?.endDate,
            },
          };
          var filteredResponse = await filteredCarListing(requestBody);
          if (filteredResponse?.status == 201) {
            const newArr = filteredResponse?.data?.results?.map((item: any) => {
              var pdis = getDistance(
                {
                  latitude: item?.location?.coordinates[0],
                  longitude: item?.location?.coordinates[1],
                },
                {
                  longitude,
                  latitude,
                },
                0.01
              );
              item.distance = pdis
                ? convertDistance(pdis, 'mi')?.toFixed()
                : '-';
              return item;
            });
            const sorted = newArr?.sort(function (a: any, b: any) {
              return a?.distance - b?.distance;
            });
            setData(sorted);
          }
        } catch (err) {
          console.log('Err', err);
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 400);
        }
      });
    } catch {
      dispatch(enableSnackbar('Something went wrong, please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let subscribed = true;
    if (subscribed && focussed) {
      setIsLoading(true);
      if (route?.params?.filtered) {
        getFilteredBookingsData();
      }
    } else {
      currentSkip.current = 10;
      setScrollEnabled(true);
    }

    return () => {
      subscribed = false;
    };
  }, [focussed, route]);

  const renderBlogs = useCallback(
    ({ item }: any) => {
      return (
        <Pressable
          style={styles.blogContainer}
          onPress={() =>
            navigation.navigate('AppStack', { screen: 'Blog', params: item })
          }
        >
          <BlogCard
            image={
              item?.images?.length > 0 ? { uri: item?.images[0] } : undefined
            }
            title={item?.title}
            extraWidth={widthPercentageToDP(90)}
            description={item?.content}
            estimatedReadingTime={item?.estimatedReadingTime}
            time={item?.updatedAt}
          />
        </Pressable>
      );
    },
    [route]
  );

  const renderItem = useCallback(
    ({ item }: any, isOffer?: boolean) => {
      // console.log('item', item);
      return (
        <Pressable
          onPress={() => navigation.navigate('CarDetail', { id: item?._id })}
        >
          <ImageCard
            style={styles.imagecard}
            id={item?._id}
            isLiked={
              favoriteData?.findIndex((itemSub: any) => {
                return itemSub?._id == item?._id;
              }) >= 0
            }
            price={item?.rentPerDay + '  RMB/Day'}
            isOffer={route?.params?.fromOffers ? true : false}
            description={item?.description}
            distance={item?.distance ? item?.distance + ' mi' : 'N/A'}
            features={item?.features}
            name={item?.make}
            rating={item?.rating?.value}
            image={{
              uri: item?.photos?.length > 0 ? item?.photos[0] : '',
            }}
          />
        </Pressable>
      );
    },
    [route]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: routes?.params?.title ? routes?.params?.title : '',
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
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

      headerTransparent: false,
    });
  }, [routes]);

  const renderFooter = () => {
    if (scrollLoading) return <ImageCardPlaceholder />;
    else return null;
  };

  if (isLoading) return <Placeholder />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        {routes?.params?.filtered ? (
          <View style={styles.searchContainer}>
            <Text
              numberOfLines={2}
              style={[
                styles.filteredText,
                {
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  paddingRight: widthPercentageToDP(2),
                  paddingTop: heightPercentageToDP(0.5),
                  maxWidth: widthPercentageToDP(38),
                },
              ]}
            >
              {location}
            </Text>
            <View style={styles.divider} />
            <View>
              <Text
                style={[
                  styles.filteredText,
                  { fontSize: widthPercentageToDP(3) },
                ]}
              >
                {moment(route?.params?.startDate).format('ddd, DD, MMM')} -{' '}
                {moment(route?.params?.endDate).format('ddd, DD, MMM')}
              </Text>
              <Text
                style={[
                  styles.filteredText,
                  {
                    fontSize: widthPercentageToDP(2),
                    paddingLeft: widthPercentageToDP(3.5),
                    paddingTop: heightPercentageToDP(0.5),
                  },
                ]}
              >
                {moment(route?.params?.startTime).format('hh:mm a')} -{' '}
                {moment(route?.params?.endTime).format('hh:mm a')}
              </Text>
            </View>
          </View>
        ) : null}
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.flatlist}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

export default FilteredSearch;

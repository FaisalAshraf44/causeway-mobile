import Geolocation from '@react-native-community/geolocation';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ImageCard from 'app/components/ImageCard';
import getBlogs from 'app/services/getBlogs';
import getHome from 'app/services/getHome';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import { convertDistance, getDistance } from 'geolib';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { useStyle } from './styles';
import ImageCardPlaceholder from 'app/components/ImageCard/ImageCardPlaceholder';
import BlogCard from 'app/components/BlogCard';
import Placeholder from './Placeholder';
import getFavorites from 'app/services/getFavorites';

const CarListing: React.FC = () => {
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
  const getFavoritesData = async (noLoading?: boolean) => {
    try {
      const response = await getFavorites();

      if (response?.status == 201 || response?.status == 200) {
        console.log('res fav', response?.data?.results);
        setFavoriteData(response?.data?.results);
      }
    } catch (err: any) {}
  };

  useEffect(() => {
    let subscribed = true;
    if (subscribed && isFocused) {
      getFavoritesData();
    }
    return () => {
      subscribed = false;
    };
  }, [isFocused]);

  const getBookingsData = async (fromScroll?: boolean) => {
    try {
      if (!fromScroll) setIsLoading(true);
      if (fromScroll) setScollLoading(true);

      if (!route?.params?.fromOffers) {
        Geolocation.getCurrentPosition(
          async (position) => {
            try {
              var bookNowResponse = await getHome(currentSkip?.current, 0);
              if (bookNowResponse?.status == 201) {
                Geolocation.getCurrentPosition(async (position) => {
                  const newArr = bookNowResponse?.data?.results?.map(
                    (item: any) => {
                      var pdis = getDistance(
                        {
                          latitude: item?.location?.coordinates[0],
                          longitude: item?.location?.coordinates[1],
                        },
                        {
                          latitude: position?.coords?.latitude,
                          longitude: position?.coords?.longitude,
                        },
                        0.01
                      );
                      item.distance = pdis
                        ? convertDistance(pdis, 'mi')?.toFixed()
                        : '-';
                      return item;
                    }
                  );

                  const sorted = newArr?.sort(function (a: any, b: any) {
                    return a?.distance - b?.distance;
                  });
                  setData(sorted);

                  if (sorted?.length >= bookNowResponse?.data?.count)
                    setScrollEnabled(false);
                  currentSkip.current = currentSkip.current + 10;
                });
              }
            } catch (err) {
              console.log('Err', err);
            } finally {
              setIsLoading(false);
              setScollLoading(false);
            }
          },
          async (err) => {
            try {
              var bookNowResponse = await getHome(10, currentSkip?.current);
              if (bookNowResponse?.status == 201) {
                Geolocation.getCurrentPosition(async (position) => {
                  const newArr = bookNowResponse?.data?.results?.map(
                    (item: any) => {
                      var pdis = getDistance(
                        {
                          latitude: item?.location?.coordinates[0],
                          longitude: item?.location?.coordinates[1],
                        },
                        {
                          latitude: position?.coords?.latitude,
                          longitude: position?.coords?.longitude,
                        },
                        0.01
                      );
                      item.distance = pdis
                        ? convertDistance(pdis, 'mi')?.toFixed()
                        : '-';
                      return item;
                    }
                  );
                  const sorted = newArr?.sort(function (a: any, b: any) {
                    return a?.distance - b?.distance;
                  });
                  setData(sorted);
                  if (sorted?.length >= bookNowResponse?.data?.count)
                    setScrollEnabled(false);
                  currentSkip.current = currentSkip.current + 10;
                });
              }
            } catch {
            } finally {
              setIsLoading(false);
              setScollLoading(false);
            }
          }
        );
      }
    } catch {
      dispatch(enableSnackbar('Something went wrong, please try again.'));
    }
  };

  const getOffersData = async (fromScroll?: boolean) => {
    try {
      if (!fromScroll) setIsLoading(true);
      if (fromScroll) setScollLoading(true);

      const offersResponse = await getHome(currentSkip?.current, 0, {
        filters: {
          offer: {
            $exists: true,
          },
        },
      });

      if (offersResponse?.status == 201) {
        Geolocation.getCurrentPosition(
          async (position) => {
            const newArr = offersResponse?.data?.results?.map((item: any) => {
              var pdis = getDistance(
                {
                  latitude: item?.location?.coordinates[0],
                  longitude: item?.location?.coordinates[1],
                },
                {
                  latitude: position?.coords?.latitude,
                  longitude: position?.coords?.longitude,
                },
                0.01
              );
              item.distance = pdis
                ? convertDistance(pdis, 'mi')?.toFixed()
                : '-';
              return item;
            });
            setData(newArr);
            if (newArr?.length >= offersResponse?.data?.count)
              setScrollEnabled(false);
            currentSkip.current = currentSkip.current + 10;
          },
          () => {
            dispatch(enableSnackbar('Something went wrong, please try again.'));
          }
        );
      }
    } catch {
      dispatch(enableSnackbar('Something went wrong, please try again.'));
    } finally {
      setIsLoading(false);
      setScollLoading(false);
    }
  };

  const getBlogsData = async (fromScroll?: boolean) => {
    try {
      if (!fromScroll) setIsLoading(true);
      if (fromScroll) setScollLoading(true);

      const blogsResponse = await getBlogs(currentSkip?.current, 0, {});
      if (blogsResponse?.status == 201) {
        setData(blogsResponse?.data?.results);
        if (blogsResponse?.data?.results?.length >= blogsResponse?.data?.count)
          setScrollEnabled(false);
        currentSkip.current = currentSkip.current + 10;
      } else {
        dispatch(enableSnackbar('Something went wrong, please try again.'));
      }
    } catch {
      dispatch(enableSnackbar('Something went wrong, please try again.'));
    } finally {
      setIsLoading(false);
      setScollLoading(false);
    }
  };

  useEffect(() => {
    let subscribed = true;
    if (subscribed && focussed) {
      setIsLoading(true);
      if (route?.params?.fromBlogs) {
        getBlogsData();
        return;
      }
      if (route?.params?.fromOffers) getOffersData();
      else if (route?.params?.fromBooking) getBookingsData();
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

      headerTransparent: false,
    });
  }, [routes]);

  const onScrollEnd = useCallback(() => {
    if (scrollEnabled) {
      if (route?.params?.fromBlog) {
        getBlogsData(true);
        return;
      }
      if (route?.params?.fromOffers) getOffersData(true);
      else getBookingsData(true);
    }
  }, [scrollEnabled]);

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
              style={[
                styles.filteredText,
                {
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  paddingRight: widthPercentageToDP(2),
                  paddingTop: heightPercentageToDP(0.5),
                },
              ]}
            >
              Senai Airport
            </Text>
            <View style={styles.divider} />
            <View>
              <Text
                style={[
                  styles.filteredText,
                  { fontSize: widthPercentageToDP(3) },
                ]}
              >
                Fri 25 Jan - Sat 26 Jan
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
                10:00 Am - 11:00 Am
              </Text>
            </View>
          </View>
        ) : null}
        <FlatList
          data={data}
          renderItem={route?.params?.fromBlogs ? renderBlogs : renderItem}
          contentContainerStyle={styles.flatlist}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          onEndReached={onScrollEnd}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

export default CarListing;

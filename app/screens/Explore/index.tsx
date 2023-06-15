import { useIsFocused, useNavigation } from '@react-navigation/native';
import ImageCard from 'app/components/ImageCard';
import Searchbar from 'app/components/Searchbar';
import images from 'app/config/images';
import getHome from 'app/services/getHome';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import Lottie from 'lottie-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Keyboard,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Placeholder from './Placeholder';
import { useStyle } from './styles';
import Geolocation from '@react-native-community/geolocation';
import { convertDistance, getDistance } from 'geolib';
import getBlogs from 'app/services/getBlogs';
import BlogCard from 'app/components/BlogCard';
import { RootState } from 'app/store/slice';
import patchFavorites from 'app/services/patchFavorites';
import getFavorites from 'app/services/getFavorites';

const Explore: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [bookNow, setBookNow] = useState([]);
  const [offers, setOffers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const currentSkip = useRef(0);
  const user = useSelector((state: RootState) => state.user.user);
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

  const getHomeScreen = async () => {
    try {
      setIsLoading(true);

      Geolocation.getCurrentPosition(
        async (position) => {
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
                setBookNow(sorted);
                console.log('s', sorted);
              });
            }
          } catch (err) {
            console.log('Err', err);
          }
        },
        async (err) => {
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
              setBookNow(newArr);
            });
          }
        }
      );

      const offersResponse = await getHome(10, currentSkip?.current, {
        filters: {
          offer: {
            $exists: true,
          },
        },
      });

      if (offersResponse?.status == 201) {
        Geolocation.getCurrentPosition(async (position) => {
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
            item.distance = pdis ? convertDistance(pdis, 'mi')?.toFixed() : '-';
            return item;
          });
          setOffers(newArr);
        });
        //get blogs
        const blogsResponse = await getBlogs(10, currentSkip?.current, {});
        if (blogsResponse?.status == 201) {
          setBlogs(blogsResponse?.data?.results);
        }
      } else {
        dispatch(enableSnackbar('Something went wrong, please try again.'));
      }
    } catch {
      dispatch(enableSnackbar('Something went wrong, please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  const renderBlogs = useCallback(({ item }: any) => {
    return (
      <Pressable
        style={styles.blogContainer}
        onPress={() =>
          navigation.navigate('AppStack', { screen: 'Blog', params: item })
        }
      >
        <BlogCard
          image={{ uri: item?.images[0] }}
          title={item?.title}
          description={item?.content}
          estimatedReadingTime={item?.estimatedReadingTime}
          time={item?.updatedAt}
        />
      </Pressable>
    );
  }, []);

  useEffect(() => {
    let subscribed = true;
    if (subscribed && isFocused) {
      getHomeScreen();
    }
    return () => {
      subscribed = false;
    };
  }, [isFocused]);

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
          No data found
        </Text>
      </View>
    );
  };

  const renderItem = useCallback(
    ({ item }: any, isOffer?: boolean) => {
      let like = false;
      const index = favoriteData?.findIndex((itemSub: any) => {
        return itemSub?._id == item?._id;
      });
      if (index >= 0) {
        like = true;
      }
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('AppStack', {
              screen: 'CarDetail',
              params: { id: item?._id },
            })
          }
        >
          <ImageCard
            style={styles.imagecard}
            id={item?._id}
            price={item?.rentPerDay + '  RMB/Day'}
            isOffer={isOffer}
            isLiked={
              favoriteData?.findIndex((itemSub: any) => {
                return itemSub?._id == item?._id;
              }) >= 0
            }
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
    [favoriteData]
  );

  if (isLoading) return <Placeholder />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <FastImage source={images.explore.car} style={styles.car} />
        <Text style={styles.headerText}>{t('EXPERIENCE')}</Text>
        <Text style={styles.subheader}>{t('BEST WITH US')}</Text>
      </View>
      <Searchbar
        onChangeText={() => {}}
        placeholder="Search to Rent"
        placeholderColor={theme.colors.text}
        dummy
        onPress={() => {
          navigation.navigate('Search');
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            enabled
            refreshing={isLoading}
            onRefresh={() => {
              getHomeScreen();
              getFavoritesData();
            }}
          />
        }
      >
        {bookNow?.length > 0 ? (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionSubContainer}>
              <Text style={styles.title}>Book Now</Text>
              <FastImage
                resizeMode="contain"
                source={images.explore.calender}
                style={styles.img}
              />
            </View>
            <Pressable
              onPress={() =>
                navigation.navigate('CarListing', {
                  fromBooking: true,
                  title: 'Book Now',
                })
              }
            >
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>
        ) : null}
        <FlatList
          data={bookNow}
          horizontal
          extraData={[user, favoriteData]}
          renderItem={renderItem}
          style={{
            paddingHorizontal: widthPercentageToDP(4),
          }}
          contentContainerStyle={{
            paddingBottom: heightPercentageToDP(2),
            paddingRight: widthPercentageToDP(4),
          }}
        />

        {offers?.length > 0 ? (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionSubContainer}>
              <Text style={styles.title}>Offers</Text>
              <FastImage
                resizeMode="contain"
                source={images.explore.percentage}
                style={styles.img}
              />
            </View>
            <Pressable
              onPress={() =>
                navigation.navigate('CarListing', {
                  fromOffers: true,
                  title: 'Offers',
                })
              }
            >
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>
        ) : null}

        <FlatList
          data={offers}
          horizontal
          renderItem={(item) => renderItem(item, true)}
          style={{
            paddingHorizontal: widthPercentageToDP(4),
          }}
          contentContainerStyle={{
            paddingBottom: heightPercentageToDP(2),
            paddingRight: widthPercentageToDP(6),
          }}
        />

        {/* blogs scope */}
        {/* {blogs?.length > 0 ? (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionSubContainer}>
              <Text style={styles.title}>Blogs</Text>
              <FastImage
                resizeMode="contain"
                source={images.explore.percentage}
                style={styles.img}
              />
            </View>
            <Pressable
              onPress={() =>
                navigation.navigate('CarListing', {
                  fromBlogs: true,
                  title: 'Blogs',
                })
              }
            >
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>
        ) : null}

        <FlatList
          data={blogs}
          horizontal
          renderItem={renderBlogs}
          style={{
            paddingHorizontal: widthPercentageToDP(4),
            marginTop: heightPercentageToDP(1),
          }}
          contentContainerStyle={{
            paddingBottom: heightPercentageToDP(2),
            paddingRight: widthPercentageToDP(6),
          }}
        /> */}

        {bookNow?.length < 1 && offers?.length < 1 && blogs?.length < 1
          ? renderEmptyComponent()
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;

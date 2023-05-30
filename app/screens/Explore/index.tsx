import { useNavigation } from '@react-navigation/native';
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
import { useDispatch } from 'react-redux';
import Placeholder from './Placeholder';
import { useStyle } from './styles';

const Explore: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [bookNow, setBookNow] = useState([]);
  const currentSkip = useRef(0);
  // const [sections, setSections] = useState<Array<any>>([]);

  // const getArrayOfUniqueCategories = async (categories: Array<any>) => {
  //   const temp = categories?.map((item: any) => {
  //     return item?.type;
  //   });
  //   const filteredArray = [
  //     ...new Set(
  //       temp?.filter(function (item, pos, ary) {
  //         return !pos || item != ary[pos - 1];
  //       })
  //     ),
  //   ];

  //   return filteredArray;
  // };

  // const reorderData = async (data: Array<any>) => {
  //   const uniqueTypes: Array<string> = await getArrayOfUniqueCategories(data);
  //   setSections(uniqueTypes);

  //   let reorderedData: any = [];
  //   uniqueTypes.forEach((element) => {
  //     let filtered = data?.filter((item) => {
  //       return item?.type == element;
  //     });
  //     let filteredObj = { title: element, data: filtered };
  //     reorderedData = [...reorderedData, filteredObj];
  //   });

  //   setData(reorderedData);
  // };

  const getHomeScreen = async () => {
    try {
      setIsLoading(true);
      const response = await getHome(10, currentSkip?.current);

      if (response?.status == 201) {
        console.log('res', response?.data?.results[0]);

        setBookNow(response?.data?.results);
      } else {
        dispatch(enableSnackbar('Something went wrong, please try again.'));
      }
    } catch {
      dispatch(enableSnackbar('Something went wrong, please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      getHomeScreen();
    }
    return () => {
      subscribed = false;
    };
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
          No data found
        </Text>
      </View>
    );
  };

  const renderItem = useCallback(({ item }: any) => {
    return (
      <Pressable onPress={() => navigation.navigate('CarDetail')}>
        <ImageCard
          style={styles.imagecard}
          price={'21 RMB/Day'}
          description={'Here goes the description'}
          distance="212 miles"
          name={'Honda'}
          rating={'5'}
          image={images.explore.blackCar}
        />
      </Pressable>
    );
  }, []);

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
        onFocus={() => {
          Keyboard.dismiss();
          navigation.navigate('Search');
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            enabled
            refreshing={isLoading}
            onRefresh={getHomeScreen}
          />
        }
      >
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Book Now</Text>
          <Pressable
            onPress={() =>
              navigation.navigate('CarListing', {
                data: bookNow,
                title: 'Book Now',
              })
            }
          >
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>
        <FlatList
          data={bookNow}
          horizontal
          renderItem={renderItem}
          style={{
            paddingHorizontal: widthPercentageToDP(4),
            marginTop: heightPercentageToDP(1),
          }}
          contentContainerStyle={{ paddingBottom: heightPercentageToDP(2) }}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Offers</Text>
          <Pressable
            onPress={() =>
              navigation.navigate('CarListing', {
                data: bookNow,
                title: 'Book Now',
              })
            }
          >
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>

        <FlatList
          data={bookNow}
          horizontal
          renderItem={renderItem}
          style={{
            paddingHorizontal: widthPercentageToDP(4),
            marginTop: heightPercentageToDP(1),
          }}
          contentContainerStyle={{ paddingBottom: heightPercentageToDP(2) }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;

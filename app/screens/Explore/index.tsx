import { BlurView } from '@react-native-community/blur';
import ImageCard from 'app/components/ImageCard';
import images from 'app/config/images';
import getHome from 'app/services/getHome';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react-native';
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  SectionList,
  Text,
  TextInput,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useStyle } from './styles';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Placeholder from './Placeholder';
import { useNavigation } from '@react-navigation/native';

const Explore: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sections, setSections] = useState<Array<any>>([]);

  const getArrayOfUniqueCategories = async (categories: Array<any>) => {
    const temp = categories?.map((item: any) => {
      return item?.type;
    });
    const filteredArray = [
      ...new Set(
        temp?.filter(function (item, pos, ary) {
          return !pos || item != ary[pos - 1];
        })
      ),
    ];

    return filteredArray;
  };

  const reorderData = async (data: Array<any>) => {
    const uniqueTypes: Array<string> = await getArrayOfUniqueCategories(data);
    setSections(uniqueTypes);

    let reorderedData: any = [];
    uniqueTypes.forEach((element) => {
      let filtered = data?.filter((item) => {
        return item?.type == element;
      });
      let filteredObj = { title: element, data: filtered };
      reorderedData = [...reorderedData, filteredObj];
    });

    setData(reorderedData);
  };

  const getHomeScreen = async () => {
    try {
      setIsLoading(true);
      const response = await getHome();
      if (response?.status == 200) {
        reorderData(response?.data);
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
          price={item?.price}
          description={item?.description}
          distance={item?.distance}
          name={item?.name}
          rating={item?.rating}
        />
      </Pressable>
    );
  }, []);

  const renderHorizontalList = useCallback(({ item }: any) => {
    return (
      <>
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Pressable onPress={() => navigation.navigate('CarListing', item)}>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>
        <FlatList
          data={item?.data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </>
    );
  }, []);

  if (isLoading) return <Placeholder />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <FastImage source={images.explore.car} style={styles.car} />
        <Text style={styles.headerText}>{t('EXPERIENCE')}</Text>
        <Text style={styles.subheader}>{t('BEST WITH US')}</Text>
        <View style={styles.searchParent}>
          <FastImage
            source={images.bottomBar.search}
            tintColor="white"
            style={styles.searchIcon}
            resizeMode="contain"
          />
          <TextInput
            onChangeText={setSearchQuery}
            style={styles.search}
            value={searchQuery}
            placeholder="Search to Rent"
            placeholderTextColor={theme.colors.text}
          />
          <BlurView
            blurType="light"
            blurAmount={20}
            style={styles.searchView}
            blurRadius={14}
          ></BlurView>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={renderHorizontalList}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl
            enabled
            refreshing={isLoading}
            onRefresh={getHomeScreen}
          />
        }
        style={{
          paddingHorizontal: widthPercentageToDP(4),
          marginTop: heightPercentageToDP(1),
        }}
        contentContainerStyle={{ paddingBottom: heightPercentageToDP(2) }}
      />
    </SafeAreaView>
  );
};

export default Explore;

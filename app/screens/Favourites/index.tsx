import Lottie from 'lottie-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ImageCard from 'app/components/ImageCard';
import images from 'app/config/images';
import getFavorites from 'app/services/getFavorites';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Placeholder from './Placeholder';
import { useStyle } from './styles';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Favourites: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const theme = useTheme();

  const getFavoritesData = async (noLoading?: boolean) => {
    try {
      if (!noLoading) setIsLoading(true);
      const response = await getFavorites();

      if (response?.status == 201 || response?.status == 200) {
        console.log('res', response?.data);

        setData(response?.data?.results);
      }
    } catch (err: any) {
      if (err?.response?.status == 401) {
        dispatch(enableSnackbar('Please sign in to continue'));
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
      getFavoritesData();
    }
    return () => {
      subscribed = false;
    };
  }, [isFocused]);

  const renderItem = ({ item }: any, isOffer?: boolean) => {
    // console.log('item', item);
    return (
      <Pressable
        onPress={() => navigation.navigate('CarDetail', { id: item?._id })}
        style={{ width: widthPercentageToDP(94) }}
      >
        <ImageCard
          style={styles.imagecard}
          price={item?.rentPerDay + '  RMB/Day'}
          isOffer={false}
          id={item?._id}
          fromFavoritesScreen
          description={item?.description}
          distance={item?.distance ? item?.distance + ' mi' : 'N/A'}
          features={item?.features}
          isLiked={true}
          name={item?.make}
          rating={item?.rating?.value}
          image={{
            uri: item?.photos?.length > 0 ? item?.photos[0] : '',
          }}
          returnCall={() => getFavoritesData(true)}
        />
      </Pressable>
    );
  };

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
          No data available
        </Text>
      </View>
    );
  };

  if (isLoading) return <Placeholder />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.flatlist}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favourites;

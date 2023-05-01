import React, { useCallback, useLayoutEffect } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useStyle } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImageCard from 'app/components/ImageCard';

const CarListing: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyle();
  const theme = useTheme();
  const routes = useRoute<any>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: routes?.params?.title,
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },

      headerTransparent: false,
    });
  }, [routes]);

  const renderItem = useCallback(({ item }: any) => {
    return (
      <ImageCard
        style={styles.imagecard}
        price={item?.price}
        description={item?.description}
        distance={item?.distance}
        name={item?.name}
        rating={item?.rating}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <FlatList
          data={routes?.params?.data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default CarListing;

import React, { useCallback, useLayoutEffect } from 'react';
import { FlatList, Pressable, SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useStyle } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImageCard from 'app/components/ImageCard';
import images from 'app/config/images';

const CarListing: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyle();
  const theme = useTheme();
  const routes = useRoute<any>();
  const navigation = useNavigation<any>();

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

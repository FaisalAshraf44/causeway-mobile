import { useNavigation, useRoute } from '@react-navigation/native';
import images from 'app/config/images';
import React, { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { useStyle } from './styles';

const Blog: React.FC = () => {
  const styles = useStyle();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const route = useRoute<any>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerShown: true,
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
      },
      headerTransparent: false,
    });
  }, []);
  return (
    <View style={styles.mainView}>
      <View style={styles.subView}>
        <View style={styles.imageContainer}>
          <FastImage
            source={
              route?.params?.images?.length > 0
                ? { uri: route?.params?.images[0] }
                : images.explore.blackCar
            }
            resizeMode="stretch"
            style={styles.img}
          />
        </View>

        <Text style={styles.headingText}>{route?.params?.title}</Text>
        <Text style={styles.subText}>{route?.params?.content}</Text>
      </View>
    </View>
  );
};

export default Blog;

import images from 'app/config/images';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { useStyle } from './style';
import { Props } from './types';
const ImageCard: React.FC<Props> = (props) => {
  const styles = useStyle();

  return (
    <View style={[styles.view, props.style]}>
      <View style={[styles.flexrow]}>
        <View style={[styles.distance]}>
          <Text style={[styles.distanceText]}>{props?.distance}</Text>
        </View>
        <TouchableOpacity>
          <FastImage
            source={images.explore.img_card_heart}
            style={styles.Image_for_heart_star}
            tintColor={'#E6E6E6'}
          />
        </TouchableOpacity>
      </View>
      <FastImage
        source={props?.image}
        resizeMode="stretch"
        style={styles.carImage}
        defaultSource={images.explore.car}
      />
      <View style={styles.nameParent}>
        <Text style={styles.nameText}>{props?.name}</Text>
        <FastImage
          source={images.explore.star}
          style={styles.Image_for_heart_star}
          resizeMode="contain"
        />
        <Text style={styles.ratingText}>{props?.rating}</Text>
      </View>
      <Text style={styles.descriptionText}>{props?.description}</Text>
      <View style={styles.priceParent}>
        <Text style={styles.priceText}>{props?.price}</Text>
        <View style={styles.iconView}>
          <FastImage
            resizeMode="contain"
            source={images.explore.aux}
            style={styles.icon}
          />
          <FastImage
            resizeMode="contain"
            source={images.explore.bluetooth}
            style={styles.icon}
          />
          <FastImage
            resizeMode="contain"
            source={images.explore.satelite}
            style={styles.icon}
          />
        </View>
      </View>
    </View>
  );
};
export default ImageCard;

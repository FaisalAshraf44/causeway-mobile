import images from 'app/config/images';
import { getUserDetails } from 'app/utils/extras';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { useStyle } from './style';
import { Props } from './types';
import patchFavorites from 'app/services/patchFavorites';
import deleteFavorites from 'app/services/deleteFavorites';
import { useIsFocused } from '@react-navigation/native';
const ImageCard: React.FC<Props> = (props) => {
  const styles = useStyle();
  const theme = useTheme();
  const user = getUserDetails();
  const [liked, setLiked] = useState(props?.isLiked);

  const addToFavorites = async () => {
    try {
      const response = await patchFavorites({
        car: props?.id,
      });
      if (response?.status == 200) {
        console.log('res', response?.data);
        setLiked(true);
        if (props?.returnCall) props?.returnCall();
      }
    } catch {
    } finally {
    }
  };

  const removeFromFavorites = async () => {
    console.log('re');
    try {
      const response = await deleteFavorites({
        car: props?.id,
      });
      console.log('res', response?.data);

      if (response?.status == 200) {
        if (!props?.fromFavoritesScreen) setLiked(false);
        if (props?.returnCall) props?.returnCall();
      }
    } catch {
    } finally {
    }
  };

  return (
    <View style={[styles.view, props.style]}>
      {props?.isOffer ? (
        <View style={styles.offer}>
          <Text style={styles.offerText}>Offers</Text>
          <FastImage
            source={images.explore.percentage}
            style={styles.offersImage}
          />
        </View>
      ) : null}
      <View style={[styles.flexrow]}>
        <View style={[styles.distance]}>
          <Text style={[styles.distanceText]}>{props?.distance}</Text>
        </View>
        {console.log('use', user)}
        {console.log('ssa', props?.isOffer)}
        {!props?.isOffer && user != undefined ? (
          <TouchableOpacity
            onPress={liked ? removeFromFavorites : addToFavorites}
          >
            <FastImage
              source={images.explore.img_card_heart}
              style={styles.Image_for_heart_star}
              tintColor={liked ? 'maroon' : '#E6E6E6'}
            />
          </TouchableOpacity>
        ) : null}
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
          {props?.isOffer ? (
            <View style={styles.details}>
              <Text
                style={[
                  styles.offerText,
                  { fontFamily: theme.fonts.regularFont },
                ]}
              >
                View Details
              </Text>
            </View>
          ) : (
            <>
              {props?.features?.map((item: any) => {
                return (
                  <FastImage
                    key={'item_' + item}
                    resizeMode="contain"
                    source={
                      item == 'Bluetooth'
                        ? images.features.Bluetooth
                        : item == 'Parking Sensor'
                        ? images.features.ParkingSensor
                        : item == 'Air Conditioner'
                        ? images.features.AirConditioner
                        : item?.includes('First')
                        ? images.features.FirstAidKit
                        : item?.includes('Dash')
                        ? images.features.DashCamera
                        : item?.includes('Emergency')
                        ? images.features.EmergencyKit
                        : item?.includes('GPS')
                        ? images.features?.GPS
                        : item?.includes('Charging')
                        ? images.features.MobileChargingCable
                        : item?.includes('Holder')
                        ? images.features.PhoneHolder
                        : item?.includes('Reverse')
                        ? images.features.ReverseCamera
                        : item?.includes('Tissues')
                        ? images.features.Tissues
                        : item?.includes('Umbrella')
                        ? images.features.Umbrella
                        : item?.includes('USB')
                        ? images.features.USB
                        : item?.includes('Water')
                        ? images.features.WaterBottles
                        : ''
                    }
                    style={styles.icon}
                  />
                );
              })}
            </>
          )}
        </View>
      </View>
    </View>
  );
};
export default ImageCard;

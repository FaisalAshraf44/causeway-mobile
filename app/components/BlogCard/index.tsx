import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useStyle } from './style';
import { Props } from './types';
import FastImage from 'react-native-fast-image';
import images from 'app/config/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { widthPercentageToDP } from 'react-native-responsive-screen';
import moment from 'moment';
const BlogCard: React.FC<Props> = (props) => {
  const styles = useStyle();
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          width: props?.extraWidth
            ? props?.extraWidth
            : widthPercentageToDP(79),
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <FastImage
          source={props?.image?.uri ? props?.image : images.explore.car}
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
      <Text style={styles.heading}>{props?.title}</Text>
      <Text style={styles.subHeading} numberOfLines={2}>
        {props?.description}
      </Text>
      <View style={styles.bottomRow}>
        <View style={styles.timeContainer}>
          <Ionicons
            name="time"
            color={theme.colors.lightgrey}
            size={widthPercentageToDP(4)}
            style={styles.adjustment}
          />
          <Text style={styles.miniText}>
            {moment(new Date()).diff(props.time, 'hours')} hours
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <FontAwesome
            name="circle"
            color={theme.colors.lightgrey}
            size={widthPercentageToDP(3)}
            style={[
              styles.adjustment,
              { paddingHorizontal: widthPercentageToDP(3) },
            ]}
          />
          <Text style={styles.miniText}>
            {props?.estimatedReadingTime} min read
          </Text>
        </View>
      </View>
    </View>
  );
};
export default BlogCard;

import images from 'app/config/images';
import React, { useState } from 'react';
import { FlatList, LayoutAnimation, Pressable, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { useStyle } from './style';
import { Props } from './types';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
const LocationCard: React.FC<Props> = (props) => {
  const styles = useStyle();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    // if (open) props.returnOpenStatus(false);
    // else props.returnOpenStatus(true);
    setOpen((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {open ? (
        <View style={[styles.image]} />
      ) : (
        <FastImage
          source={props?.image}
          defaultSource={images.explore.blackCar}
          style={styles.image}
        />
      )}
      <View style={[styles.nameContainer]}>
        <Text
          style={[
            styles.name,
            {
              maxWidth: !open
                ? widthPercentageToDP(50)
                : widthPercentageToDP(60),
            },
          ]}
        >
          {open ? props?.description : props?.name}
        </Text>
        <Pressable onPress={toggleOpen}>
          <AntDesign
            name={open ? 'up' : 'down'}
            color={'grey'}
            size={widthPercentageToDP(4)}
          />
        </Pressable>
      </View>
    </View>
  );
};
export default React.memo(LocationCard);

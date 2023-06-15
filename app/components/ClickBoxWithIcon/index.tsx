import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useStyle } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Props } from './types';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { isTablet } from 'app/utils/extras';
import FastImage from 'react-native-fast-image';
import images from 'app/config/images';
const ClickBoxWithIcon: React.FC<Props> = (props) => {
  const styles = useStyle();
  const theme = useTheme();
  return (
    <Pressable
      style={[styles.subContainer, props?.style]}
      onPress={props?.onPress}
    >
      <View style={styles.space}>
        <FastImage
          resizeMode="contain"
          source={props?.icon}
          style={styles.imageIcon}
        />
        <Text style={[styles.txt, props?.textStyle]}>{props?.title}</Text>
      </View>
      <FastImage
        resizeMode="contain"
        source={images.Payment.next}
        style={styles.nextIcon}
        tintColor={theme.colors.text}
      />
    </Pressable>
  );
};
export default ClickBoxWithIcon;

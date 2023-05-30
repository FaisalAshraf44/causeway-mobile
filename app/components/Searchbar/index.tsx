import images from 'app/config/images';
import React from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { useStyle } from './style';
import { Props } from './types';
import { BlurView } from '@react-native-community/blur';
const Searchbar: React.FC<Props> = (props) => {
  const styles = useStyle();
  const theme = useTheme();

  return (
    <Pressable
      style={[styles.searchParent, props?.styles]}
      onPress={props?.onPress}
    >
      <FastImage
        source={images.bottomBar.search}
        tintColor={
          props?.placeholderColor ? props?.placeholderColor : theme.colors.text
        }
        style={styles.searchIcon}
        resizeMode="contain"
      />
      <TextInput
        onChangeText={props?.onChangeText}
        style={styles.search}
        value={props?.value}
        onPressIn={props?.onPress}
        placeholder={props?.placeholder}
        onFocus={props?.onFocus}
        placeholderTextColor={
          props?.placeholderColor ? props?.placeholderColor : theme.colors.text
        }
      />
      <BlurView
        blurType="light"
        blurAmount={20}
        style={styles.searchView}
        blurRadius={14}
      ></BlurView>
    </Pressable>
  );
};
export default Searchbar;

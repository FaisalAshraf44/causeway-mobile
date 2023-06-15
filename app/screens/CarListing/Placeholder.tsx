import ImageCardPlaceholder from 'app/components/ImageCard/ImageCardPlaceholder';
import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

const Placeholder = () => {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <ImageCardPlaceholder />
      <ImageCardPlaceholder />
      <ImageCardPlaceholder />
      <ImageCardPlaceholder />
      <ImageCardPlaceholder />
    </View>
  );
};
export default Placeholder;

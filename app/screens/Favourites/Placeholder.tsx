import ImageCardPlaceholder from 'app/components/ImageCard/ImageCardPlaceholder';
import React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const Placeholder = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <View
        style={{
          backgroundColor: theme.colors.background,
          paddingTop:
            Platform.OS == 'android'
              ? heightPercentageToDP(5)
              : heightPercentageToDP(7),
        }}
      >
        <ImageCardPlaceholder />
        <ImageCardPlaceholder />
        <ImageCardPlaceholder />
        <ImageCardPlaceholder />
        <ImageCardPlaceholder />
      </View>
    </SafeAreaView>
  );
};
export default Placeholder;

import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useStyle } from './styles';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import images from 'app/config/images';
import { useTheme } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const Explore: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <FastImage source={images.explore.car} style={styles.car} />
        <Text style={styles.headerText}>{t('EXPERIENCE')}</Text>
        <Text style={styles.subheader}>{t('BEST WITH US')}</Text>
        <BlurView
          blurType="regular"
          blurAmount={1000}
          style={styles.searchView}
        >
          <FastImage
            source={images.bottomBar.search}
            tintColor={'white'}
            style={styles.searchIcon}
            resizeMode="contain"
          />

          <TextInput
            onChangeText={setSearchQuery}
            style={styles.search}
            value={searchQuery}
            placeholder="Search to Rent"
            placeholderTextColor={theme.colors.text}
          />
        </BlurView>
      </View>
    </SafeAreaView>
  );
};

export default Explore;

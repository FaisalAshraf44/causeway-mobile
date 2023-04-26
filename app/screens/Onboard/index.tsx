import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import React, { useState } from 'react';
import { LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { useStyle } from './styles';
import { completeFirstRun } from 'app/store/slice/userSlice';

const Onboard: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyle();
  const theme = useTheme();
  const [page, setPage] = useState(1);

  const imageSource = () => {
    return page == 1
      ? images.onBoard.page1
      : page == 2
      ? images.onBoard.page2
      : page == 3
      ? images.onBoard.page3
      : images.onBoard.page4;
  };

  const getTitle = () => {
    return page == 1
      ? 'Affordable'
      : page == 2
      ? 'Flexible'
      : page == 3
      ? '24/7 Avalability'
      : 'Causeway Guard';
  };

  const getParagraph = () => {
    return page == 1
      ? 'We want to help you spend less money on car hire and more on your holiday. We offer you the lowest rate possible on all vehicles so that you can make the most out of your trip'
      : page == 2
      ? 'Convenience is key, Skip the hassle of pick-up and let us bring the cars to you and enjoy our free delivery and pick-up services.'
      : page == 3
      ? 'Rent a car in the day or at night. On weekends or weekdays, at any time of the day. we are just one call away.'
      : "Drive with peace of mind, knowing you're covered by our top-rated safety insurance for damage and emergencies. Causeway helps out with 24/7 roadside assistance.";
  };

  const changePage = () => {
    if (page != 4) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setPage((prev) => prev + 1);
    } else {
      dispatch(completeFirstRun());
    }
  };

  const skipOrBack = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    if (page == 1) {
      //skip
      dispatch(completeFirstRun());
    } else {
      //back
      setPage((prev) => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      <FastImage
        source={imageSource()}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.heading}>{getTitle()}</Text>
      <Text style={styles.paragraph}>{getParagraph()}</Text>
      <View style={styles.dots}>
        <View style={page == 1 ? styles.longDot : styles.dot} />
        <View style={page == 2 ? styles.longDot : styles.dot} />
        <View style={page == 3 ? styles.longDot : styles.dot} />
        <View style={page == 4 ? styles.longDot : styles.dot} />
      </View>
      <View
        style={[
          styles.bottomBar,
          {
            paddingHorizontal: page != 4 ? widthPercentageToDP(10) : undefined,
            justifyContent: page != 4 ? 'space-between' : 'center',
          },
        ]}
      >
        {page != 4 ? (
          <TouchableOpacity onPress={skipOrBack}>
            <Text style={styles.skip}>{page == 1 ? 'Skip' : 'Back'}</Text>
          </TouchableOpacity>
        ) : null}

        <PrimaryButton
          withArrow={page != 4 ? true : false}
          title={page != 4 ? undefined : 'Get Started'}
          onPress={changePage}
          style={page != 4 ? styles.button : undefined}
        />
      </View>
    </View>
  );
};

export default Onboard;

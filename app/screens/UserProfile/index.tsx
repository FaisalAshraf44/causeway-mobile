import images from 'app/config/images';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useStyle } from './styles';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import getProfile from 'app/services/getProfile';
import { useDispatch, useSelector } from 'react-redux';
import Placeholder from './Placeholder';
const UserProfile: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const dispatch = useDispatch();
  const getProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await getProfile();
      if (response?.status == 200) {
        setData(response?.data);
      }
    } catch (err: any) {
      if (err?.response?.status == 401) {
        dispatch(enableSnackbar('Please sign in to continue'));
      } else {
        dispatch(enableSnackbar('Something went wrong'));
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    let subscribed = true;
    if (subscribed && isFocused) {
      getProfileData();
    }
    return () => {
      subscribed = false;
    };
  }, [isFocused]);
  const moment = require('moment');

  const joiningDate = moment(data?.createdAt).format('MMMM YYYY');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerShown: true,
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
      },
      headerTransparent: false,
    });
  }, []);
  if (isLoading) return <Placeholder />;
  return (
    <View style={styles.mainView}>
      <View style={styles.subView}>
        <View style={styles.profileView}>
          <FastImage
            resizeMode="contain"
            source={
              data?.photo
                ? { uri: data?.photo }
                : {
                    uri: 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
                  }
            }
            style={styles.profileImg}
          />
          <Text style={styles.nameText}>{data?.name}</Text>
          <Text style={styles.dateText}>Joined {joiningDate}</Text>
        </View>
        <View style={styles.lineOuterView}>
          <View style={styles.lineInnerView} />
        </View>
        <View style={[styles.profileView, styles.paddingTop]}>
          <FastImage
            resizeMode="contain"
            source={images.Profile.pen}
            style={styles.penImage}
          />
          <Text style={styles.subText}>
            Profiles with personal info and connected social media appear more
            trustworthy.
          </Text>
          <View style={[styles.paddingTop, styles.paddingBott]}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.readText}>Read more</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineOuterView}>
          <View style={styles.lineInnerView}></View>
        </View>
        <Text style={styles.titleText}>Verified Info</Text>
        <Text style={styles.titleSubText}>{data?.email}</Text>
        <Text style={styles.titleSubText}>Facebook</Text>
        <View style={styles.lineOuterView}>
          <View style={styles.lineInnerView}></View>
        </View>
        {/* <View style={[styles.rowContainer, styles.paddingTop]}>
          <FastImage
            source={images.Profile.heart}
            style={styles.heartImage}
            resizeMode="contain"
          />
          <Text style={[styles.titleSubText, styles.paddingHor]}>
            Your Favourites
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default UserProfile;

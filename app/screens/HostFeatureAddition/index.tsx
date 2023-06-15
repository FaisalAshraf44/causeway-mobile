import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import PrimaryButton from 'app/components/PrimaryButton';
import images from 'app/config/images';
import NavigationService from 'app/navigation/NavigationService';
import { enableSnackbar } from 'app/store/slice/snackbarSlice';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, Modal, Pressable, Text, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { useStyle } from './styles';

const HostFeatureAddition: React.FC = () => {
  const [selection, setSelection] = useState<any>([]);
  const styles = useStyle();
  const { t } = useTranslation();
  const goBack = () => NavigationService.goBack();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add a feature',
      headerStyle: {
        backgroundColor: theme.colors.glossyBlack,
      },
      headerLeft: () => {
        return (
          <Pressable
            onPress={goBack}
            style={{ paddingRight: widthPercentageToDP(3) }}
          >
            <AntDesign
              name={I18nManager.isRTL ? 'right' : 'left'}
              color={theme.colors.text}
              size={
                isTablet() ? widthPercentageToDP(4) : widthPercentageToDP(5)
              }
            />
          </Pressable>
        );
      },
      headerShown: true,
      headerTransparent: false,
      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regularFont,
      },
    });
  }, []);
  const submit = async () => {
    const data: any = { ...route?.params, features: selection };

    if (!data?.milage) data.milage = '';
    try {
      setIsLoading(true);
      const filename = Date.now().toString();

      storage()
        .ref(filename)
        .putFile(data?.image)
        .then(async (ref) => {
          if (ref?.state == 'success') {
            data.imageUrl = `https://firebasestorage.googleapis.com/v0/b/causway-8efd4.appspot.com/o/${filename}?alt=media&token=ddc686e5-5769-449f-86e9-3d1dc39835b7`;
          }

          await database().ref(`/hosts/${filename}`).set(data);
        })
        .finally(() => {
          setIsLoading(false);
          // navigation.dispatch(StackActions.pop(4));
          // setTimeout(() => {
          //   navigation.goBack();
          //   dispatch(
          //     enableSnackbar(
          //       'Thank you for subscribing to our host program. CausewWay team will contact you soon.'
          //     )
          //   );
          // }, 100);
          setShowSuccess(true);
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (err) {
      console.log('er', err);
      dispatch(enableSnackbar('Operation failed'));
    }
  };

  const continueToHome = () => {
    navigation.dispatch(StackActions.pop(4));
    setTimeout(() => {
      navigation.goBack();
      dispatch(
        enableSnackbar(
          'Thank you for subscribing to our host program. CausewWay team will contact you soon.'
        )
      );
    }, 100);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.subText}>Select your car features</Text>
        <View
          style={[
            styles.optionsubcontainer,
            { marginBottom: heightPercentageToDP(1) },
          ]}
        >
          <View style={styles.imgContainer}>
            <FastImage
              source={images.Host.airConditioner}
              resizeMode="contain"
              style={styles.Img}
            />
            <Text style={styles.name}>Air Conditioner</Text>
          </View>

          <Pressable
            style={styles.outerRadio}
            onPress={() => {
              const index = selection.findIndex((item: any) => {
                return item == 'Air Conditioner';
              });
              if (index >= 0) {
                const prevState = [...selection];
                prevState.splice(index, 1);
                setSelection(prevState);
              } else {
                const selected = 'Air Conditioner';
                const prevState = [...selection];
                prevState.push(selected);
                setSelection(prevState);
              }
            }}
          >
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection.findIndex((item: any) => {
                      return item == 'Air Conditioner';
                    }) >= 0
                      ? theme.colors.text
                      : undefined,
                  borderRadius:
                    selection.findIndex((item: any) => {
                      return item == 'Air Conditioner';
                    }) >= 0
                      ? widthPercentageToDP(10)
                      : 0,
                },
              ]}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.optionsubcontainer,
            { marginBottom: heightPercentageToDP(1) },
          ]}
        >
          <View style={styles.imgContainer}>
            <FastImage
              source={images.Host.bluetooth}
              resizeMode="contain"
              style={styles.Img}
            />
            <Text style={styles.name}>Bluetooth</Text>
          </View>

          <Pressable
            style={styles.outerRadio}
            onPress={() => {
              const index = selection.findIndex((item: any) => {
                return item == 'Bluetooth';
              });
              if (index >= 0) {
                const prevState = [...selection];
                prevState.splice(index, 1);
                setSelection(prevState);
              } else {
                const selected = 'Bluetooth';
                const prevState = [...selection];
                prevState.push(selected);
                setSelection(prevState);
              }
            }}
          >
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection.findIndex((item: any) => {
                      return item == 'Bluetooth';
                    }) >= 0
                      ? theme.colors.text
                      : undefined,
                  borderRadius:
                    selection.findIndex((item: any) => {
                      return item == 'Bluetooth';
                    }) >= 0
                      ? widthPercentageToDP(10)
                      : 0,
                },
              ]}
            />
          </Pressable>
        </View>

        <View
          style={[
            styles.optionsubcontainer,
            { marginBottom: heightPercentageToDP(1) },
          ]}
        >
          <View style={styles.imgContainer}>
            <FastImage
              source={images.Host.video}
              resizeMode="contain"
              style={styles.Img}
            />
            <Text style={styles.name}>
              Dash Camera / Mobile Digital Video Recording{' '}
            </Text>
          </View>

          <Pressable
            style={styles.outerRadio}
            onPress={() => {
              const index = selection.findIndex((item: any) => {
                return item == 'Camera';
              });
              if (index >= 0) {
                const prevState = [...selection];
                prevState.splice(index, 1);
                setSelection(prevState);
              } else {
                const selected = 'Camera';
                const prevState = [...selection];
                prevState.push(selected);
                setSelection(prevState);
              }
            }}
          >
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection.findIndex((item: any) => {
                      return item == 'Camera';
                    }) >= 0
                      ? theme.colors.text
                      : undefined,
                  borderRadius:
                    selection.findIndex((item: any) => {
                      return item == 'Camera';
                    }) >= 0
                      ? widthPercentageToDP(10)
                      : 0,
                },
              ]}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.optionsubcontainer,
            { marginBottom: heightPercentageToDP(1) },
          ]}
        >
          <View style={styles.imgContainer}>
            <FastImage
              source={images.Host.parkingSensor}
              resizeMode="contain"
              style={styles.Img}
            />
            <Text style={styles.name}>Parking Sensor</Text>
          </View>

          <Pressable
            style={styles.outerRadio}
            onPress={() => {
              const index = selection.findIndex((item: any) => {
                return item == 'Parking Sensor';
              });
              if (index >= 0) {
                const prevState = [...selection];
                prevState.splice(index, 1);
                setSelection(prevState);
              } else {
                const selected = 'Parking Sensor';
                const prevState = [...selection];
                prevState.push(selected);
                setSelection(prevState);
              }
            }}
          >
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection.findIndex((item: any) => {
                      return item == 'Parking Sensor';
                    }) >= 0
                      ? theme.colors.text
                      : undefined,
                  borderRadius:
                    selection.findIndex((item: any) => {
                      return item == 'Parking Sensor';
                    }) >= 0
                      ? widthPercentageToDP(10)
                      : 0,
                },
              ]}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.optionsubcontainer,
            { marginBottom: heightPercentageToDP(1) },
          ]}
        >
          <View style={styles.imgContainer}>
            <FastImage
              source={images.Host.toolKit}
              resizeMode="contain"
              style={styles.Img}
            />
            <Text style={styles.name}>Emergency Tool Kit</Text>
          </View>

          <Pressable
            style={styles.outerRadio}
            onPress={() => {
              const index = selection.findIndex((item: any) => {
                return item == 'Emergency Toolkit';
              });
              if (index >= 0) {
                const prevState = [...selection];
                prevState.splice(index, 1);
                setSelection(prevState);
              } else {
                const selected = 'Emergency Toolkit';
                const prevState = [...selection];
                prevState.push(selected);
                setSelection(prevState);
              }
            }}
          >
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection.findIndex((item: any) => {
                      return item == 'Emergency Toolkit';
                    }) >= 0
                      ? theme.colors.text
                      : undefined,
                  borderRadius:
                    selection.findIndex((item: any) => {
                      return item == 'Emergency Toolkit';
                    }) >= 0
                      ? widthPercentageToDP(10)
                      : 0,
                },
              ]}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.optionsubcontainer,
            { marginBottom: heightPercentageToDP(1) },
          ]}
        >
          <View style={styles.imgContainer}>
            <FastImage
              source={images.Host.chargingCable}
              resizeMode="contain"
              style={styles.Img}
            />
            <Text style={styles.name}>Mobile Charging Cables</Text>
          </View>

          <Pressable
            style={styles.outerRadio}
            onPress={() => {
              const index = selection.findIndex((item: any) => {
                return item == 'Mobile Charging Cables';
              });
              if (index >= 0) {
                const prevState = [...selection];
                prevState.splice(index, 1);
                setSelection(prevState);
              } else {
                const selected = 'Mobile Charging Cables';
                const prevState = [...selection];
                prevState.push(selected);
                setSelection(prevState);
              }
            }}
          >
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection.findIndex((item: any) => {
                      return item == 'Mobile Charging Cables';
                    }) >= 0
                      ? theme.colors.text
                      : undefined,
                  borderRadius:
                    selection.findIndex((item: any) => {
                      return item == 'Mobile Charging Cables';
                    }) >= 0
                      ? widthPercentageToDP(10)
                      : 0,
                },
              ]}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.optionsubcontainer,
            { marginBottom: heightPercentageToDP(1) },
          ]}
        >
          <View style={styles.imgContainer}>
            <FastImage
              source={images.Host.auxCable}
              resizeMode="contain"
              style={styles.Img}
            />
            <Text style={styles.name}>USB & AUX Input</Text>
          </View>

          <Pressable
            style={styles.outerRadio}
            onPress={() => {
              const index = selection.findIndex((item: any) => {
                return item == 'USB and AUX Input';
              });
              if (index >= 0) {
                const prevState = [...selection];
                prevState.splice(index, 1);
                setSelection(prevState);
              } else {
                const selected = 'USB and AUX Input';
                const prevState = [...selection];
                prevState.push(selected);
                setSelection(prevState);
              }
            }}
          >
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection.findIndex((item: any) => {
                      return item == 'USB and AUX Input';
                    }) >= 0
                      ? theme.colors.text
                      : undefined,
                  borderRadius:
                    selection.findIndex((item: any) => {
                      return item == 'USB and AUX Input';
                    }) >= 0
                      ? widthPercentageToDP(10)
                      : 0,
                },
              ]}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.optionsubcontainer,
            { marginBottom: heightPercentageToDP(1) },
          ]}
        >
          <View style={styles.imgContainer}>
            <FastImage
              source={images.Host.gps}
              resizeMode="contain"
              style={styles.Img}
            />
            <Text style={styles.name}>GPS</Text>
          </View>

          <Pressable
            style={styles.outerRadio}
            onPress={() => {
              const index = selection.findIndex((item: any) => {
                return item == 'GPS';
              });
              if (index >= 0) {
                const prevState = [...selection];
                prevState.splice(index, 1);
                setSelection(prevState);
              } else {
                const selected = 'GPS';
                const prevState = [...selection];
                prevState.push(selected);
                setSelection(prevState);
              }
            }}
          >
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection.findIndex((item: any) => {
                      return item == 'GPS';
                    }) >= 0
                      ? theme.colors.text
                      : undefined,
                  borderRadius:
                    selection.findIndex((item: any) => {
                      return item == 'GPS';
                    }) >= 0
                      ? widthPercentageToDP(10)
                      : 0,
                },
              ]}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.optionsubcontainer,
            { marginBottom: heightPercentageToDP(1) },
          ]}
        >
          <View style={styles.imgContainer}>
            <FastImage
              source={images.Host.reverseCamera}
              resizeMode="contain"
              style={styles.Img}
            />
            <Text style={styles.name}>Reverse Camera</Text>
          </View>

          <Pressable
            style={styles.outerRadio}
            onPress={() => {
              const index = selection.findIndex((item: any) => {
                return item == 'Reverse Camera';
              });
              if (index >= 0) {
                const prevState = [...selection];
                prevState.splice(index, 1);
                setSelection(prevState);
              } else {
                const selected = 'Reverse Camera';
                const prevState = [...selection];
                prevState.push(selected);
                setSelection(prevState);
              }
            }}
          >
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection.findIndex((item: any) => {
                      return item == 'Reverse Camera';
                    }) >= 0
                      ? theme.colors.text
                      : undefined,
                  borderRadius:
                    selection.findIndex((item: any) => {
                      return item == 'Reverse Camera';
                    }) >= 0
                      ? widthPercentageToDP(10)
                      : 0,
                },
              ]}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.optionsubcontainer,
            { marginBottom: heightPercentageToDP(1) },
          ]}
        >
          <View style={styles.imgContainer}>
            <FastImage
              source={images.Host.firstAid}
              resizeMode="contain"
              style={styles.Img}
            />
            <Text style={styles.name}>First Aid Kit</Text>
          </View>

          <Pressable
            style={styles.outerRadio}
            onPress={() => {
              const index = selection.findIndex((item: any) => {
                return item == 'First Aid Kit';
              });
              if (index >= 0) {
                const prevState = [...selection];
                prevState.splice(index, 1);
                setSelection(prevState);
              } else {
                const selected = 'First Aid Kit';
                const prevState = [...selection];
                prevState.push(selected);
                setSelection(prevState);
              }
            }}
          >
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection.findIndex((item: any) => {
                      return item == 'First Aid Kit';
                    }) >= 0
                      ? theme.colors.text
                      : undefined,
                  borderRadius:
                    selection.findIndex((item: any) => {
                      return item == 'First Aid Kit';
                    }) >= 0
                      ? widthPercentageToDP(10)
                      : 0,
                },
              ]}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.optionsubcontainer,
            { marginBottom: heightPercentageToDP(1) },
          ]}
        >
          <View style={styles.imgContainer}>
            <FastImage
              source={images.Host.phoneHolder}
              resizeMode="contain"
              style={styles.Img}
            />
            <Text style={styles.name}>Phone Holder / Mount</Text>
          </View>

          <Pressable
            style={styles.outerRadio}
            onPress={() => {
              const index = selection.findIndex((item: any) => {
                return item == 'Phone Holder';
              });
              if (index >= 0) {
                const prevState = [...selection];
                prevState.splice(index, 1);
                setSelection(prevState);
              } else {
                const selected = 'Phone Holder';
                const prevState = [...selection];
                prevState.push(selected);
                setSelection(prevState);
              }
            }}
          >
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection.findIndex((item: any) => {
                      return item == 'Phone Holder';
                    }) >= 0
                      ? theme.colors.text
                      : undefined,
                  borderRadius:
                    selection.findIndex((item: any) => {
                      return item == 'Phone Holder';
                    }) >= 0
                      ? widthPercentageToDP(10)
                      : 0,
                },
              ]}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.optionsubcontainer,
            { marginBottom: heightPercentageToDP(1) },
          ]}
        >
          <View style={styles.imgContainer}>
            <FastImage
              source={images.Host.tissues}
              resizeMode="contain"
              style={styles.Img}
            />
            <Text style={styles.name}>Tissues</Text>
          </View>

          <Pressable
            style={styles.outerRadio}
            onPress={() => {
              const index = selection.findIndex((item: any) => {
                return item == 'Tissues';
              });
              if (index >= 0) {
                const prevState = [...selection];
                prevState.splice(index, 1);
                setSelection(prevState);
              } else {
                const selected = 'Tissues';
                const prevState = [...selection];
                prevState.push(selected);
                setSelection(prevState);
              }
            }}
          >
            <View
              style={[
                styles.innerRadio,
                {
                  backgroundColor:
                    selection.findIndex((item: any) => {
                      return item == 'Tissues';
                    }) >= 0
                      ? theme.colors.text
                      : undefined,
                  borderRadius:
                    selection.findIndex((item: any) => {
                      return item == 'Tissues';
                    }) >= 0
                      ? widthPercentageToDP(10)
                      : 0,
                },
              ]}
            />
          </Pressable>
        </View>
        <PrimaryButton
          title="Submit"
          style={styles.button}
          animating={isLoading}
          disabledWhileAnimating
          onPress={submit}
        />
      </View>
      <Modal visible={showSuccess} transparent style={styles.modal}>
        <View style={styles.subcontainerModal}>
          <AntDesign
            name="checkcircleo"
            size={widthPercentageToDP(10)}
            color={theme.colors.text}
          />
          <Text
            style={[
              styles.subText,
              {
                fontSize: widthPercentageToDP(7),
                marginTop: heightPercentageToDP(1),
              },
            ]}
          >
            Success
          </Text>
          <Text
            style={[
              styles.subText,
              {
                marginTop: heightPercentageToDP(1),
                textAlign: 'center',
              },
            ]}
          >
            Thank you for subscribing to the host program. The team will get
            back to you soon.
          </Text>
          <PrimaryButton
            title="Continue"
            style={styles.continue}
            animating={isLoading}
            disabledWhileAnimating
            onPress={continueToHome}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HostFeatureAddition;

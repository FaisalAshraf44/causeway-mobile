import images from 'app/config/images';
import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useStyle } from './style';
import { Props } from './types';
const ConfirmationCard: React.FC<Props> = (props) => {
  const styles = useStyle();

  return (
    <View style={[styles.mainView, props.style]}>
      <View style={styles.subView}>
        <View style={styles.rowContainer}>
          <FastImage
            resizeMode="stretch"
            source={images.Confirm.car}
            style={styles.carImage}
          />
          <View style={styles.textContainer}>
            <View
              style={[
                styles.nameModelContainer,
                {
                  width: props?.width ? props?.width : widthPercentageToDP(77),
                },
              ]}
            >
              <Text style={styles.nameText}>{props?.carName}</Text>
              <Text style={styles.modelText}>{props?.carModel}jk</Text>
            </View>
            <Text style={styles.typeText}>{props?.type}</Text>
          </View>
        </View>
        <View style={styles.lineOuterView}>
          <View style={styles.lineInnerView}></View>
        </View>
        <View style={styles.iconView}>
          <View style={styles.iconSubContainer}>
            {props?.features && props?.features?.length > 0 ? (
              <>
                {props?.features?.map((item: any) => {
                  return (
                    <FastImage
                      key={'item_' + item}
                      resizeMode="contain"
                      source={
                        item == 'Bluetooth'
                          ? images.features.Bluetooth
                          : item == 'Parking Sensor'
                          ? images.features.ParkingSensor
                          : item == 'Air Conditioner'
                          ? images.features.AirConditioner
                          : item?.includes('First')
                          ? images.features.FirstAidKit
                          : item?.includes('Dash')
                          ? images.features.DashCamera
                          : item?.includes('Emergency')
                          ? images.features.EmergencyKit
                          : item?.includes('GPS')
                          ? images.features?.GPS
                          : item?.includes('Charging')
                          ? images.features.MobileChargingCable
                          : item?.includes('Holder')
                          ? images.features.PhoneHolder
                          : item?.includes('Reverse')
                          ? images.features.ReverseCamera
                          : item?.includes('Tissues')
                          ? images.features.Tissues
                          : item?.includes('Umbrella')
                          ? images.features.Umbrella
                          : item?.includes('USB')
                          ? images.features.USB
                          : item?.includes('Water')
                          ? images.features.WaterBottles
                          : ''
                      }
                      style={styles.icon}
                    />
                  );
                })}
              </>
            ) : (
              <View style={styles.space} />
            )}
          </View>
          {/* <Text style={styles.viewAllText}>View All</Text> */}
        </View>
        <View style={styles.textView}>
          <Text style={styles.viewAllText}>Schedule</Text>
          <Text style={styles.viewAllText}>Total Fair</Text>
        </View>
        <View>
          <View style={styles.dateView}>
            <Text style={styles.dateText}>{props?.startDate}</Text>
            <Text style={styles.priceText}>{props?.totalFair}</Text>
          </View>
          <Text style={styles.dateText}>{props?.endDate}</Text>
        </View>
      </View>
    </View>
  );
};
export default ConfirmationCard;

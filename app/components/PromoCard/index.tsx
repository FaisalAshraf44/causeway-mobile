import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useStyle } from './style';
import { Props } from './types';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const PromoCard: React.FC<Props> = (props) => {
  const styles = useStyle();
  const theme = useTheme();

  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{props?.title}</Text>
      <Text style={styles.description}>{props?.description}</Text>
      <Text style={styles.description}>Expires</Text>
      <Text style={[styles.title, { fontSize: widthPercentageToDP(4) }]}>
        {props?.expiry}
      </Text>
      <View style={styles.row}>
        {props?.type ? <Text style={[styles.free]}>{props?.type}</Text> : null}
        <Pressable style={styles.applyContainer} onPress={props.onPressApply}>
          <Text style={styles.apply}>Apply</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default PromoCard;

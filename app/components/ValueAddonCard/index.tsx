import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useStyle } from './style';
import { Props } from './types';

const ValueAddonCard: React.FC<Props> = (props) => {
  const [checked, setChecked] = useState(false);
  const theme = useTheme();
  const styles = useStyle();

  return (
    <View style={styles.optionMainContainer}>
      <View style={styles.optionSubContainer}>
        <Pressable
          style={styles.outerRadio}
          onPress={() => {
            if (checked) {
              setChecked(false);
              props.returnPrice({ price: props?.price, type: 'minus' });
            } else {
              setChecked(true);
              props.returnPrice({
                price: props?.price,
                type: 'plus',
              });
            }
          }}
        >
          <View
            style={[
              styles.innerRadio,
              {
                backgroundColor: checked ? theme.colors.text : undefined,
                borderRadius: checked ? widthPercentageToDP(10) : 0,
              },
            ]}
          ></View>
        </Pressable>
        <Text style={styles.nameText}>{props?.name}</Text>
      </View>
      <Text style={styles.priceText}>{'+' + props?.price + 'Rm/Day'}</Text>
    </View>
  );
};
export default ValueAddonCard;

import React, { useEffect, useState } from 'react';
import { LayoutAnimation, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useStyle } from './style';
import { Props } from './types';

const InsuranceCard: React.FC<Props> = (props) => {
  const [checked, setChecked] = useState(props?.checked);
  const theme = useTheme();
  const styles = useStyle();

  useEffect(() => {
    setChecked(props?.checked);
  }, [props?.checked]);

  return (
    <Pressable
      style={[styles.main, props.style]}
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setChecked((prev) => !prev);
        props?.returnChecked({ id: props?.id, val: true, checked: !checked });
      }}
    >
      <View style={styles.subContainer}>
        <View style={styles.cardsubContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.outerRadio}>
              <View
                style={[
                  styles.innerRadio,
                  {
                    backgroundColor:
                      checked && props?.checked ? theme.colors.text : undefined,
                    borderRadius:
                      checked && props?.checked ? widthPercentageToDP(10) : 0,
                  },
                ]}
              />
            </View>
            <Text style={styles.nametext}>{props?.name}</Text>
          </View>
          <View>
            {props?.isFree || props?.isRecommended ? (
              <Text
                style={[
                  styles.free,
                  {
                    color: props?.isFree ? '#EE2F3F' : '#178173',
                    backgroundColor: props?.isFree ? '#FFC5CA' : '#E8FBFE',
                  },
                ]}
              >
                {props?.isFree ? 'Free' : 'Recommended'}
              </Text>
            ) : (
              <Text style={[styles.pricetext]}>{props?.price}</Text>
            )}
          </View>
        </View>
        <View>
          <Text style={[styles.pricetext]}>
            {props?.isFree || props?.isRecommended ? props?.price : ''}
          </Text>
        </View>
        {checked && props?.checked ? (
          <View>
            <Text style={styles.discriptioncheader}>This is option Cover</Text>
            <Text
              style={styles.discriptiontext}
            >{`\u2022 ${props.description}`}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};
export default InsuranceCard;

import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  title?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  animating?: boolean;
  textStyle?: any;
  icon?: any;
}

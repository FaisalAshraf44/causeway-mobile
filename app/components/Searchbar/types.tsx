import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  onChangeText?: (key?: string) => void;
  value?: string;
  styles?: any;
  onFocus?: () => void;
  placeholder?: string;
  placeholderColor?: string;
  onPress?: () => void;
}

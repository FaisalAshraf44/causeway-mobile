import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  onChangeText: (key: string) => void;
  value?: string;
  styles?: any;
  onFocus?: () => void;
  placeholder?: string;
  dummy?: boolean;
  placeholderColor?: string;
  onPress?: () => void;
  rightIcon?: any;
}

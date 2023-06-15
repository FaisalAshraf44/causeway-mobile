import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  carName?: string;
  type?: string;
  carModel?: string;
  startDate?: string;
  endDate?: string;
  style?: StyleProp<ViewStyle>;
  totalFair?: string;
  width?: number;
  features?: any;
}

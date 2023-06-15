import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  id?: number;
  name?: string;
  description?: string;
  price?: string;
  style?: StyleProp<ViewStyle>;
  checked?: boolean;
  returnChecked: (id: any) => void;
  isFree?: boolean;
  isRecommended?: boolean;
}

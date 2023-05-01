import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  name?: string;
  distance?:string,
  rating?:string,
  description?:string,
  price?:string,
  style?:StyleProp<ViewStyle>
}

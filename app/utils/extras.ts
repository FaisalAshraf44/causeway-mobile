import DeviceInfo from 'react-native-device-info';

export const isTablet = () => {
  return DeviceInfo.isTablet();
};
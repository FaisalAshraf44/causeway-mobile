import DeviceInfo from 'react-native-device-info';
import { store } from '../store';
import { onTempLogout } from 'app/store/slice/loadingSlice';
import { onLogout } from 'app/store/slice/userSlice';

export const isTablet = () => {
  return DeviceInfo.isTablet();
};

export const getUserDetails = () => {
  if (store.getState().user.user) return store.getState().user.user;
  else if (store.getState().loading.user) return store.getState().user.user;
  else return undefined;
};

export const signOut = () => {
  store.dispatch(onTempLogout());
  store.dispatch(onLogout());
};

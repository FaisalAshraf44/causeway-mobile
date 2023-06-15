import { store } from '../store';
import ApiConfig from 'app/config/api-config';
import { apiClient } from './alternativeClient';

export default function getFavorites() {
  const user = store.getState().user.user;
  return apiClient.get(ApiConfig.FAVORITE);
}

import { store } from '../store';
import ApiConfig from 'app/config/api-config';
import { apiClient } from './alternativeClient';

export default function patchFavorites(body: any) {
  const user = store.getState().user.user;
  return apiClient.patch(ApiConfig.FAVORITE, body);
}

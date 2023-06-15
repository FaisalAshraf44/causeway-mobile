import { store } from '../store';
import ApiConfig from 'app/config/api-config';
import { apiClient } from './alternativeClient';

export default function deleteFavorites(body: any) {
  const user = store.getState().user.user;
  return apiClient.delete(ApiConfig.FAVORITE, { data: body });
}

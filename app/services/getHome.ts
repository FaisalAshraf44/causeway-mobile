import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function getHome() {
  return apiClient.get(ApiConfig.HOME);
}

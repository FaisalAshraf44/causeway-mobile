import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function getProfile() {
  return apiClient.get(ApiConfig.PROFILE);
}

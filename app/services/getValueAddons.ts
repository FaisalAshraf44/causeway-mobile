import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function getValueAddons(body?: any) {
  return apiClient.post(ApiConfig.VALUE_ADDONS, body ? body : {});
}

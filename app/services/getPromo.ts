import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function getPromo(body?: any) {
  return apiClient.post(ApiConfig.PROMO, body ? body : {});
}

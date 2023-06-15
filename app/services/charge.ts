import { apiClient } from 'app/services/alternativeClient';
import ApiConfig from 'app/config/api-config';

export default function charge(body?: any) {
  return apiClient.post(ApiConfig.PAYMENT_CHARGE, body ? body : {});
}

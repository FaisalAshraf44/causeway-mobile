import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function getInsurance(body?: any) {
  return apiClient.post(ApiConfig.INSURANCE, body ? body : {});
}

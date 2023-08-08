import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function getCarDetail(id: string) {
  return apiClient.get(ApiConfig.CAR_DETAIL + id)
}
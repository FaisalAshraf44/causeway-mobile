import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function filteredSearch() {
  return apiClient.post(ApiConfig.HOME);
}

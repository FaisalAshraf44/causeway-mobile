import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function filteredCarListing(body: any) {
  return apiClient.post(ApiConfig.HOME, body ? body : {});
}

import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function getMessages() {
  return apiClient.get(ApiConfig.GET_MESSAGES);
}

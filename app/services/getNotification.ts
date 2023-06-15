import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function getNotification(body?: any) {
  return apiClient.post(ApiConfig.NOTIFICATIONS, body ? body : {});
}

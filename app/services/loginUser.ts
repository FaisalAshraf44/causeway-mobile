import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function loginUser(email: string, password: string) {
  return apiClient.post('ac', { email, password });
}

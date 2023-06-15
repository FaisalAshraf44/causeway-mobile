import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function forgotPassword(email: string) {
  return apiClient.post(ApiConfig.FORGOT_PASSWORD, {
    email,
  });
}

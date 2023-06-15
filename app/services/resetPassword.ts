import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function resetPassword(
  resetPasswordToken: string,
  password: string
) {
  return apiClient.post(ApiConfig.RESET_PASSWORD, {
    resetPasswordToken,
    password,
  });
}

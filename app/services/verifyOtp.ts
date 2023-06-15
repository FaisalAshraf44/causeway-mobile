import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function verifyOtp(email: string, otp: string) {
  return apiClient.post(ApiConfig.VERIFY_OTP, { email, otp });
}

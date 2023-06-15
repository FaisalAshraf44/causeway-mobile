import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function signUpUser(
  name: string,
  email: string,
  password: string,
  phoneNumber: string
) {
  return apiClient.post(ApiConfig.SIGN_UP, {
    email,
    password,
    phoneNumber,
    name,
  });
}

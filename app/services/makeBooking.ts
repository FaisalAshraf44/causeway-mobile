import ApiConfig from 'app/config/api-config';
import { apiClient } from 'app/services/client';

export default function makeBooking(body: any) {
  return apiClient.post(ApiConfig.MAKE_BOOKING, body);
}

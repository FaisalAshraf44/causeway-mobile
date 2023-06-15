import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';
import { store } from '../store';

export default function getBookings() {
  const user = store.getState().user.user;
  return apiClient.post(ApiConfig.BOOKINGS, {
    filters: {
      user: user?.id,
    },
  });
}

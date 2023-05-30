import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function getHome(
  recordsToDisplay: number,
  skip: number,
  body?: any
) {
  return apiClient.post(
    ApiConfig.HOME + `?limit=${recordsToDisplay}&skip=${skip}&order=1`,
    body ? body : {}
  );
}

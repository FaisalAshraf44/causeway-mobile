import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function getBlogs(
  recordsToDisplay: number,
  skip: number,
  body?: any
) {
  return apiClient.post(
    ApiConfig.BLOG + `?limit=${recordsToDisplay}&skip=${skip}&order=1`,
    body ? body : {}
  );
}

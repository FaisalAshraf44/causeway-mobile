import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function getLocations(lat: number, lng: number) {
  return apiClient.get(
    ApiConfig.LOCATIONS + `currentLocationlong=${lng}&currentLocationlat=${lat}`
  );
}

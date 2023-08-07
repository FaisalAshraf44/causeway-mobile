import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default async function getCarDetail(id: string) {
  try {
    const response = await apiClient.get(ApiConfig.CAR_DETAIL + id);
    return response.data;
  } catch (error) {
    console.error('Error while fetching car detail:', error);
    throw error; // Propagate the error to the calling function
  }  
}

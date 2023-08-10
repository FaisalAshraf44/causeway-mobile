import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function updateInfo(
  name: string,
  phoneNumber: string,
  photo: string,
  license: {
    name: string,
    country: string,
    licenseNumber: string,
    driverLicenseFrontPhoto: string,
    driverLicenseBackPhoto: string,
    passportOrICFrontPhoto: string,
    passportOrICBackPhoto: string
  },
  
) {
  const requestData = {
    name,
    phoneNumber,
    photo,
    license,
    
  };

  return apiClient.post(ApiConfig.USER_INFO, requestData);
}

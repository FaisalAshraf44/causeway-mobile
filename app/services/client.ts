import axios from 'axios';
import Config from 'react-native-config';

const apiClient = axios.create({
  baseURL: Config.BASE_URL,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiClient.interceptors.request.use(async function (config) {
  console.log(
    'apiConfig',
    `${config?.baseURL}${config.url}`,
    config?.params ? config?.params : config?.data
  );
  return config;
});

export { apiClient };

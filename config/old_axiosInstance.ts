// /config/axiosInstance.ts
import axios from 'axios';
import TokenManager from '../managers/TokenManager';
import { API_BASE_URL } from './api';

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    //console.log(`✅ [${response.config.method?.toUpperCase()}] ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;
    console.error(`❌ [${error.config?.method?.toUpperCase()}] ${url} — ${status}`, error.response?.data);
    return Promise.reject(error);
  }
);


instance.interceptors.request.use(async (config) => {
  if (config.url?.includes('/auth/token/refresh')) {

    const [deviceId, tenantId] = await Promise.all([
      TokenManager.getDeviceId(),
      TokenManager.getTenantId(),
    ]);

    if (deviceId) config.headers['x-device-id'] = deviceId;
    if (tenantId) config.headers['x-tenant-id'] = tenantId;
    
    return config;
  }

  const [accessToken, deviceId, tenantId] = await Promise.all([
    TokenManager.getAccessToken(),
    TokenManager.getDeviceId(),
    TokenManager.getTenantId(),
  ]);

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  if (deviceId) config.headers['x-device-id'] = deviceId;
  if (tenantId) config.headers['x-tenant-id'] = tenantId;

  return config;
});


instance.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshToken = await TokenManager.getRefreshToken();

    if (refreshToken) {
      try {
        const response = await instance.post('/auth/token/refresh'); // ✅ uses cookie


        const newAccessToken = response.data?.accessToken;
        const newRefreshToken = response.data?.refreshToken;

        if (newAccessToken && newRefreshToken) {
          await TokenManager.setAccessToken(newAccessToken);
          await TokenManager.setRefreshToken(newRefreshToken);

          // retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        await TokenManager.logout(); // optional: force logout if refresh fails
      }
    }
  }

  return Promise.reject(error);
});

export default instance;

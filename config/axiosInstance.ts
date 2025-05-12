import axios from 'axios';
import TokenManager from '../managers/TokenManager';
import { API_BASE_URL } from './api';

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ needed to send refresh token cookie
});

// ✅ Standard response logging
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;
    console.error(`❌ [${error.config?.method?.toUpperCase()}] ${url} — ${status}`, error.response?.data);
    return Promise.reject(error);
  }
);

// ✅ Attach auth headers
instance.interceptors.request.use(async (config) => {
  const isRefresh = config.url?.includes('/auth/token/refresh');

  const [accessToken, deviceId, tenantId] = await Promise.all([
    isRefresh ? null : TokenManager.getAccessToken(),
    TokenManager.getDeviceId(),
    TokenManager.getTenantId(),
  ]);
  
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  if (deviceId) config.headers['x-device-id'] = deviceId;
  if (tenantId) config.headers['x-tenant-id'] = tenantId;

  return config;
});

// ✅ Retry on 401 using refresh token (from cookie)
instance.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;

  const isRefreshEndpoint = originalRequest.url?.includes('/auth/token/refresh');


  if (error.response?.status === 401 && !originalRequest._retry && !isRefreshEndpoint) {
    
    originalRequest._retry = true;

    try {
      const response = await instance.post('/auth/token/refresh'); // ✅ from cookie

      const newAccessToken = response.data?.accessToken;
      const newRefreshToken = response.data?.refreshToken;

      if (newAccessToken && newRefreshToken) {
        await TokenManager.setAccessToken(newAccessToken);
        await TokenManager.setRefreshToken(newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      }
    } catch (refreshError) {
      await TokenManager.logout(); // optional: force logout
    }
  }

  return Promise.reject(error);
});

export default instance;

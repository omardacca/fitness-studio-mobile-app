import 'react-native-get-random-values';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';
import { TENANT_ID } from '../config/tenant';

const KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  DEVICE_ID: 'deviceId',
  TENANT_ID: 'tenantId',
};

const TokenManager = {
  // 🔐 ACCESS TOKEN
  getAccessToken: async () => await SecureStore.getItemAsync(KEYS.ACCESS_TOKEN),
  setAccessToken: async (token: string) => await SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, token),
  removeAccessToken: async () => await SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),

  // 🔁 REFRESH TOKEN
  getRefreshToken: async () => await SecureStore.getItemAsync(KEYS.REFRESH_TOKEN),
  setRefreshToken: async (token: string) => await SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, token),
  removeRefreshToken: async () => await SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),

  // 📱 DEVICE ID
  getDeviceId: async (): Promise<string> => {
    let id = await SecureStore.getItemAsync(KEYS.DEVICE_ID);
    if (!id) {
      id = uuidv4();
      await SecureStore.setItemAsync(KEYS.DEVICE_ID, id);
    }
    return id;
  },

  // 🏢 TENANT ID
  getTenantId: async (): Promise<string> => {
    let tenantId = await SecureStore.getItemAsync(KEYS.TENANT_ID);
    if (!tenantId) {
      // console.log(`Tenant not found in storage. Setting to default: ${TENANT_ID}`);
      tenantId = TENANT_ID;
      await SecureStore.setItemAsync(KEYS.TENANT_ID, tenantId);
    }
    return tenantId;
  },
  setTenantId: async (id: string) => await SecureStore.setItemAsync(KEYS.TENANT_ID, id),
  removeTenantId: async () => await SecureStore.deleteItemAsync(KEYS.TENANT_ID),

  // 🚪 Logout (Clear all)
  logout: async () => {
    await Promise.all([
      TokenManager.removeAccessToken(),
      TokenManager.removeRefreshToken(),
      TokenManager.removeTenantId(),
    ]);
  },
};

export default TokenManager;

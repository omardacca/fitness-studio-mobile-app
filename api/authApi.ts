import axios from '@/config/axiosInstance';
import TokenManager from '@/managers/TokenManager';
import { 
  SendOTPRequest, 
  VerifyOTPRequest, 
  VerifyOTPResponse, 
  UserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse
} from "@/types/auth";
import { handleApiResponse } from '@/utils/handleApiResponse';

interface SendOTPData {
  sessionId: string;
}

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export async function requestOTP({ phoneNumber }: SendOTPRequest) {
  return handleApiResponse<SendOTPData>(
    axios.post('auth/otp', { phoneNumber })
  );
}


export async function verifyOTPCall({ phoneNumber, otp }: VerifyOTPRequest) {
  const result = await handleApiResponse<VerifyOTPResponse>(
    axios.post('/auth/otp/verification', {
      phoneNumber,
      otp,
    })
  );

  if (result.success && result.data?.accessToken) {
    // Save access token in SecureStore
    await TokenManager.setAccessToken(result.data.accessToken);

    // NOTE: Refresh token is in the HttpOnly cookie (not accessible from JS)
    // No need to store it manually unless backend exposes it differently

    // Tenant/device IDs are already handled in `TokenManager.getTenantId()` and `.getDeviceId()`
  }

  return result;
}

export async function getUserProfile() {
  return handleApiResponse<UserProfileResponse | null>(
    axios.get('/users/profile')
  );
}


// ✅ **4. Logout**
export async function logout(): Promise<{ success: boolean }> {
  await delay(500);
  return { success: true };
}

export async function updateUserProfile(data: UpdateUserProfileRequest) {
  const result = await handleApiResponse<UpdateUserProfileResponse>(
    axios.patch('/auth/users/me', data)
  );

  if (result.success && result.data?.accessToken) {
    await TokenManager.setAccessToken(result.data.accessToken);
  }

  return result;
}
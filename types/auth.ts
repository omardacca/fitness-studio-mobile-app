export interface SendOTPRequest {
  phoneNumber: string;
}

export interface SendOTPResponse {
  sessionId: string;
  success: boolean;
}

// /types/auth.ts (optional)
export interface VerifyOTPRequest {
  phoneNumber: string;
  otp: string;
}

export interface VerifyOTPResponse {
  accessToken: string;
  user: {
    phoneNumber: string;
    fullName: string;
    role: string;
    isIncomplete: boolean;
  };
}


export interface FetchUserProfileResponse {
  fullName: string;
  phoneNumber: string;
}

// /types/auth.ts
export interface UpdateUserProfileRequest {
  fullName: string;
}

export interface UpdateUserProfileResponse {
  accessToken: string;
  user: {
    phoneNumber: string;
    fullName: string;
    role: string;
    isIncomplete: boolean;
  };
}

export interface UserProfileResponse {
  phoneNumber: string;
  fullName: string;
  role: string;
  isIncomplete: boolean;
}
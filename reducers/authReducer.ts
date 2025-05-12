import { UserProfileResponse } from "@/types/auth";

export interface AuthState {
  isAuthenticated: boolean | null;
  user: UserProfileResponse | null;
  accessToken: string | null;
  sessionId: string | null;
  phoneNumber: string | null;
  isIncomplete: boolean;
}

export type AuthAction =
  | { type: "SET_AUTH_TOKEN"; payload: string | null }
  | { type: "SET_USER_PROFILE"; payload: UserProfileResponse | null }
  | { type: "SET_PHONE_NUMBER"; payload: string | null }
  | { type: "SET_NEW_USER"; payload: boolean }
  | { type: "LOGIN"; payload: { accessToken: string; } }
  | { type: "LOGOUT" };

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_AUTH_TOKEN":
      return { ...state, accessToken: action.payload };

    case "SET_USER_PROFILE":
      return { ...state, user: action.payload };

    case "SET_PHONE_NUMBER":
      return { ...state, phoneNumber: action.payload };

    case "SET_NEW_USER":
      return { ...state, isIncomplete: action.payload };

    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        user: null,
        sessionId: null,
        phoneNumber: null,
        isIncomplete: false,
      };

    default:
      return state;
  }
}

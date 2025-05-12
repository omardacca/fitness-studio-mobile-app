import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { authReducer, AuthState, AuthAction } from "@/reducers/authReducer";
import { getUserProfile } from "@/api/authApi";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import TokenManager from "../managers/TokenManager";
import axiosInstance from "@/config/axiosInstance";

const initialState: AuthState = {
  isAuthenticated: null,
  user: null,
  accessToken: null,
  sessionId: null,
  phoneNumber: null,
  isIncomplete: false,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        console.log("🔐 loadAuthState initializing...");
  
        let accessToken = await TokenManager.getAccessToken();
        console.log(`accessToken (from store): ${accessToken}`);
  
        if (!accessToken) {
          console.log("⏳ No access token found. Trying refresh...");
  
          try {
            const response = await axiosInstance.post('/auth/token/refresh');
            accessToken = response.data?.accessToken;
  
            if (!accessToken) throw new Error("No access token received");
  
            await TokenManager.setAccessToken(accessToken);
            console.log("🔁 Refreshed access token successfully!");
          } catch (refreshError) {
            console.log("❌ Refresh token expired or invalid. Logging out.");
            await TokenManager.logout();
            dispatch({ type: "LOGOUT" });
            await SplashScreen.hideAsync();
            return;
          }
        }
  
        // Valid token exists
        dispatch({ type: "LOGIN", payload: { accessToken } });
  
        const deviceId = await TokenManager.getDeviceId();
        const tenantId = await TokenManager.getTenantId();
        console.log("📱 Device ID:", deviceId);
        console.log("🏢 Tenant ID:", tenantId);
      } catch (error) {
        console.log("⚠️ Unexpected error during auth check:", error);
        await TokenManager.logout();
        dispatch({ type: "LOGOUT" });
      } finally {
        await SplashScreen.hideAsync();
      }
    };
  
    loadAuthState();
  }, []);
  
  
  

  useEffect(() => {
    const loadUserProfile = async () => {  
      try {
        if (!state.isAuthenticated) return;

        const { success, data, error } = await getUserProfile();

        if (error) {
          throw new Error(error);
        }

        if (success && data) {
          dispatch({ type: 'SET_USER_PROFILE', payload: data });
          dispatch({ type: 'SET_NEW_USER', payload: data.isIncomplete });
        } else {
          console.error('Failed to load user profile:', error);
        }

      } catch (error) {
        await TokenManager.logout();
        dispatch({ type: 'LOGOUT' });
      }
    }

    loadUserProfile();
  }, [state.isAuthenticated]);

  // Watch for accessToken changes and update TokenManager
  useEffect(() => {
    const updateAccessToken = async () => {
      if (state.accessToken) {
        await TokenManager.setAccessToken(state.accessToken);
      } else {
        await TokenManager.removeAccessToken();
      }
    };
    updateAccessToken();
  }, [state.accessToken]);

  // Boot routing logic based on auth
  useEffect(() => {
    const initApp = () => {
      if (state.isAuthenticated === null) return;
    
      console.log("Auth check:", {
        isAuthenticated: state.isAuthenticated,
        isIncomplete: state.isIncomplete,
      });
    
      if (state.isAuthenticated && state.isIncomplete) {
        router.replace("/auth/onboarding");
      } else if (state.isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/auth");
      }
    };

    initApp();
  }, [state.isAuthenticated, state.isIncomplete]);
  
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useAuthContext } from "@/context/AuthContext";
import { useAppGlobalContext } from "@/context/appGlobalContext";
import { verifyOTPCall } from "@/api/authApi";
import { router } from "expo-router";

export function VerifyOTP() {
  const { state, dispatch } = useAuthContext();
  const { dispatch: globalDispatch, state: globalState } = useAppGlobalContext();
  const [otpCode, setOtpCode] = useState("");

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a 6-digit OTP code.");
      return;
    }

    globalDispatch({ type: "START_LOADING" });

    try {
      const { success, data, error } = await verifyOTPCall({ phoneNumber: state.phoneNumber || '', otp: otpCode });

      if (success && data?.accessToken) {
        dispatch({ type: "SET_AUTH_TOKEN", payload: data.accessToken });
        dispatch({ type: "SET_NEW_USER", payload: data.user.isIncomplete });

        // Fetch user profile after successful login
        dispatch({ type: "LOGIN", payload: { accessToken: data.accessToken } });
        
        // Redirect user after successful OTP verification
        if (!data.user.isIncomplete) {
          router.replace("/(tabs)");
          // console.log('replacing screen to onboarding');
          router.replace("/auth/onboarding");
        }
      } else {
        if (error) {
          Alert.alert(error);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      globalDispatch({ type: "STOP_LOADING" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        We sent an OTP to <Text style={styles.phoneNumber}>{state.phoneNumber}</Text>
      </Text>

      <TextInput
        style={styles.otpInput}
        placeholder="Enter 6-digit OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otpCode}
        onChangeText={setOtpCode}
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP} disabled={globalState.loadingCount > 0}>
        {globalState.loadingCount > 0 ? <ActivityIndicator color="#fff" /> : <Text style={styles.verifyText}>Verify</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  phoneNumber: {
    fontWeight: "bold",
    color: "#333",
  },
  otpInput: {
    width: "80%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  verifyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default VerifyOTP;

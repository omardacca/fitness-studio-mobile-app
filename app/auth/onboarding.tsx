import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";
import { updateUserProfile } from "@/api/authApi";

export default function Onboarding() {
  const { dispatch } = useAuthContext();
  const { phoneNumber } = useLocalSearchParams();
  const [fullName, setFullName] = useState("");

  
const handleSaveProfile = async () => {
  if (fullName.trim().length === 0) return;

  const { success, data, error } = await updateUserProfile({ fullName });

  if (success && data) {
    dispatch({ type: 'SET_NEW_USER', payload: data.user.isIncomplete });
    dispatch({ type: 'SET_USER_PROFILE', payload: data.user });

    // ✅ You might also want to route user to main tabs
    // router.replace('/(tabs)');
  } else {
    console.error('Profile update failed:', error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      <Text style={styles.subtitle}>Phone Number: {phoneNumber}</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#777", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 15, borderRadius: 10, marginBottom: 20 },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

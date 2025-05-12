import { TouchableOpacity, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
      <Ionicons name="chevron-back" size={24} color="#333" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    borderRadius: 50,
    backgroundColor: Platform.OS === "ios" ? "transparent" : "#f0f0f0",
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SessionInfoItemProps {
  icon: string;
  label: string;
  value: string;
}

const SessionInfoItem: React.FC<SessionInfoItemProps> = ({ icon, label, value }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={22} color="black" style={styles.icon} />
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default SessionInfoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  value: {
    fontSize: 14,
    color: "#7c8b96",
  },
});

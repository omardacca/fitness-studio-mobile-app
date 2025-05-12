import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useCheckoutContext } from "@/context/checkoutContext";
import Ionicons from "@expo/vector-icons/Ionicons"; // Import Ionicons for radio button
import { PaymentOptionsInterface } from "@/types/paymentOptions";

interface PaymentOptionsListProps {
    onSelectPayment: (paymentOption: PaymentOptionsInterface) => void;
}

const PaymentOptionsList: React.FC<PaymentOptionsListProps> = ({ onSelectPayment }) => {
  const { state: checkoutState } = useCheckoutContext();

  return (
    <View style={styles.container}>
      <FlatList  
        data={checkoutState.paymentOptions} 
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.option, checkoutState.selectedPaymentOption?.id === item.id && styles.selectedOption]} 
            onPress={() => onSelectPayment(item)}
          >
            <Ionicons 
              name={checkoutState.selectedPaymentOption?.id === item.id ? "radio-button-on" : "radio-button-off"} 
              size={20} 
              color={checkoutState.selectedPaymentOption?.id === item.id ? "#007bff" : "#aaa"} 
              style={styles.radioIcon}
            />
            <Text style={[styles.optionText, checkoutState.selectedPaymentOption?.id === item.id && styles.selectedText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  radioIcon: {
    marginRight: 10,
  },
  optionText: { fontSize: 16, color: "#000" },
  selectedOption: {
    backgroundColor: "#E6F0FF",
    borderColor: "#007bff",
  },
  selectedText: { color: "#007bff", fontWeight: "bold" },
});

export default PaymentOptionsList;

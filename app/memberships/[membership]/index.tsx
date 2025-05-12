import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useMembershipsContext } from '@/context/membershipsContext';
import MembershipCard from '@/components/MembershipCard';
import { useCheckoutContext } from '@/context/checkoutContext';
import PaymentOptionsList from '@/components/PaymentOptionsList';
import { PaymentOptionsInterface } from '@/types/paymentOptions';
import { setPaymentButtonText } from '@/utils/checkoutUtils';
import { placeOrder } from '@/api/checkoutApi';

export default function MembershipDetails() {
  const { state: membershipState, dispatch: membershipDispatch } = useMembershipsContext();
  const { state: checkoutState, dispatch: checkoutDispatch } = useCheckoutContext();
  const { selectedMembership } = membershipState;

  const onSelectPaymentPress = (paymentOption: PaymentOptionsInterface) => {
    checkoutDispatch({ type: "SELECT_PAYMENT_OPTION", payload: paymentOption });
  }

  const onPayPress = async () => {
    await placeOrder(selectedMembership?.membershipId, checkoutState.selectedPaymentOption?.id);
  }

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer} 
      nestedScrollEnabled={true}>
      <View style={styles.sectionContainer}>
        <MembershipCard 
          key={selectedMembership?.membershipId}
          membershipObj={selectedMembership}
          onPress={() => {}}
          />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Payment Options</Text>
        <PaymentOptionsList
          onSelectPayment={onSelectPaymentPress}
        />
      </View>

      <View style={styles.sectionContainer}>
        <TouchableOpacity 
          disabled={!(checkoutState.selectedPaymentOption)}
          style={styles.payButton}
          onPress={() => {onPayPress();}}
        >
          <Text style={styles.payButtonText}>
            { setPaymentButtonText(checkoutState?.selectedPaymentOption) }
            </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { padding: 15 },
  sectionContainer: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  benefitsContainer: {
    marginTop: 8,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  benefitText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  payButton: {
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: "#9b9b9b",
    paddingVertical: 13,
    width: "90%",
    borderRadius: 25,
  },
  payButtonText: {
    alignSelf: "center",
    color: "#000000",
    fontWeight: "bold",
  },
});

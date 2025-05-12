import { CheckoutProvider } from "@/context/checkoutContext";
import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";

export default function Layout() {
  return (
    <CheckoutProvider>
      <Stack screenOptions={{ 
        headerShown: true, 
        headerStyle: { backgroundColor: "#fff" },
        headerTitleStyle: { fontSize: 18, fontWeight: "bold", color: "#333" },
      }}>
        <Stack.Screen
          name="[membership]/index"
          options={{
            title: `Membership Details`,
            headerLeft: () => <BackButton />,
          }}
        />
      </Stack>
    </CheckoutProvider>
  );
}
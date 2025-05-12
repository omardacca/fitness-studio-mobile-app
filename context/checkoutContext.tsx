import { fetchPaymentOptions } from "@/api/paymentOptionsApi";
import { CheckoutAction, CheckoutReducer, CheckoutState } from "@/reducers/checkoutReducer";
import { createContext, useContext, useEffect, useReducer } from "react";


const CheckoutContext = createContext<{ state: CheckoutState; dispatch: React.Dispatch<CheckoutAction> } | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
    const initialState: CheckoutState = {
        paymentOptions: [],
        selectedPaymentOption: null,
    };

    const [state, dispatch] = useReducer(CheckoutReducer, initialState);

    useEffect(() => {
        const loadOptions = async () => {
          const { success, data, error } = await fetchPaymentOptions();
      
          if (success && data) {
            dispatch({ type: 'SET_PAYMENT_OPTIONS', payload: data });
          } else {
            console.error('❌ Failed to fetch payment options:', error);
          }
        };
      
        loadOptions();
    }, []);
    
    return (
        <CheckoutContext.Provider value={{ state, dispatch }}>
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckoutContext() {
    const context = useContext(CheckoutContext);
    if (!context) {
        throw new Error("useCheckoutContext must be used within an CheckoutProvider");
    }
    return context;
}
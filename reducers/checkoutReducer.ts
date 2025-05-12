import { PaymentOptionsInterface } from "@/types/paymentOptions";

export interface CheckoutState {
    paymentOptions: PaymentOptionsInterface[];
    selectedPaymentOption: PaymentOptionsInterface | null;
}

export type CheckoutAction = 
    { type: 'SET_PAYMENT_OPTIONS', payload: PaymentOptionsInterface[] } |
    { type: 'SELECT_PAYMENT_OPTION', payload: PaymentOptionsInterface };

export function CheckoutReducer(
    state: CheckoutState,
    action: CheckoutAction
) {
    switch(action?.type) {
        case 'SET_PAYMENT_OPTIONS':
            return { ...state, paymentOptions: action?.payload }
        case 'SELECT_PAYMENT_OPTION':
            return { ...state, selectedPaymentOption: action?.payload }
        default:
            return state;
    }
}
import { PaymentOptionsInterface } from "@/types/paymentOptions"

export const setPaymentButtonText = (paymentOption: PaymentOptionsInterface | null) => {
    if (!paymentOption) return 'Select Payment Method';
    switch(paymentOption?.id) {
        case 'pay_later':
            return 'Pay Later';
        default:
            return `Pay with ${paymentOption?.name}`;
    }
}
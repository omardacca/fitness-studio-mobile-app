// api/paymentOptionsApi.ts

import axiosInstance from '../config/axiosInstance';
import { handleApiResponse } from '../utils/handleApiResponse';
import { PaymentOptionsInterface } from '../types/paymentOptions';

export async function fetchPaymentOptions() {
  return handleApiResponse<PaymentOptionsInterface[]>(
    axiosInstance.get('/payment-options')
  );
}

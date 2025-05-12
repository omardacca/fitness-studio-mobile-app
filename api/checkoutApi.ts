import axiosInstance from '../config/axiosInstance';
import { handleApiResponse } from "@/utils/handleApiResponse";

export async function placeOrder(
    membershipId: string | undefined,
    paymentMethodId: string | undefined
  ): Promise<{ orderId: number; status: string } | null> {
    if (!membershipId || !paymentMethodId) return null;
  
    const { success, data, error } = await handleApiResponse<{ orderId: number; status: string }>(
      axiosInstance.post('/orders', { membershipId, paymentMethodId })
    );
  
    if (!success || !data) {
      console.error('❌ Failed to place order:', error);
      throw new Error('Placing order failed');
    }
  
    return data;
  }
  
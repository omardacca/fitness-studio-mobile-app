// /utils/handleApiResponse.ts
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  status?: number;
  error?: string;
  message?: string;
}

export async function handleApiResponse<T>(promise: Promise<AxiosResponse<any>>): Promise<ApiResponse<T>> {
  try {
    const response = await promise;
    
    return {
      success: true,
      data: response.data as T,
      message: response.data?.message,
      status: response.status,
    };
  } catch (error: any) {
    const axiosError = error as AxiosError;

    const responseData = axiosError.response?.data as { message?: string };
    const message = responseData?.message ?? axiosError.message ?? 'Something went wrong';

    return {
      success: false,
      status: axiosError.response?.status,
      error: message,
    };
  }
}

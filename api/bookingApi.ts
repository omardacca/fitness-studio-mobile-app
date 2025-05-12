import axios from '../config/axiosInstance';
import { handleApiResponse } from '../utils/handleApiResponse';
import { Booking } from '@/types/booking';
import Waitlist from '@/types/waitlist';

export async function fetchUserBookings() {
  return handleApiResponse<Booking[]>(
    axios.get('/bookings/me')
  );
}

export async function bookSession(sessionId: number): Promise<void> {
  const { success, error } = await handleApiResponse(
    axios.post('/bookings', { sessionId })
  );

  if (!success) {
    console.error('❌ Failed to book session:', error);
    throw new Error('Booking failed');
  }
}

export async function cancelBookSession(bookingId: string): Promise<void> {
  const { success, error } = await handleApiResponse(
    axios.delete(`/bookings/${bookingId}`)
  );

  if (!success) {
    console.error('❌ Failed to cancel booking:', error);
    throw new Error('Cancel booking failed');
  }
}

export async function fetchUserWaitlist() {
  return handleApiResponse<Waitlist[]>(
    axios.get('/waiting-list/me')
  );
}

export async function joinWaitlist(sessionId: number): Promise<void> {
  const { success, error } = await handleApiResponse(
    axios.post('/waiting-list', { sessionId })
  );

  if (!success) {
    console.error('❌ Failed to join waitlist:', error);
    throw new Error('Join waitlist failed');
  }
}

export async function cancelWaitlist(waitlistId: string): Promise<void> {
  const { success, error } = await handleApiResponse(
    axios.delete(`/waiting-list/${waitlistId}`)
  );

  if (!success) {
    console.error('❌ Failed to cancel waitlist:', error);
    throw new Error('Cancel waitlist failed');
  }
}
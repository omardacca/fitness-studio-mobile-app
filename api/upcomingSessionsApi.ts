import axiosInstance from '../config/axiosInstance';
import { handleApiResponse } from '../utils/handleApiResponse';
import { UpcomingSession } from '../types/upcomingSessions';

interface FetchUpcomingSessionsResponse {
  upcomingSessions: UpcomingSession[];
}

export async function fetchUpcomingSessions() {
  return handleApiResponse<FetchUpcomingSessionsResponse>(
    axiosInstance.get('/bookings/upcoming')
  );
}

import axios from '../config/axiosInstance';
import { handleApiResponse } from '../utils/handleApiResponse';
import { FetchInstructorsResponse } from '../types/Instructor';

export async function fetchInstructors() {
  return handleApiResponse<FetchInstructorsResponse>(
    axios.get('/instructors')
  );
}
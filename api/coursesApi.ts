import AvailableCourse from '@/types/availableCourse';

import axios from '../config/axiosInstance';
import { handleApiResponse } from '../utils/handleApiResponse';
import { FetchCoursesResponse } from '../types/course';

interface FetchAvailableCoursesResponse {
  availableCourses: AvailableCourse[];
}

export async function fetchCourses() {
  return handleApiResponse<FetchCoursesResponse>(axios.get('/courses'));
}

export async function fetchAvailableCourses() {
  return handleApiResponse<FetchAvailableCoursesResponse>(
    axios.get('/sessions/available-courses')
  );
}

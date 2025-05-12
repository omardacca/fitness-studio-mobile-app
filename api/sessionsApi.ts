import axios from '@/config/axiosInstance';
import { SessionFilters } from '../types/SessionFilters';
import { handleApiResponse } from '@/utils/handleApiResponse';
import { FetchSessionsResponse } from '@/types/session';

// TODO: filter out past sessions (< now time-wise)
export async function fetchSessions(filters: SessionFilters) {
  const params: Record<string, any> = {
    dateTime: filters.dateTime,
  };
  
  if (filters.courseTypeId !== null) params.courseTypeId = filters.courseTypeId;
  if (filters.instructorId !== null) params.instructorId = filters.instructorId;
  
  return handleApiResponse<FetchSessionsResponse>(
    axios.get('/sessions', { params })
  );
}

// export function fetchSessions(filters: SessionFilters): Promise<Session[]> {
//     return Promise.resolve(
//         sessions.reduce((filtered, session) => {
//             if (!dayjs(session.dateTime).isSame(filters.dateTime, 'day')) return filtered;
//             if (filters.instructorId && session.instructorId !== filters.instructorId) return filtered;
//             if (filters.courseTypeId && session.courseTypeId !== filters.courseTypeId) return filtered;
//             filtered.push(session);
//             return filtered;
//         }, [] as Session[])
//     );
// }

import { Membership } from "@/types/membership";
import axios from '../config/axiosInstance';
import { handleApiResponse } from '@/utils/handleApiResponse';
import { UserMembership } from "@/types/UserMembership";

export function fetchUserMemberships() {
  return handleApiResponse<{ memberships: UserMembership[] }>(
    axios.get('/user-memberships/active')
  );
}

export async function fetchAppMemberships() {
  return handleApiResponse<Membership[]>(
    axios.get('/memberships')
  );
}
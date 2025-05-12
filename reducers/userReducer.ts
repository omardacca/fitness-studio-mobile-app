import { UpcomingSession } from "@/types/upcomingSessions";
import { UserMembership } from "@/types/UserMembership";

export interface UserState {
    isAuthenticated: boolean;
    userMemberships: UserMembership[];
    upcomingSessions: UpcomingSession[];
}

export type UserAction =
    | { type: "SET_AUTHENTICATED"; payload: boolean }
    | { type: "SET_MEMBERSHIPS"; payload: UserMembership[] }
    | { type: "SET_UPCOMING_SESSIONS", payload: UpcomingSession[] };

export function userReducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
        case "SET_AUTHENTICATED":
            return { ...state, isAuthenticated: action.payload };
        case "SET_MEMBERSHIPS":
            return { ...state, userMemberships: action.payload };
        case "SET_UPCOMING_SESSIONS":
            return { ...state, upcomingSessions: action.payload };
        default:
            return state;
    }
}
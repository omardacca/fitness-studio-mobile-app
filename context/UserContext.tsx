import { createContext, useContext, useReducer, useEffect } from "react";
import { fetchUserMemberships } from "@/api/membershipsApi";
import { UserAction, userReducer } from "@/reducers/userReducer";
import { UserMembership } from "@/types/UserMembership";
import { UpcomingSession } from "@/types/upcomingSessions";
import { fetchUpcomingSessions } from "@/api/upcomingSessionsApi";
import { useAuthContext } from "@/context/AuthContext";


interface UserState {
    isAuthenticated: boolean;
    userMemberships: UserMembership[];
    upcomingSessions: UpcomingSession[];
}

const initialState: UserState = {
    isAuthenticated: false,
    userMemberships: [],
    upcomingSessions: [],
};

const UserContext = createContext<{ state: UserState; dispatch: React.Dispatch<UserAction> } | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const { state: authState, dispatch: authDispatch } = useAuthContext();

    useEffect(() => {
        if (!authState.isAuthenticated) return;

        const loadMemberships = async () => {
            try {
                const { success, data, error } = await fetchUserMemberships();

                if (success && data) {
                    dispatch({ type: "SET_MEMBERSHIPS", payload: data.memberships });
                } else {
                    console.error("❌ Failed to load user memberships:", error);
                }
            } catch (error) {
                console.error("Failed to fetch user memberships:", error);
            }
        };

        loadMemberships();
    }, [authState.isAuthenticated]);

    useEffect(() => {
        const loadUpcomingSessions = async () => {
            try {
                if (!authState.isAuthenticated || !authState.accessToken) return;
                const { success, data, error } = await fetchUpcomingSessions();

                if (success && data) {
                dispatch({ type: 'SET_UPCOMING_SESSIONS', payload: data.upcomingSessions });
                } else {
                console.error('❌ Failed to load upcoming sessions:', error);
                }
            } catch (error) {
                console.log("Failed to fetch Upcoming sessions:", error);
            }
        }
        loadUpcomingSessions();
    }, [state.userMemberships, authState.isAuthenticated]);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}

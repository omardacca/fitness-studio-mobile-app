import { fetchAppMemberships } from "@/api/membershipsApi";
import { MembershipsState, MembershipsAction, membershipsReducer } from "@/reducers/membershipsReducer";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuthContext } from "@/context/AuthContext";


const MembershipsContext = createContext<{ state: MembershipsState; dispatch: React.Dispatch<MembershipsAction> } | null>(null);

export function MembershipsProvider({ children }: { children: React.ReactNode }) {
    const { state: authState } = useAuthContext();
    
    const initialState: MembershipsState = {
        memberships: [],
        selectedMembership: undefined,
    };

    const [state, dispatch] = useReducer(membershipsReducer, initialState);

    useEffect(() => {
        const loadMemberships = async () => {
            if (!authState.isAuthenticated) return;
            const { success, data, error } = await fetchAppMemberships();
            if (success && data) {
                dispatch({ type: 'SET_MEMBERSHIPS', payload: data });
            } else {
                console.error('❌ Failed to fetch memberships:', error);
            }
            
        }
        loadMemberships();
    }, [authState.isAuthenticated]);
    
    return (
        <MembershipsContext.Provider value={{ state, dispatch }}>
            {children}
        </MembershipsContext.Provider>
    );
}

export function useMembershipsContext() {
    const context = useContext(MembershipsContext);
    if (!context) {
        throw new Error("useMembershipsContext must be used within an MembershipsProvider");
    }
    return context;
}
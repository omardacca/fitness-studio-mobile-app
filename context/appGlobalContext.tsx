import { AppAction, AppState, appReducer } from "@/reducers/appGlobalReducer";
import { createContext, useContext, useReducer } from "react";


const initialState: AppState = {
    loadingCount: 0,
};

const AppGloablContext = createContext<{ state: AppState; dispatch: React.Dispatch<AppAction> } | null>(null);

export function AppGlobalProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppGloablContext.Provider value={{ state, dispatch }}>
            {children}
        </AppGloablContext.Provider>
    );
}

export function useAppGlobalContext() {
    const context = useContext(AppGloablContext);
    if (!context) {
        throw new Error("useAppGlobalContext must be used within an AppGlobalProvider");
    }
    return context;
}
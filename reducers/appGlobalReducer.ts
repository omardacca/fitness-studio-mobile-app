export interface AppState {
    loadingCount: number;
}

export type AppAction = 
    | { type: "START_LOADING"; payload?: string }
    | { type: "STOP_LOADING" };


export function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case "START_LOADING":
            return {
                ...state,
                loadingCount: state.loadingCount + 1,
            };
        case "STOP_LOADING":
            return {
                ...state,
                loadingCount: Math.max(0, state.loadingCount - 1),
            };
        default:
            return state;
    }
}
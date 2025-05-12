import { useAuthContext } from './AuthContext';
import { fetchAvailableCourses, fetchCourses } from "@/api/coursesApi";
import { CoursesAction, CoursesReducer, CoursesState } from "@/reducers/coursesReducer";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const CoursesContext = createContext<{
    state: CoursesState;
    dispatch: React.Dispatch<CoursesAction>;
} | undefined>(undefined);

export const CoursesContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { state: authState } = useAuthContext();
    
    const initialState: CoursesState = {
        courseTypeId: null,
        courses: [],
        availableCourses: null,
    };

    const [state, dispatch] = useReducer(CoursesReducer, initialState);

    useEffect(() => {
        const loadCourses = async () => {
            if (authState.isAuthenticated && authState.accessToken) {
                const { success, data, error } = await fetchCourses();
                if (success && data?.courses) {
                    dispatch({ type: 'SET_COURSES', payload: data?.courses });
                } else {
                    console.error('Failed to load courses:', error);
                }
            }
        }
        
        loadCourses();
    }, [authState.isAuthenticated]);
    
    useEffect(() => {
        const loadAvailableCourses = async () => {
            if (!authState.isAuthenticated || !authState.accessToken) return;
            const { success, data, error } = await fetchAvailableCourses();

            if (success && data) {
                dispatch({ type: 'SET_AVAILABLE_COURSES', payload: data.availableCourses });
            } else {
                console.error('❌ Failed to load available courses:', error);
            }
        }
        loadAvailableCourses();
    }, [authState.isAuthenticated]); // TODO: need to trigger when available courses changes
    
    return (
        <CoursesContext.Provider value={{ state, dispatch }}>
            {children}
        </CoursesContext.Provider>
    )
}

export const useCoursesContext = () => {
    const context = useContext(CoursesContext);
    if (!context) {
      throw new Error("useCoursesContext must be used within a Provider");
    }
    return context;
  };
import React, { createContext, useReducer, useContext, useEffect } from "react";
import dayjs from 'dayjs';
import {
    CourseAvailabilitiesReducer,
    CourseAvailabilitiesState,
    CourseAvailabilitiesAction
} from '@/reducers/courseAvailabilitiesReducer';
import { fetchInstructors } from "@/api/instructorsApi";
import { fetchSessions } from "@/api/sessionsApi";
import { useCoursesContext } from "./CoursesContext";
import { fetchUserBookings, fetchUserWaitlist } from "@/api/bookingApi";
import { useAppGlobalContext } from "./appGlobalContext";


const CourseAvailabilitiesContext = createContext<{
    state: CourseAvailabilitiesState; 
    dispatch: React.Dispatch<CourseAvailabilitiesAction>; 
} | undefined>(undefined);

export const CourseAvailabilitiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialState: CourseAvailabilitiesState = {
      selectedDay: dayjs().format("YYYY-MM-DD"),
      selectedInstructor: null,
      sessions: [],
      instructors: [],
      currentBookings: [],
      currentWaitlist: [],
    };

    const [state, dispatch] = useReducer(CourseAvailabilitiesReducer, initialState);
    const { state: coursesState } = useCoursesContext();
    const { dispatch: appDispatch } = useAppGlobalContext();

    useEffect(() => {
      const loadData = async () => {
        const { success, data, error } = await fetchInstructors();
        
        if (success && data) {
          dispatch({ type: "SET_INSTRUCTORS", payload: data.instructors });
        } else {
          console.error('❌ Failed to load instructors:', error);
        }
      };
      loadData();
    }, []);

    useEffect(() => {
      const loadSessions = async () => {
        try {
          appDispatch({ type: "START_LOADING" });
          const filters = {
            courseTypeId: coursesState.courseTypeId,
            instructorId: state.selectedInstructor,
            dateTime: state.selectedDay
          };
          
          const { success, data, error } = await fetchSessions(filters);
          
          if (success && data) {
            dispatch({ type: "SET_SESSIONS", payload: data?.sessions });
          } else {
            console.error('Failed to fetch sessions:', error);
          }
        } catch (_error) {
          console.log(_error);
        } finally {
          appDispatch({ type: "STOP_LOADING" });
        }
      }
      loadSessions();
    }, [
      coursesState.courseTypeId, 
      state.selectedDay,
      state.selectedInstructor,
      state.currentBookings,
    ]);

    useEffect(() => {
      const loadUserBookings = async () => {
        const { success, data, error } = await fetchUserBookings();
        if (success && data) {
          dispatch({ type: 'SET_BOOKINGS', payload: data });
        } else {
          console.error('❌ Failed to fetch user bookings:', error);
        }
      }
      loadUserBookings();
    }, []);

    useEffect(() => {
      const loadCurrentWaitlist = async () => {
        const { success, data, error } = await fetchUserWaitlist();

        if (success && data) {
          dispatch({ type: 'SET_WAITLIST', payload: data });
        } else {
          console.error('❌ Failed to load waitlist:', error);
        }
      }
      loadCurrentWaitlist();
    }, []);

    return (
        <CourseAvailabilitiesContext.Provider value={{ state, dispatch }}>
          {children}
        </CourseAvailabilitiesContext.Provider>
      );
}

export const useCourseAvailabilities = () => {
    const context = useContext(CourseAvailabilitiesContext);
    if (!context) {
      throw new Error("useCourseAvailabilities must be used within a Provider");
    }
    return context;
};
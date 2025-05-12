import { Booking } from "@/types/booking";
import Instructor from "@/types/Instructor";
import { Session } from "@/types/session";
import Waitlist from "@/types/waitlist";

export interface CourseAvailabilitiesState {
    instructors: Instructor[];
    sessions: Session[];
    currentBookings: Booking[];
    currentWaitlist: Waitlist[];
    selectedDay: string;
    selectedInstructor: string | null;
}

export type CourseAvailabilitiesAction = 
    { type: 'SET_DAY', payload: string; } |
    { type: 'SET_SELECTED_INSTRUCTOR', payload: string | null } |
    { type: 'SET_INSTRUCTORS', payload: Instructor[] } |
    { type: 'SET_BOOKINGS', payload: Booking[] } |
    { type: 'SET_WAITLIST', payload: Waitlist[] } |
    { type: 'SET_SESSIONS', payload: Session[] } |
    { type: 'ADD_BOOK', payload: number } | 
    { type: 'CANCEL_BOOK', payload: number } |
    { type: 'ADD_WAITLIST', payload: number } | 
    { type: 'CANCEL_WAITLIST', payload: number }; 


export function CourseAvailabilitiesReducer(
    state: CourseAvailabilitiesState, 
    action: CourseAvailabilitiesAction
) {
    switch(action?.type) {
        case 'SET_DAY':
            return { ...state, selectedDay: action?.payload };
        case 'SET_SELECTED_INSTRUCTOR':
            return { ...state, selectedInstructor: action?.payload};
        case 'SET_INSTRUCTORS':
            return { ...state, instructors: action?.payload };
        case 'SET_BOOKINGS': 
            return { ...state, currentBookings: action?.payload };
        case 'SET_WAITLIST': 
            return { ...state, currentWaitlist: action?.payload };
        case 'SET_SESSIONS':
            return { ...state, sessions: action?.payload };
        case 'ADD_BOOK': 
            return state;
        case 'CANCEL_BOOK': 
            return state;
        case 'CANCEL_WAITLIST': 
            return state;
        case 'CANCEL_WAITLIST': 
            return state;
        default:
            return state;
    }
}
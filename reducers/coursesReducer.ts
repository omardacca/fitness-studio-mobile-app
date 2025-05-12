import AvailableCourse from "@/types/availableCourse";
import { Course } from "@/types/course";

export interface CoursesState {
    courseTypeId: number | null;
    courses: Course[] | null;
    availableCourses: AvailableCourse[] | null;
}

export type CoursesAction = 
    { type: 'SET_COURSE_TYPE_ID', payload: number | null } |
    { type: 'SET_COURSES', payload: Course[] | null } |
    { type: 'SET_AVAILABLE_COURSES', payload: AvailableCourse[] | null };

export function CoursesReducer(
    state: CoursesState,
    action: CoursesAction
) {
    switch(action?.type) {
        case 'SET_COURSE_TYPE_ID':
            return { ...state, courseTypeId: action?.payload }
        case 'SET_COURSES':
            return { ...state, courses: action?.payload }
        case 'SET_AVAILABLE_COURSES':
            return { ...state, availableCourses: action?.payload }
        default:
            return state;
    }
}
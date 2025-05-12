import { Course } from "@/types/course";
import Instructor from "@/types/Instructor";

export interface UpcomingSession {
    sessionId: number;
    course: Course;
    instructor: Instructor;
    duration: string;
    dateTime: string; 
    takenSeats: number;
    totalSeats: number;
}
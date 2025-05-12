export interface Session {
    sessionId: number;
    courseTypeId: number;
    instructorId: string;
    instructorName: string;
    instructorImageUrl: string;
    duration: string;
    dateTime: string;
    takenSeats: number;
    totalSeats: number;
};

export interface FetchSessionsResponse {
    sessions: Session[];
}
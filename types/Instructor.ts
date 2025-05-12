export default interface Instructor {
    instructorId: string;
    fullName: string;
    imageUrl: string;
}

export interface FetchInstructorsResponse {
    instructors: Instructor[];
}
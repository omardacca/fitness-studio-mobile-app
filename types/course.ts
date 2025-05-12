export interface Course {
    courseTypeId: number;
    title: string;
    imageUrl: string;
}

export interface FetchCoursesResponse {
  courses: Course[];
}
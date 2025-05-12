import AvailableCourse from "@/types/availableCourse";
import { Course } from "@/types/course";

export const courses: Course[] = [
    {courseTypeId: 1, title: 'Yoga', imageUrl: 'https://cdn.usegalileo.ai/sdxl10/a632d375-3572-4e02-a149-d3d08fc0d8a7.png'},
    {courseTypeId: 2, title: 'HIIT', imageUrl: 'https://cdn.usegalileo.ai/sdxl10/b1bd051d-b86f-4a85-83ef-49f5a537de64.png'},
    {courseTypeId: 3, title: 'Pilates', imageUrl: 'https://cdn.usegalileo.ai/sdxl10/8c3412d8-1583-4e69-b5df-6921a5f59500.png'},
    {courseTypeId: 4, title: 'Strength Training', imageUrl: 'https://cdn.usegalileo.ai/sdxl10/47008ee0-b547-4ca5-9323-62750d56e20f.png'},
];

export const availableCourses: AvailableCourse[] = [
    {courseTypeId: 1, title: 'Yoga', availableCoursesCount: 5, imageUrl: 'https://cdn.usegalileo.ai/sdxl10/a632d375-3572-4e02-a149-d3d08fc0d8a7.png'},
    {courseTypeId: 2, title: 'HIIT', availableCoursesCount: 10, imageUrl: 'https://cdn.usegalileo.ai/sdxl10/b1bd051d-b86f-4a85-83ef-49f5a537de64.png'},
    {courseTypeId: 3, title: 'Pilates', availableCoursesCount: 3, imageUrl: 'https://cdn.usegalileo.ai/sdxl10/8c3412d8-1583-4e69-b5df-6921a5f59500.png'},
    {courseTypeId: 4, title: 'Strength Training', availableCoursesCount: 1, imageUrl: 'https://cdn.usegalileo.ai/sdxl10/47008ee0-b547-4ca5-9323-62750d56e20f.png'},
];
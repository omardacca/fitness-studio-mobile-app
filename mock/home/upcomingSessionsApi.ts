import { UpcomingSession } from "@/types/upcomingSessions";

export const upcomingSessions: UpcomingSession[] = [
  {
    sessionId: 1,
    course: {
      courseTypeId: 1,
      title: "Yoga",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/a632d375-3572-4e02-a149-d3d08fc0d8a7.png",
    },
    instructor: {
      instructorId: '100000001',
      fullName: "Marimba T.",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    duration: "55 min",
    dateTime: "2025-03-05T18:00",
    takenSeats: 10,
    totalSeats: 15,
  },
  {
    sessionId: 3,
    course: {
      courseTypeId: 2,
      title: "Pilates",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/8c3412d8-1583-4e69-b5df-6921a5f59500.png",
    },
    instructor: {
      instructorId: '100000002',
      fullName: "Darryl K.",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    duration: "45 min",
    dateTime: "2025-03-05T21:00",
    takenSeats: 12,
    totalSeats: 12,
  },
];

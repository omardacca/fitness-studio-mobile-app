import Booking from "@/types/booking";
import Instructor from "@/types/Instructor";
import { Session } from "@/types/session";
import Waitlist from "@/types/waitlist";

export const instructors: Instructor[] = [
    { instructorId: "100000001", fullName: 'Noor', imageUrl: "https://randomuser.me/api/portraits/women/1.jpg" },
    { instructorId: "100000002", fullName: 'Lena', imageUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
    { instructorId: "100000003", fullName: 'Anastasia', imageUrl: "https://randomuser.me/api/portraits/women/3.jpg" },
  ];
  
export const sessions: Session[] = [
    {
      sessionId: 1,
      instructorId: "100000001",
      courseTypeId: 1,
      instructorName: "Marimba T.",
      instructorImageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      duration: "55 min",
      dateTime: "2025-03-02T21:00",
      takenSeats: 10,
      totalSeats: 10,
    },
    {
      sessionId: 2,
      instructorId: "100000002",
      courseTypeId: 1,
      instructorName: "Darryl K.",
      instructorImageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      duration: "45 min",
      dateTime: "2025-03-02T21:00",
      takenSeats: 5,
      totalSeats: 12,
    },
    {
      sessionId: 3,
      instructorId: "100000001",
      courseTypeId: 1,
      instructorName: "Felix R.",
      instructorImageUrl: "https://randomuser.me/api/portraits/men/29.jpg",
      duration: "60 min",
      dateTime: "2025-03-02T21:00",
      takenSeats: 8,
      totalSeats: 8,
    },
    {
      sessionId: 4,
      instructorId: "100000002",
      courseTypeId: 1,
      instructorName: "Sophia M.",
      instructorImageUrl: "https://randomuser.me/api/portraits/women/50.jpg",
      duration: "50 min",
      dateTime: "2025-03-02T21:00",
      takenSeats: 10,
      totalSeats: 10,
    },
    {
      sessionId: 5,
      instructorId: "100000003",
      courseTypeId: 1,
      instructorName: "James L.",
      instructorImageUrl: "https://randomuser.me/api/portraits/men/40.jpg",
      duration: "40 min",
      dateTime: "2025-03-02T21:00",
      takenSeats: 7,
      totalSeats: 12,
    },
    {
      sessionId: 6,
      instructorId: "100000002",
      courseTypeId: 1,
      instructorName: "Emma W.",
      instructorImageUrl: "https://randomuser.me/api/portraits/women/35.jpg",
      duration: "55 min",
      dateTime: "2025-03-02T21:00",
      takenSeats: 4,
      totalSeats: 10,
    },
    {
      sessionId: 7,
      instructorId: "100000001",
      courseTypeId: 1,
      instructorName: "Oliver G.",
      instructorImageUrl: "https://randomuser.me/api/portraits/men/48.jpg",
      duration: "50 min",
      dateTime: "2025-03-02T21:00",
      takenSeats: 1,
      totalSeats: 10,
    },
    {
      sessionId: 8,
      instructorId: "100000001",
      courseTypeId: 1,
      instructorName: "Ava B.",
      instructorImageUrl: "https://randomuser.me/api/portraits/women/28.jpg",
      duration: "60 min",
      dateTime: "2025-03-03T21:00",
      takenSeats: 6,
      totalSeats: 15,
    },
    {
      sessionId: 9,
      instructorId: "100000002",
      courseTypeId: 1,
      instructorName: "Ethan H.",
      instructorImageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
      duration: "45 min",
      dateTime: "2025-03-03T21:00",
      takenSeats: 3,
      totalSeats: 10,
    },
    {
      sessionId: 10,
      instructorId: "100000003",
      courseTypeId: 2,
      instructorName: "Mia C.",
      instructorImageUrl: "https://randomuser.me/api/portraits/women/36.jpg",
      duration: "50 min",
      dateTime: "2025-03-02T21:00",
      takenSeats: 2,
      totalSeats: 8,
    },
    {
      sessionId: 11,
      instructorId: "100000003",
      courseTypeId: 1,
      instructorName: "Mia C.",
      instructorImageUrl: "https://randomuser.me/api/portraits/women/36.jpg",
      duration: "30 min",
      dateTime: "2025-03-04T00:00",
      takenSeats: 3,
      totalSeats: 10,
    },
  ];
  
export let currentBookings: Booking[] = [
    { bookingId: 1, sessionId: 1 }
  ];
  
export let currentWaitlist: Waitlist[] = [
    { waitlistId: 1, sessionId: 3 }
  ];

export function setCurrentBookings(newBookings: Booking[]) {
  currentBookings = newBookings;
}

export function setCurrentWaitlist(newWaitlist: Waitlist[]) {
  currentWaitlist = newWaitlist;
}
import { UserMembership } from "@/types/UserMembership";

export const userMemberships: UserMembership[] = [
    {
        membershipId: 1,
        title: "10 Pilates Reformers & 10 Yoga",
        price: 600,
        features: [
            { courseTypeId: 1, courseTypeName: "Pilates Reformer", remainSessionCount: 1, sessionCount: 10 },
            { courseTypeId: 2, courseTypeName: "Yoga", remainSessionCount: 3, sessionCount: 8 },
        ],
        cancelationOptions: {
            hoursBeforeSession: 3,
        }
    },
    {
        membershipId: 2,
        title: "10 Pilates Reformers",
        price: 600,
        features: [
            { courseTypeId: 1, courseTypeName: "Pilates Reformer", remainSessionCount: 9, sessionCount: 10 },
            { courseTypeId: 2, courseTypeName: "Yoga", remainSessionCount: 3, sessionCount: 8 },
        ],
        cancelationOptions: {
            hoursBeforeSession: 3,
        }
    },
];
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Image } from 'expo-image';
// import { FlashList } from '@shopify/flash-list'; // TODO: [try to fix] FlashList is much more optimized but it doesn't detect changes in the data!!!
import {Session} from '@/types/session';
import { Booking } from '@/types/booking';
import Waitlist from '@/types/waitlist';
import dayjs from 'dayjs';

interface SessionListProps {
    sessions: Session[];
    bookings: Booking[];
    waitlist: Waitlist[];
    onBookPress: (sessionId: number) => void;
    onJoinwaitlistPress: (sessionId: number) => void;
    onCancelBookPress: (bookObj: Booking) => void;
    onCancelJoinwaitlistPress: (waitlistId: string) => void;
  }

const BookSessionSection: React.FC<SessionListProps> = ({
  sessions,
  bookings,
  waitlist,
  onBookPress,
  onJoinwaitlistPress,
  onCancelBookPress,
  onCancelJoinwaitlistPress,
}) => {
  return (
    <FlatList
      data={sessions}
      keyExtractor={(item) => item.sessionId.toString()}
      renderItem={({ item }) => {
        const isFull = item.takenSeats === item.totalSeats;
        const bookObj = bookings?.find(book => book.sessionId === item.sessionId);
        const isBooked = !!bookObj;
        const waitlistObj = waitlist?.find(el => el.sessionId === item.sessionId);
        const isInWaitlist = !!waitlistObj;
        return (
        <View style={styles.sessionCard}>
          <Image source={{ uri: item.instructorImageUrl }} style={styles.sessionImage} />
          <View style={styles.sessionInfo}>
            <Text style={styles.sessionTitle}>{item.instructorName}</Text>
            <Text style={styles.sessionTime}>
              {dayjs(item.dateTime).format("HH:mm")}
              {"  "}({item.duration})
            </Text>
            { item.takenSeats === item.totalSeats ? (
                <Text style={styles.seatsInfo}>
                    {item.takenSeats}/{item.totalSeats} session is full
                </Text>
            ) : (
                <Text style={styles.seatsInfo}>
                    {item.takenSeats}/{item.totalSeats} seats booked
                </Text>
            ) }
          </View>
          {
            isBooked ? (
              <TouchableOpacity style={styles.ctaButton} onPress={() => onCancelBookPress(bookObj)}>
                <Text style={styles.ctaText}>Cancel Book</Text>
              </TouchableOpacity>
            ) : (
              isFull ? (
                isInWaitlist ? (
                  <TouchableOpacity style={styles.ctaButton} onPress={() => onCancelJoinwaitlistPress(waitlistObj.waitlistId)} >
                    <Text style={styles.ctaText}>Cancel Waitlist</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.ctaButton} onPress={() => onJoinwaitlistPress(item.sessionId)} >
                    <Text style={styles.ctaText}>Join Waitlist</Text>
                  </TouchableOpacity>
                )
              ) : (
                <TouchableOpacity style={styles.ctaButton} onPress={() => onBookPress(item.sessionId)}>
                  <Text style={styles.ctaText}>Book</Text>
                </TouchableOpacity>
              )
            )
        }
        </View>
      )}}
      ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No sessions available.</Text>
          </View>
      }
    />
  )
}

const styles = StyleSheet.create({
    sessionCard: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    sessionImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    sessionInfo: {
      flex: 1,
    },
    sessionTitle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    sessionTime: {
      fontSize: 14,
      color: "#7c8b96",
    },
    seatsInfo: {
      fontSize: 12,
      color: "#888",
    },
    ctaButton: {
      backgroundColor: "#f2f4f5",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
    },
    ctaText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#000",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
    },
  });

export default BookSessionSection;
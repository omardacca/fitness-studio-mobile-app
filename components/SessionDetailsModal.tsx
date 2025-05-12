import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { UpcomingSession } from "@/types/upcomingSessions";
import SessionImage from "@/components/SessionImage";
import SessionInfoItem from "@/components/SessionInfoItem";
import { formatSessionTime } from '@/utils/sessionsHelpers';

interface SessionDetailsModalProps {
  visible: boolean;
  session: UpcomingSession;
  onClose: () => void;
}

const SessionDetailsModal: React.FC<SessionDetailsModalProps> = ({ visible, onClose, session }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Course Image */}
          <SessionImage imageUrl={session.course.imageUrl} />

          {/* Course Title */}
          <Text style={styles.courseTitle}>{session.course.title} with {session.instructor.fullName}</Text>

          {/* Session Details */}
          <View style={styles.detailsContainer}>
            <SessionInfoItem 
              icon="time-outline" 
              label="Time" 
              value={`${formatSessionTime(session.dateTime)} (${session.duration})`} 
            />
            <SessionInfoItem 
              icon="person-outline" 
              label="Instructor" 
              value={session.instructor.fullName} 
            />
            <SessionInfoItem 
              icon="people-outline" 
              label="Attendance" 
              value={`${session.takenSeats}/${session.totalSeats} seats booked`} 
            />
          </View>

          <TouchableOpacity style={styles.detailsButton} onPress={onClose}>
            <Text style={styles.detailsText}>Close</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </Modal>
  );
};

export default SessionDetailsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  detailsContainer: {
    width: "100%",
    marginTop: 15,
  },
  detailsButton: {
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: "#F0F3F4",
    paddingVertical: 13,
    width: "90%",
    borderRadius: 25,
  },
  detailsText: {
    alignSelf: "center",
    color: "#000000",
    fontWeight: "bold",
  },
});

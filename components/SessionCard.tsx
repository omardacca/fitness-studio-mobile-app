import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { UpcomingSession } from '@/types/upcomingSessions';
import SessionDetailsModal from '@/components/SessionDetailsModal';
import { formatSessionTime } from '@/utils/sessionsHelpers';

interface SessionCardProps {
  session: UpcomingSession;
}

const SessionCard: React.FC<SessionCardProps> = ({session}) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.card}>
      <Image source={{ uri: session.course.imageUrl }} style={styles.image} />
      <View style={styles.InfoContainer}>
        <Text style={styles.title}>{session.course.title}</Text>
        <Text style={styles.time}>
          {formatSessionTime(session.dateTime)} ({session.duration})
        </Text>
      </View>

      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.detailsText}>View Details</Text>
      </TouchableOpacity>

      {/* Modal for Session Details */}
      <SessionDetailsModal
        visible={modalVisible}
        session={session}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: { 
    width: 200, 
    marginRight: 10, 
    backgroundColor: '#fff', 
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  InfoContainer: {
    padding: 12,
  },
  image: { 
    borderRadius: 12,
    width: '100%', 
    height: 250 
  },
  title: { 
    fontSize: 16, 
    fontWeight: 600, 
    marginTop: 5 
  },
  time: { 
    marginTop: 5,
    fontSize: 14, 
    color: '#888' 
  },
  detailsButton: {
    marginVertical: 13,
    backgroundColor: "#F0F3F4",
    paddingVertical: 13,
    paddingHorizontal: 44,
    borderRadius: 25,
    alignSelf: "center",
  },
  detailsText: {
    color: "#000000",
    fontWeight: "bold",
  },
});

export default SessionCard;
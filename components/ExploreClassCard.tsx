import AvailableCourse from '@/types/availableCourse';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';

interface ExploreClassCardProps {
  availableCourseItem: AvailableCourse;
  onPress: (courseTypeId: number) => void;
}

const ExploreClassCard: React.FC<ExploreClassCardProps> = ({ availableCourseItem, onPress }) => {
  return (
    <Link href='/availabilities/[course]' asChild>
      <TouchableOpacity 
        style={styles.card}
        onPress={() => onPress(availableCourseItem.courseTypeId)}
        >
        <Image source={{ uri: availableCourseItem.imageUrl }} style={styles.image} />
        <View style={styles.InfoSection}>
          <Text style={styles.title}>{availableCourseItem.title}</Text>
          <Text style={styles.count}>{availableCourseItem.availableCoursesCount} available classes</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: { 
    width: 150, 
    marginRight: 10, 
    backgroundColor: '#fff', 
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6", 
  },
  image: { 
    width: '100%', 
    height: 100 
  },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginTop: 5 
  },
  count: { 
    fontSize: 14, 
    color: '#888' 
  },
  InfoSection: {
    padding: 6,
  }
});

export default ExploreClassCard;
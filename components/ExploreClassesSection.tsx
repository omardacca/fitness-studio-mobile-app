import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ExploreClassCard from '@/components/ExploreClassCard';
import { useCoursesContext } from '@/context/CoursesContext';

const ExploreClassesSection = () => {
  const { state: coursesState, dispatch: courseDispatch } = useCoursesContext();

  const onCoursePress = (courseTypeId: number) => {
    courseDispatch({ type: 'SET_COURSE_TYPE_ID', payload: courseTypeId });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore New Classes</Text>
      <FlatList 
        horizontal 
        data={coursesState.availableCourses}
        renderItem={({ item }) => <ExploreClassCard 
                                    availableCourseItem={item} 
                                    onPress={onCoursePress}
                                  />} 
        keyExtractor={(item) => item.courseTypeId.toString()} 
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});

export default ExploreClassesSection;
import { View, StyleSheet, ScrollView } from 'react-native';
import CategoryCard from "@/components/CategoryCard";
import { useCoursesContext } from '@/context/CoursesContext';

export default function Tab() {
  const { state, dispatch } = useCoursesContext();
  
  const onCoursePress = (courseTypeId: number) => {
    dispatch({ type: 'SET_COURSE_TYPE_ID', payload: courseTypeId });
  }
  
  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollview}>
            {state && state.courses && state.courses?.map(
              ({courseTypeId, title, imageUrl}) => 
                <CategoryCard 
                  key={courseTypeId} 
                  courseTypeId={courseTypeId} 
                  imageUrl={imageUrl} 
                  title={title} 
                  onCategoryPress={onCoursePress}
                />)}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollview: {
    width: '100%'
  }
});

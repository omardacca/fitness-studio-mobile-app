import { CourseAvailabilitiesProvider } from "@/context/CourseAvailabilitiesContext";
import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";
import { useCoursesContext } from "@/context/CoursesContext";

export default function Layout() {
  const { state } = useCoursesContext();

  const courseName = state.courses?.find(course => course.courseTypeId === state.courseTypeId)?.title || '';
  return (
    <CourseAvailabilitiesProvider>
      <Stack screenOptions={{ 
      headerShown: true, 
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { fontSize: 18, fontWeight: "bold", color: "#333" },
    }}>
      <Stack.Screen
        name="[course]/index"
        options={{
          title: `${courseName} Availabilities`,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
    </CourseAvailabilitiesProvider>
  );
}
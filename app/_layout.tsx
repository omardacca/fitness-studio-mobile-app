import GlobalLoader from "@/components/GlobalLoader";
import { CoursesContextProvider } from "@/context/CoursesContext";
import { AppGlobalProvider, useAppGlobalContext } from "@/context/appGlobalContext";
import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router/stack";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { MembershipsProvider } from "@/context/membershipsContext";
import { AuthProvider } from "@/context/AuthContext";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const MainLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default function Layout() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault(dayjs.tz.guess());

  
  return (
    <SafeAreaView style={styles.container}>
    <AppGlobalProvider>
      <AuthProvider>
        <UserProvider>
          <CoursesContextProvider>
            <MembershipsProvider>
              <MainLayout />
            </MembershipsProvider>
          </CoursesContextProvider>
        </UserProvider>
        <GlobalLoader />
      </AuthProvider>
    </AppGlobalProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
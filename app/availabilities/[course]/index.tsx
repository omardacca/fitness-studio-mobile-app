import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MiniCalendar from '@/components/MiniCalendar';
import BookSessionSection from '@/components/BookSessionSection';
import InstructorListSection from '@/components/InstructorListSection';
import { useCourseAvailabilities } from "@/context/CourseAvailabilitiesContext";
import { bookSession, cancelBookSession, cancelWaitlist, fetchUserBookings, fetchUserWaitlist, joinWaitlist } from '@/api/bookingApi';
import { useAppGlobalContext } from "@/context/appGlobalContext";
import { useUserContext } from "@/context/UserContext";
import NoMembershipModal from '@/components/NoMembershipModal';
import { useState } from 'react';
import { useCoursesContext } from '@/context/CoursesContext';
import MessageModal from "@/components/MessageModal";
import dayjs from "dayjs";
import { Booking } from '@/types/booking';
import { fetchUserMemberships } from '@/api/membershipsApi';

export default function courseAvailabilities() {
    const { state, dispatch } = useCourseAvailabilities();
    const { dispatch: appDispatch } = useAppGlobalContext();
    const { state: userState, dispatch: userDispatch } = useUserContext();
    const { state: coursesState } = useCoursesContext();
    const [showNoMembershipModal, setShowNoMembershipModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    

    const bookingVaidations = (sessionDateTime: string | undefined) => {
      let hasValidMembership;
      let canCancel;
      let maxHoursBeforeSession = 0;
  
      const now = dayjs();
      const sessionTime = dayjs(sessionDateTime);
      const hoursUntilSession = sessionTime.diff(now, "hour"); // ✅ Get time difference in hours
  
      // ✅ Find valid memberships that have remaining sessions for the selected course
      const validMemberships = userState.userMemberships?.filter(membership =>
          membership.features.some(feature =>
              feature.courseTypeId === coursesState.courseTypeId &&
              feature.remainSessionCount > 0
          )
      );
  
      hasValidMembership = validMemberships && validMemberships.length > 0;
      canCancel = validMemberships && validMemberships.length > 0;
      
      // ✅ Find the minimum hoursBeforeSession restriction for message display
      validMemberships.forEach(membership => {
          if (
              membership.cancelationOptions?.hoursBeforeSession !== undefined &&
              (maxHoursBeforeSession === 0 || membership.cancelationOptions.hoursBeforeSession > maxHoursBeforeSession)
          ) {
              maxHoursBeforeSession = membership.cancelationOptions.hoursBeforeSession;
          }
      });
  
      // ✅ Check if cancellation is allowed based on the closest membership rule
      canCancel = validMemberships.some(membership =>
          membership.cancelationOptions?.hoursBeforeSession !== undefined &&
          hoursUntilSession >= membership.cancelationOptions.hoursBeforeSession
      );
  
      return { hasValidMembership, canCancel, minHoursBeforeSession: maxHoursBeforeSession };
    };


    const handleDayChange = (day: string) => {
      dispatch({ type: "SET_DAY", payload: day });
    }
    
    const handleBookPress = async (sessionId: number) => {
      const sessionObj = state.sessions?.find(session => session.sessionId === sessionId);
      const validation = bookingVaidations(sessionObj?.dateTime);
    
      if (!validation.hasValidMembership) {
        setShowNoMembershipModal(true);
        return;
      }
      
      appDispatch({ type: "START_LOADING" });
      try {
        await bookSession(sessionId);

        const { success, data, error } = await fetchUserBookings();

        if (success && data) {
          dispatch({ type: 'SET_BOOKINGS', payload: data });
        } else {
          console.error('❌ Failed to fetch user bookings:', error);
        }

        // load memberships to update context state and reflect changes to UI
        const { success: membershipSuccess, data: membershipData, error: membershipError } = await fetchUserMemberships();
        if (membershipSuccess && membershipData) {
          userDispatch({ type: 'SET_MEMBERSHIPS', payload: membershipData?.memberships });
        } else {
          console.error('❌ Failed to fetch user memberships:', membershipError);
        }

      } catch (error) {
        console.error("Failed to handleBookPress:", error);
      } finally {
        appDispatch({ type: "STOP_LOADING" });
      }
    };

    const handleJoinwaitlistPress = async (sessionId: number) => {
      appDispatch({ type: "START_LOADING" });

      try {
        await joinWaitlist(sessionId);

        const { success, data, error } = await fetchUserWaitlist();
        
        if (success && data) {
          dispatch({ type: 'SET_WAITLIST', payload: data });
        } else {
          console.error('❌ Failed to load waitlist:', error);
        }
        
      } catch (error) {
        console.error("Failed to handleJoinwaitlistPress:", error);
      } finally {
        appDispatch({ type: "STOP_LOADING" });
      }
    }

    const handleCancelBookPress = async (bookObj: Booking) => {
      const sessionObj = state.sessions?.find(session => session.sessionId === bookObj.sessionId);
      const validation = bookingVaidations(sessionObj?.dateTime);
      
      if (validation.hasValidMembership && !validation.canCancel) {
        setModalMessage(`Sorry, you cannot cancel this session less than ${validation.minHoursBeforeSession} hours before it starts.`);
        setShowMessageModal(true);
        return;
      }
      
      appDispatch({ type: "START_LOADING" });
      
      try {
        await cancelBookSession(bookObj.bookingId);
        
        
        const { success, data, error } = await fetchUserBookings();
        if (success && data) {
          dispatch({ type: 'SET_BOOKINGS', payload: data });
        } else {
          console.error('❌ Failed to fetch user bookings:', error);
        }

        // load memberships to update context state and reflect changes to UI
        const { success: membershipSuccess, data: membershipData, error: membershipError } = await fetchUserMemberships();
        if (membershipSuccess && membershipData) {
          userDispatch({ type: 'SET_MEMBERSHIPS', payload: membershipData?.memberships });
        } else {
          console.error('❌ Failed to fetch user memberships:', membershipError);
        }

      } catch (error) {
        console.error("Failed to handleCancelBookPress:", error);
      } finally {
        appDispatch({ type: "STOP_LOADING" });
      }
    };

    const handleCancelJoinwaitPress = async (waitlistId: string) => {
      appDispatch({ type: "START_LOADING" });

      try {
        await cancelWaitlist(waitlistId);

        const { success, data, error } = await fetchUserWaitlist();
        
        if (success && data) {
          dispatch({ type: 'SET_WAITLIST', payload: data });
        } else {
          console.error('❌ Failed to load waitlist:', error);
        }
      } catch (error) {
        console.error("Failed to handleCancelJoinwaitPress:", error);
      } finally {
        appDispatch({ type: "STOP_LOADING" });
      }
    };

    const handleInstructorPress = (instructorId: string) => {
      if (instructorId === state.selectedInstructor) {
        dispatch({ type: "SET_SELECTED_INSTRUCTOR", payload: null });
      } else {
        dispatch({ type: "SET_SELECTED_INSTRUCTOR", payload: instructorId });
      }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Date</Text>
              <MiniCalendar onDayChange={handleDayChange} selectedDay={state.selectedDay}/>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Instructor</Text>
              <InstructorListSection
                instructors={state?.instructors}
                selectedInstructor={state.selectedInstructor}
                onInstructorPress={handleInstructorPress}
              />
            </View>
            
            
            <View style={styles.sessionSection}>
              <Text style={styles.sectionTitle}>Available Sessions</Text>
              <BookSessionSection 
                sessions={state.sessions} 
                bookings={state.currentBookings}
                waitlist={state.currentWaitlist}
                onBookPress={handleBookPress} 
                onJoinwaitlistPress={handleJoinwaitlistPress}
                onCancelBookPress={handleCancelBookPress}
                onCancelJoinwaitlistPress={handleCancelJoinwaitPress}  
              />
              <NoMembershipModal 
                visible={showNoMembershipModal} 
                onClose={() => setShowNoMembershipModal(false)}
              />
              <MessageModal
                visible={showMessageModal}
                message={modalMessage}
                onClose={() => setShowMessageModal(false)}
              />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 15,
    backgroundColor: '#ffff'
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600'
  },
  sectionContainer: {
    paddingBottom: 20
  },
  sessionSection: {
    flex: 1,
    paddingTop: 10
  }
});

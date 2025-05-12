import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SessionCard from '@/components/SessionCard';
import { useUserContext } from '@/context/UserContext';

const UpcomingSessionsSection = () => {
  const { state: userState, dispatch: userDispatch } = useUserContext();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Session(s)</Text>
      <FlatList 
        horizontal 
        data={userState.upcomingSessions} 
        renderItem={({ item }) => <SessionCard 
                                    session={item}
                                  />}
        keyExtractor={(item) => item.sessionId.toString()} 
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});

export default UpcomingSessionsSection;
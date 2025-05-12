import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MiniMembershipCard from '@/components/MiniMembershipCard';
import { useUserContext } from '@/context/UserContext';

const MembershipsOverview = () => {
  const { state: userState, dispatch: userDispatch } = useUserContext();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memberships Overview</Text>
      <FlatList 
          data={userState.userMemberships} 
          renderItem={({ item }) => <MiniMembershipCard membership={item} />} 
          keyExtractor={(item) => item.membershipId.toString()} 
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});

export default MembershipsOverview;
import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import UpcomingSessionsSection from '@/components/UpcomingSessionsSection';
import MembershipsOverview from '@/components/MembershipsOverview';
import ExploreClassesSection from '@/components/ExploreClassesSection';
import GlobalLoader from '@/components/GlobalLoader';

export default function Tab() {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer} 
        nestedScrollEnabled={true}
      >
        <View style={styles.sectionContainer}>
          <UpcomingSessionsSection />
        </View>

        <View style={styles.sectionContainer}>
          <MembershipsOverview />
        </View>

        <View style={styles.sectionContainer}>
          <ExploreClassesSection />
        </View>
      </ScrollView>
      <GlobalLoader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { padding: 15 }, // Allows scrolling if content is large
  sectionContainer: { marginBottom: 20 }, // Prevents lists from overlapping
  greetingHeader: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});

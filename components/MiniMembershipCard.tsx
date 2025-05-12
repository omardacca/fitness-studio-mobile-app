import { UserMembership } from '@/types/UserMembership';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MiniMembershipCardProps {
  membership: UserMembership
}

const MiniMembershipCard: React.FC<MiniMembershipCardProps> = ({ membership }) => {
  return (
    <View style={styles.card}>
      {/* Membership Title & Renew Button */}
      <View style={styles.header}>
        <Text style={styles.title}>{membership.title}</Text>
      </View>

      {/* Loop through each courseType in the membership */}
      {membership.features.map((feature: any) => {
        const percentageUsed = ((feature.sessionCount - feature.remainSessionCount) / feature.sessionCount) * 100;
        const isAboutToExpire = percentageUsed > 80;
        return (
          <View key={feature.courseTypeId} style={styles.featureContainer}>
            <Text style={styles.courseName}>{feature.courseTypeName}</Text>
            
            {/* Sessions remaining and percentage */}
            <View style={styles.progressContainer}>
              <Text style={styles.remainingText}>
                {(feature.sessionCount-feature.remainSessionCount)}/{feature.sessionCount} sessions used
              </Text>
              <Text style={styles.percentageText}>{Math.round(percentageUsed)}%</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBar}>
              <View style={[!isAboutToExpire && styles.progressFill, isAboutToExpire && styles.progressExpireFill, { width: `${percentageUsed}%` }]} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  header: {
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  renewButton: {
    backgroundColor: '#EAEAEA',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  renewText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  featureContainer: {
    marginTop: 10,
  },
  courseName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  remainingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#D3D3D3',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 3,
  },
  progressExpireFill: {
    height: '100%',
    backgroundColor: '#ed0000',
    borderRadius: 3,
  },
  
});

export default MiniMembershipCard;

import { View, StyleSheet, ScrollView } from 'react-native';
import MembershipCard from '@/components/MembershipCard';
import { useMembershipsContext } from '@/context/membershipsContext';
import { Membership } from '@/types/membership';

export default function Tab() {
  const { state: membershipState, dispatch: membershipDispatch } = useMembershipsContext();

  const onCardPress = (membershipObj: Membership | undefined) => {
    if (membershipObj) {
      membershipDispatch({ type: 'SET_SELECTED_MEMBERSHIP', payload: membershipObj });
    }
  }
  
  return (
    <ScrollView>
      <View style={styles.container}>
        {membershipState.memberships?.map((membership) => {
          return (
            <MembershipCard 
              key={membership.membershipId}
              membershipObj={membership}
              onPress={onCardPress}
            />
          )
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffff',
    paddingTop: 15
  }
});

import React from "react";
import { Link } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Membership } from '@/types/membership';

interface MembershipCardProps {
  membershipObj: Membership | undefined
  onPress: (membershipObj: Membership | undefined) => void;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ membershipObj, onPress }) => {
  return (
    <Link href={`/memberships/[${membershipObj?.membershipId}]`} asChild>
      <TouchableOpacity style={styles.card}
        onPress={() => onPress(membershipObj)}>
        <Text style={styles.title}>{membershipObj?.title}</Text>

        <Text style={styles.price}>
          <Text style={styles.priceAmount}>₪{membershipObj?.price}</Text>
        </Text>

        <View style={styles.benefitsContainer}>
          {membershipObj?.benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitRow}>
              <Ionicons name="checkmark" size={18} color="#000" />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MembershipCard;

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  price: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginVertical: 4,
  },
  priceAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  benefitsContainer: {
    marginTop: 8,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  benefitText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
});

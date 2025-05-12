import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { Link } from 'expo-router';

interface CategoryCardProps {
  courseTypeId: number;
  title: string;
  imageUrl: string;
  onCategoryPress: (courseTypeId: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ courseTypeId, title, imageUrl, onCategoryPress }) => {
  
  return (
    <Link href='/availabilities/[course]' asChild>
      <TouchableOpacity style={styles.card} onPress={() => onCategoryPress(courseTypeId)}>
        <Image
          style={styles.image}
          source={imageUrl}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.categoryTitle}>{title}</Text>
      </TouchableOpacity>
    </Link>
  )
}

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: '#0553',
  },
  categoryTitle: {
    fontSize: 25,
    fontWeight: "500",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
  }
});

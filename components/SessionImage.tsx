import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface SessionImageProps {
  imageUrl: string;
}

const SessionImage: React.FC<SessionImageProps> = ({ imageUrl }) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

export default SessionImage;

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});

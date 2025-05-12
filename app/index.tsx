import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function SplashScreen() {
    useEffect(() => {
        setTimeout(async() => {
            console.log('Welcome to Splash Screen');
        }, 2000);
    }, []);
    
    return (
        <View style={styles.container}>
            <Text>
                Welcome to Splash Screen
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#00c6d1",
  },
  title: {
    color: '#fff'
  }
})
import { View, Text, StyleSheet } from "react-native";
import { useAppGlobalContext } from "@/context/appGlobalContext";
import LottieView from "lottie-react-native";

export default function GlobalLoader() {
    const { state } = useAppGlobalContext();

    if (state.loadingCount === 0) return null;

    return (
        <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
            <LottieView 
                source={require("@/assets/lottie/loading.json")}
                autoPlay
                loop
                style={styles.lottie}
            />
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    loaderContainer: {
        backgroundColor: "#C9C9C9",
        padding: 12,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    lottie: {
        width: 100,
        height: 100,
    }
});
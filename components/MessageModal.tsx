import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface MessageModalProps {
    visible: boolean;
    message: string;
    onClose: () => void;
}

export default function MessageModal({ visible, message, onClose }: MessageModalProps) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalMessage}>{message}</Text>
                    <TouchableOpacity style={styles.okButton} onPress={onClose}>
                        <Text style={styles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // ✅ Dim background
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        width: "80%",
        alignItems: "center",
    },
    modalMessage: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    okButton: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    okButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

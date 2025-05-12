import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface NoMembershipModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function NoMembershipModal({ visible, onClose }: NoMembershipModalProps) {
    const router = useRouter();

    return (
        <Modal
            transparent
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>You Need a Membership</Text>
                    <Text style={styles.modalMessage}>
                        To book a session, you need an active membership. Choose a plan that fits you best.
                    </Text>

                    <View style={styles.modalActions}>
                        <TouchableOpacity 
                            style={styles.viewMembershipsButton}
                            onPress={() => {
                                onClose();
                                router.push("/memberships");
                            }}
                        >
                            <Text style={styles.viewMembershipsText}>View Memberships</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.cancelButton}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
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
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        color: "#666",
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    viewMembershipsButton: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginRight: 10,
    },
    viewMembershipsText: {
        color: "#fff",
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: "#ddd",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    cancelText: {
        color: "#333",
    },
});

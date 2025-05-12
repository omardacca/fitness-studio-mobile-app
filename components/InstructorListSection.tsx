import React from 'react'
import { FlashList } from '@shopify/flash-list';
import Instructor from '@/types/Instructor';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';


interface InstructorListProps {
    instructors: Instructor[];
    selectedInstructor: string | null;
    onInstructorPress: (instructorId: string) => void;
}

const InstructorListSection: React.FC<InstructorListProps> = ({
    instructors,
    selectedInstructor,
    onInstructorPress,
}) => {
    if (instructors.length) {
        return (
            <FlashList 
                data={instructors}
                keyExtractor={(item) => `${item.instructorId}`}
                horizontal
                estimatedItemSize={80}
                showsHorizontalScrollIndicator={false}
                extraData={{ selectedInstructor, instructors }}
                renderItem={({ item }) => {
                const isSelected = item.instructorId === selectedInstructor;
                return (
                    <TouchableOpacity 
                    onPress={() => onInstructorPress(item.instructorId)}
                    style={[styles.instructorContainer, isSelected && styles.selectedInstructorContainer]}>
                    <Image source={{ uri: item.imageUrl }} style={styles.instructorImage} />
                    <Text style={styles.instructorName}>{item.fullName}</Text>
                    </TouchableOpacity>
                )}}
            />
        )
    } else {
        return (<Text>No Instructors yet!</Text>)
    }
}

const styles = StyleSheet.create({
    instructorContainer: {
        padding: 5,
        alignItems: 'center',
    },
    instructorImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#ccc",
    },
        instructorName: {
        fontSize: 15,
        fontWeight: '500'
    },
    selectedInstructorContainer: {
        backgroundColor: "#db7900",
        borderRadius: 15,
        color: "#fff",
    }
})

export default InstructorListSection

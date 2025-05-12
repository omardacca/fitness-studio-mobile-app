import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import dayjs from "dayjs";

interface MiniCalendarProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
}

export default function MiniCalendar({ selectedDay, onDayChange }: MiniCalendarProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(dayjs().startOf("week"));
  const today = dayjs().format("YYYY-MM-DD");

  const days = Array.from({ length: 7 }, (_, i) => currentWeekStart.add(i, "day"));

  const handlePrevWeek = () => setCurrentWeekStart(currentWeekStart.subtract(7, "day"));
  const handleNextWeek = () => setCurrentWeekStart(currentWeekStart.add(7, "day"));

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrevWeek}>
        <Ionicons name="caret-back" size={18} color="#000" />
      </TouchableOpacity>

      <View style={styles.daysContainer}>
        {days.map((day) => {
          const dayString = day.format("YYYY-MM-DD");
          const isSelected = dayString === selectedDay;
          const isToday = dayString === today;

          return (
            <TouchableOpacity
              key={dayString}
              onPress={() => onDayChange(dayString)}
              style={[styles.dayItem, isSelected && styles.selectedDay]}
            >
              <Text style={[styles.dayText, isToday && !isSelected && styles.todayText]}>
                {day.format("ddd")}
              </Text>
              <Text style={[styles.dateText, isToday && !isSelected && styles.todayText]}>
                {day.format("D")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity onPress={handleNextWeek}>
        <Ionicons name="caret-forward" size={18} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  dayItem: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 12
  },
  selectedDay: {
    backgroundColor: "#db7900",
    borderRadius: 15,
    color: "#fff",
  },
  dayText: {
    fontSize: 14,
    color: "#333",
    paddingVertical: 2
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  todayText: {
    color: "#946809",
  },
});

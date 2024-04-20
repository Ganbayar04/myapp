//dans uusgeh
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';// Double-check the import path
import { Calendar } from 'react-native-calendars';

const BurtgehScreen = () => {
  const [tusuws, setTusuws] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (selectedDate) {
      fetchData(selectedDate);
    }
  }, [selectedDate]);

  const fetchData = async (date) => {
    try {
      const year = date.year;
      const month = date.month;
      const response = await tusuwModel.find({ year, month });
      setTusuws(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      <Text style={styles.heading}>Select a Date</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{ [selectedDate]: { selected: true } }}
      />
      <Text style={styles.heading}>List of Tusuws</Text>
      {tusuws.map(tusuw => (
        <View key={tusuw._id} style={styles.tusuwItem}>
          <Text>Name: {tusuw.name}</Text>
          <Text>Year: {tusuw.year}</Text>
          <Text>Month: {tusuw.month}</Text>
          <Text>Tuluw: {tusuw.tuluw}</Text>
        </View>
      ))}
      <TouchableOpacity onPress={toggleDarkMode} style={styles.themeToggle}>
        <Text style={styles.themeToggleText}>
          {isDarkMode ? "☀️ Light Theme" : "🌑 Dark Theme"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  darkModeContainer: {
    backgroundColor: '#000',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tusuwItem: {
    marginBottom: 10,
  },
  themeToggle: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  themeToggleText: {
    fontSize: 16,
    color: "#000000", // Corrected color value
  },
});

export default BurtgehScreen;

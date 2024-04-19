import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Settings= () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      <View style={styles.navigationContainer}>
       
      </View>

      <TouchableOpacity onPress={toggleDarkMode} style={styles.darkModeToggle}>
        <Text style={styles.darkModeToggleText}>
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
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  themeToggle: {
    position: "absolute",
    top: 20, // Adjust top position to move the button down from the top
    right: 20, // Adjust right position to move the button from the right
  },
  themeToggleText: {
    fontSize: 16,
    color: "#000fff", // Theme toggle button color
  },
});

export default Settings;

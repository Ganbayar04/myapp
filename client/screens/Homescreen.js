import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
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
    position: 'absolute',
    top: 20,
    right: 20,
  },
  themeToggleText: {
    fontSize: 16,
    color: "#000000", // Corrected color value
  },
});

export default HomeScreen;

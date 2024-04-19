import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      <Text style={styles.heading}>Dark Mode Screen</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  darkModeContainer: {
    backgroundColor: "#000",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  themeToggle: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  themeToggleText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default DarkMode;

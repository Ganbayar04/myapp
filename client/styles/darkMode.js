import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const DarkMode = ({ isDarkMode, setIsDarkMode }) => {
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <TouchableOpacity onPress={toggleDarkMode} style={styles.darkModeButton}>
      <Text style={styles.darkModeButtonText}>
        {isDarkMode ? "☀️ Light Theme" : "🌑 Dark Theme"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  darkModeButton: {
    position: "absolute",
    top: 20,
    right: 10,
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  darkModeButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default DarkMode;

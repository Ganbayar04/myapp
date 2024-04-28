import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const DarkMode = ({ isDarkMode, setIsDarkMode }) => {
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Inline style to apply conditionally based on `isDarkMode`
  const buttonTextStyle = {
    fontSize: 16,
    color: isDarkMode ? "#fff" : "#000", // Conditional color based on `isDarkMode`
  };

  return (
    <TouchableOpacity onPress={toggleDarkMode} style={styles.darkModeButton}>
      <Text style={buttonTextStyle}>{isDarkMode ? "☀️" : "🌑"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  darkModeButton: {
    position: "absolute",
    top: 0,
    right: 10,
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default DarkMode;

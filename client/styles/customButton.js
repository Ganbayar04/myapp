import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1EE34F", // Green color
    borderRadius: 16, // Rounded corners
    padding: 20,
    paddingHorizontal: 10, // Padding
    alignItems: "center", // Center-align the content horizontally
    width: "50%", // Set button width to 80% of its parent container width
    alignSelf: "center",
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 16, // Font size
    fontWeight: "bold", // Make text bold
  },
});

export default CustomButton;

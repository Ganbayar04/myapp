import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#fff",
    },
    darkModeContainer: {
      backgroundColor: "#000",
    },
    input: {
      height: 40,
      width: "80%",
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      paddingHorizontal: 10,
      fontSize: 16,
      backgroundColor: "#fff",
    },
    darkModeInput: {
      backgroundColor: "#333", // Dark mode input background color
      color: "#fff", // Dark mode text color
    },
    welcomeImage: {
      width: "100%",
      height: 200,
      marginBottom: 100,
    },
    buttonContainer: {
      flexDirection: "row", // Arrange children horizontally
      justifyContent: "space-around", // Evenly distribute space between children
      marginBottom: 20,
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
  
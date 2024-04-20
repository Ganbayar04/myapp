import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert, ActivityIndicator, Image, TouchableOpacity, Text } from "react-native";
import API from "../../config.js";
import CustomButton from "../../styles/customButton.js";
import DarkMode from "../../styles/darkMode"; 

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkmode, setIsDarkmode] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await API.post("/users/create", { username, email, password, role });
      Alert.alert("Бүртгэл амжилттай", "Та нэвтэрч орно уу!.");
      setIsLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error.response?.data);
      Alert.alert(
        "Бүртгэл амжилтгүй боллоо!",
        error.response?.data.message || "Талбаруудыг зөв бөглөж, дахин оролдоно уу!"
      );
      setIsLoading(false);
    }
  };

  const welcomeImage = require("../../assets/urkhiintusuv.png");

  const toggleTheme = () => {
    setIsDarkmode(!isDarkmode); // Toggle theme
  };

  // Define dynamic styles based on dark mode state
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 10,
      backgroundColor: isDarkmode ? "#333" : "#fff",
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: isDarkmode ? "#555" : "#eee",
      color: isDarkmode ? "#fff" : "#000",
    },
    welcomeImage: {
      width: "100%",
      height: 200,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    themeToggle: {
      position: "absolute",
      top: 20, // Adjust top position to move the button down from the top
      right: 20, // Adjust right position to move the button from the right
    },
    themeToggleText: {
      fontSize: 16,
      color: "#0000ff",
    },
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Image source={welcomeImage} resizeMode="contain" style={styles.welcomeImage} />
          
    
          <TextInput
            placeholder="И-мэйл"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Нууц үг"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholder="Role"
            value={role}
            onChangeText={setRole}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <CustomButton title="Бүртгүүлэх" onPress={handleRegister} />
            <CustomButton title="Буцах" onPress={() => navigation.navigate("Login")} />
          </View>
        </>
      )}
      <DarkMode isDarkMode={isDarkmode} setIsDarkMode={setIsDarkmode} />
    </View>
  );
};

export default RegisterScreen;

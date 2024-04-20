import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import API from "../config.js";
import CustomButton from "../styles/customButton1.js";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkmode, setIsDarkmode] = useState(false); // State for theme

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await API.post("/users/login", { email, password });
      setIsLoading(false);
      const { email, role } = response.data.data.user;

      // Хэрэглэгчийн role шалгаж Admin screen, User screen - рүү шилжүүлэх
      if (role === "admin") {
        navigation.navigate("Admin", { username: username });
      } else {
        navigation.navigate("Home", { username: username });
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Нэвтрэлт амжилтгүй!...",
        error.response?.data.message || "Мэдээллээ шалгаж, дахин оролдоно уу!"
      );
    }
  };

  const welcomeImage = require("../assets/urkhiintusuv.png");

  const toggleTheme = () => {
    setIsDarkmode(!isDarkmode); // Toggle theme
  };

  return (
    <View
      style={[styles.container, isDarkmode ? styles.darkModeContainer : null]}
    >
      <Image
        source={welcomeImage}
        resizeMode="contain"
        style={styles.welcomeImage}
      />

      <TextInput
        placeholder="И-мэйл хаяг"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Нууц үг"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton title="Login" onPress={handleLogin} />
          <CustomButton
            title="Register"
            onPress={() => navigation.navigate("Register")}
          />
          <CustomButton
            title="ForgetPassword"
            onPress={() => {
              navigation.navigate("ForgetPassword");
            }}
          />
        </View>
      )}

      {/* Theme toggle button */}
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Text style={styles.themeToggleText}>
          {isDarkmode ? "☀️ Light Theme" : "🌑 Dark Theme"}
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
    padding: 20,
  },
  darkModeContainer: {
    backgroundColor: "#000", // Dark mode background color
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
    bottom: 20,
  },
  themeToggleText: {
    fontSize: 16,
    color: "#000fff", // Theme toggle button color
  },
});

export default LoginScreen;

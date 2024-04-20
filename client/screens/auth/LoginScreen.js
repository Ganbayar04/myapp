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
import API from "../../config.js";
import CustomButton from "../../styles/customButton1.js";
import DarkMode from "../../styles/darkMode";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkmode, setIsDarkmode] = useState(false); // State for theme

  const handleLogin = async () => {
    console.log("Email:", email, "Password:", password);

    // Ensuring email and password are not undefined and trimming them
    const trimmedEmail = email ? email.trim() : "";
    const trimmedPassword = password ? password.trim() : "";

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert("Validation Failed", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await API.post("/users/login", {
        email: trimmedEmail,
        password: trimmedPassword,
      });
      console.log("Login response data:", response.data);
      setIsLoading(false);
      const { email: userEmail, role } = response.data.data.user;

      // Check user role and navigate accordingly
      if (role === "admin") {
        navigation.navigate("Admin", { email: userEmail });
      } else {
        navigation.navigate("Home", { email: userEmail });
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      const errorMessage =
        error.response?.data.message ||
        "An unexpected error occurred. Please check your network and try again.";
      Alert.alert("Login Failed", errorMessage);
    }
  };

  const toggleTheme = () => {
    setIsDarkmode(!isDarkmode);
  };

  return (
    <View
      style={[styles.container, isDarkmode ? styles.darkModeContainer : null]}
    >
      <Image
        source={require("../../assets/urkhiintusuv.png")}
        resizeMode="contain"
        style={styles.welcomeImage}
      />

      <TextInput
        placeholder="Email address"
        value={email}
        onChangeText={(text) => setEmail(text)} // Ensuring email is updated
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)} // Ensuring password is updated
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
        </View>
      )}

      <DarkMode isDarkMode={isDarkmode} setIsDarkMode={setIsDarkmode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  darkModeContainer: {
    backgroundColor: "#333",
  },
  welcomeImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LoginScreen;

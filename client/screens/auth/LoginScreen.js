import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Button,
  Image,
} from "react-native";

import { useUser } from "../../src/contexts/userContext.js";
import API from "../../config.js";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await API.post("/users/login", { email, password });
      setIsLoading(false);
      const { user } = response.data.data;

      if (user) {
        setUser(user);
        navigation.navigate(user.role === "admin" ? "Admin" : "Account", {
          email: user.email,
        });
      } else {
        Alert.alert("Login Failed", "No such user found!");
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Login Failed",
        error.response?.data?.message ||
          "Please check your credentials and try again."
      );
    }
  };

  const handleForgotPassword = () => {
    // Navigate to ForgotPassword Screen or simply ask for email to send reset link
    Alert.prompt(
      "Forgot Password",
      "Enter your registered email address:",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Submit",
          onPress: (email) => forgotPassword(email),
        },
      ],
      "plain-text",
      "" // Default input text value
    );
  };

  const forgotPassword = async (userEmail) => {
    if (!userEmail) {
      Alert.alert("Input Error", "Please provide a valid email address.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await API.post("/users/forgot-password", {
        email: userEmail,
      });
      setIsLoading(false);
      if (response.status === 200) {
        Alert.alert(
          "Check Your Email",
          "A password reset link has been sent to your email address."
        );
      } else {
        Alert.alert(
          "Failed",
          "Failed to send password reset email. Please try again later."
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Forgot password error: ", error.response || error);
      Alert.alert(
        "Failed",
        error.response?.data?.message || "Failed to send password reset email."
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require("../../assets/urkhiintusuv.png")}
          resizeMode="contain"
          style={styles.welcomeImage}
        />
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#000"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <Button title="Login" onPress={handleLogin} />
              <Button
                title="Register"
                onPress={() => navigation.navigate("Register")}
              />
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 50, // Increased height for larger text input
    width: "200%",
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 18, // Increased font size for larger text
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  welcomeImage: {
    width: "100%",
    height: 200,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    alignItems: 'center', // Center buttons horizontally
  },
  forgotPasswordText: {
    textAlign: "center",
    color: "#0000ff",
  },

});


export default LoginScreen;

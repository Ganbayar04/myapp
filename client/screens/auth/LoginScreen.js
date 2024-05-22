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
        Alert.alert("Нэвтрэлт амжилтгүй боллоо! ", " Хэрэглэгч олдсонгүй!");
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Нэвтрэлт амжилтгүй!",
        error.response?.data?.message || "Дахин оролдоно уу!."
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
          placeholder="И-мейл хаяг"
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Нууц үг"
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
              <Button title="Нэвтрэх" onPress={handleLogin} />
              <Button
                title="Бүртгүүлэх"
                onPress={() => navigation.navigate("Register")}
              />
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Нууц үг мартсан?</Text>
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
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 50,
    width: "100%",
    marginBottom: 20,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  welcomeImage: {
    width: "100%",
    height: 150,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    width: "100%",
  },
  forgotPasswordText: {
    textAlign: "center",
    color: "#ff6347",
    fontSize: 16,
  },
});

export default LoginScreen;

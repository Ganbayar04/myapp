import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert, ActivityIndicator, Image } from "react-native";
import API from "../config.js";
import CustomButton from "../styles/customButton1.js";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await API.post("/users/login", { email, password });
      setIsLoading(false);
      const { username, role } = response.data.data.user;

      // Redirect based on user role
      if (role === "admin") {
        navigation.navigate("Admin", { username: username });
      } else {
        navigation.navigate("Home", { username: username });
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Login Failed",
        error.response?.data.message || "Please check your credentials and try again."
      );
    }
  };

  const welcomeImage = require("../assets/urkhiintusuv.png");

  return (
    <View style={styles.container}>
      <Image source={welcomeImage} resizeMode="contain" style={styles.welcomeImage} />
      
      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
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
          <CustomButton title="Register" onPress={() => navigation.navigate("Register")} />
        </View>
      )}
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
  welcomeImage: {
    width: "100%",
    height: 200,
    marginBottom: 100,
  },
  buttonContainer: {
    flexDirection: "row", // Arrange children horizontally
    justifyContent: "space-around", // Evenly distribute space between children
  },
});

export default LoginScreen;

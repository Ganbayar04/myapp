import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import API from "../config.js";
import CustomButton from "../styles/customButton1.js";

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await API.post("/users/forgot-password", { email });
      setIsLoading(false);
      Alert.alert(
        "Password Reset Email Sent",
        "Please check your email for instructions to reset your password."
      );
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Forget Password Failed",
        error.response?.data.message || "Failed to send reset password email. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <CustomButton title="Reset Password" onPress={handleForgetPassword} />
      )}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
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
  goBackButton: {
    marginTop: 20,
  },
  goBackButtonText: {
    fontSize: 16,
    color: "#007bff", // Link color
  },
});

export default ForgetPasswordScreen;

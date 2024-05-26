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
  ScrollView,
} from "react-native";
import API from "../../config.js"; // Assuming this imports your API configuration
import { useBackHandler } from '@react-native-community/hooks';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);

  useBackHandler(() => {
    navigation.navigate("Login");
    return true;
  });

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await API.post("/users", {
        email,
        password,
        role,
      });
      Alert.alert("Registration Successful", "Please login.");
      setIsLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error.response?.data);
      Alert.alert(
        "Registration Failed",
        error.response?.data.message ||
          "Please check your input fields and try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Image
              source={require("../../assets/urkhiintusuv.png")}
              resizeMode="contain"
              style={styles.welcomeImage}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#000"
              value={email}
              onChangeText={setEmail}
              style={[styles.input, styles.inputPlaceholder]} // Apply both styles
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              value={password}
              onChangeText={setPassword}
              style={[styles.input, styles.inputPlaceholder]}
              secureTextEntry
            />
           

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleRegister}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate("Login")}
              >
               
              </TouchableOpacity>
            </View>
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
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Evenly distribute space between buttons
    marginBottom: 20,
    alignItems: 'center', // Center buttons horizontally
  },
  
  registerButton: {
    backgroundColor: '#007bff',
    borderRadius: 10, // Adjust border radius as desired
    paddingHorizontal: 20,
    paddingVertical: 15,
    
  },
  
 
});

export default RegisterScreen;

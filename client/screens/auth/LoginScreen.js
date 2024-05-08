import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import CustomButton from '../../styles/customButton.js';
import DarkMode from '../../styles/darkMode';
import { useUser } from '../../src/contexts/userContext.js';
import API from '../../config.js';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkmode, setIsDarkmode] = useState(false);
  const { setUser } = useUser();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await API.post('/users/login', { email, password });
      setIsLoading(false);
      const { user } = response.data.data;

      if (user) {
        setUser(user);
        navigation.navigate(user.role === 'admin' ? 'Admin' : 'Home', { email: user.email });
      } else {
        Alert.alert("Login Failed", "No such user found!");
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Login Failed", error.response?.data?.message || "Please check your credentials and try again.");
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
          style: "cancel"
        },
        {
          text: "Submit",
          onPress: email => forgotPassword(email),
        }
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
      const response = await API.post('/users/forgot-password', { email: userEmail });
      setIsLoading(false);
      Alert.alert("Check Your Email", "A password reset link has been sent to your email address.");
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Failed", error.response?.data?.message || "Failed to send password reset email.");
    }
  };

  return (
    <View style={[styles.container, isDarkmode ? styles.darkModeContainer : null]}>
      <ScrollView>
        <Image source={require("../../assets/urkhiintusuv.png")} resizeMode="contain" style={styles.welcomeImage} />
        <TextInput placeholder="Email Address" value={email} onChangeText={setEmail} style={[styles.input, isDarkmode ? styles.darkModeInput : null]} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={[styles.input, isDarkmode ? styles.darkModeInput : null]} secureTextEntry />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <CustomButton title="Login" onPress={handleLogin} />
              <CustomButton title="Register" onPress={() => navigation.navigate("Register")} />
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      <DarkMode isDarkMode={isDarkmode} setIsDarkMode={setIsDarkmode} />
    </View>
  );
};

const styles = StyleSheet.create({
  // previous styles remain the same
  forgotPasswordText: {
    textAlign: 'center',
    color: '#0000ff',
    marginTop: 15,
  },


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

export default LoginScreen;

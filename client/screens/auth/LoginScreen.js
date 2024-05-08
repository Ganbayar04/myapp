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
import API from "../../config.js";
import CustomButton from "../../styles/customButton1.js";
import DarkMode from "../../styles/darkMode";
import { useUser } from "../../src/contexts/userContext.js";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkmode, setIsDarkmode] = useState(false); // State for theme
  const { setUser } = useUser();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await API.post("/users/login", { email, password });
      setIsLoading(false);
      const { user } = response.data.data;

      if (user) {
        setUser(user); // Хэрэглэгчийг контекстээр тохируулах
        // Хэрэглэгчийн үүрэг дээр үндэслэн дахин чиглүүлэх
        if (user.role === "admin") {
          navigation.navigate("Admin", { email: user.email });
        } else {
          navigation.navigate("Home", { email: user.email });
        }
      } else {
        // Хэрэв хэрэглэгчийн объект хариуд нь олдсонгүй бол
        Alert.alert(
          "Нэвтрэлт амжилтгүй боллоо",
          "Хэрэглэгчийн мэдээлэл олдсонгүй!"
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login error: ", error.response || error);
      Alert.alert(
        "Login Failed",
        error.response?.data?.message ||
          "Please check your credentials and try again."
      );
    }
  };

  const welcomeImage = require("../../assets/urkhiintusuv.png");

  const toggleTheme = () => {
    setIsDarkmode(!isDarkmode); // Toggle theme
  };

  return (
    <View
      style={[styles.container, isDarkmode ? styles.darkModeContainer : null]}
    >
      <ScrollView>
        <Image
          source={welcomeImage}
          resizeMode="contain"
          style={styles.welcomeImage}
        />

        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, isDarkmode ? styles.darkModeInput : null]}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={[styles.input, isDarkmode ? styles.darkModeInput : null]}
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
      </ScrollView>
      <DarkMode isDarkMode={isDarkmode} setIsDarkMode={setIsDarkmode} />
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
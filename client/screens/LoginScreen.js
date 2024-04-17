import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import API from "../config.js";

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

      // Хэрэглэгчийн role шаогаж Admin screen, User screen - рүү шилжүүлэх
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

  return (
    <View style={styles.container}>
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
        <View>
          <Button title="Нэвтрэх" onPress={handleLogin} />
          <Button
            title="Шинээр бүртгүүлэх"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;

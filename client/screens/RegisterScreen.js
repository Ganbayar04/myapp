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

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await API.post("/users/create", {
        username,
        email,
        password,
        role,
      });
      Alert.alert("Бүртгэл амжилттай", "Та нэвтэрч орно уу!.");
      setIsLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error.response?.data);
      Alert.alert(
        "Бүртгэл амжилтгүй боллоо!",
        error.response?.data.message ||
          "Талбаруудыг зөв бөглөж, дахин оролдоно уу!"
      );
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TextInput
            placeholder="Хэрэглэгчийн нэр"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="И-мэйл"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Нууц үг"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholder="Role"
            value={role}
            onChangeText={setRole}
            style={styles.input}
          />
          <Button title="Бүртгүүлэх" onPress={handleRegister} />
          <Button title="Буцах" onPress={() => navigation.navigate("Login")} />
        </>
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

export default RegisterScreen;

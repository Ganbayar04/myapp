import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLoading, login, error, userInfo } = useContext(AuthContext);

  // useEffect(() => {
  //   if (userInfo && userInfo.user) {
  //     console.log("Амжилттай нэвтэрлээ!");
  //     navigation.navigate("Home");
  //   }
  // }, [userInfo, navigation]);

  const welcomeImage = require("../assets/urkhiintusuv.png");

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <View style={styles.content}>
          <Image
            source={welcomeImage}
            resizeMode="contain"
            style={styles.welcomeImage}
          />
          <Text style={styles.title}>Тавтай морилно уу !</Text>
          <View style={styles.wrapper}>
            {error ? (
              <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
                {error}
              </Text>
            ) : null}
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Имейл хаяг"
              placeholderTextColor="#666"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Нууц үгээ оруулна уу"
              placeholderTextColor="#666"
              autoCapitalize="none"
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.button}
              title="Нэвтрэх"
              onPress={() => {
                console.log("Нэвтрэлт:", email, password);
                login(email, password);
              }}
            >
              <Text style={styles.buttonText}>Нэвтрэх</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Text style={{ color: "black" }}>Та шинээр бүртгүүлэх үү? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.link}>Бүртгүүлэх</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaeaea",
  },
  welcomeImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingBottom: 20,
    color: "#000",
  },
  wrapper: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  register: {
    marginTop: 10,
  },
  link: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
  },
});
export default LoginScreen;

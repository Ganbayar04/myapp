import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext.js";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [Confpassword, setConfPassword] = useState(null);
  const { isLoading, register, error } = useContext(AuthContext);

  const welcomeImage = require("../assets/urkhiintusuv.png");

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.content}>
        <Image
          source={welcomeImage}
          resizeMode="contain"
          style={styles.welcomeImage}
        />
        <Text style={styles.title}>Шинээр бүртгүүлэх</Text>
        <View style={styles.wrapper}>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Хэрэглэгчийн нэр"
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            value={email}
            placeholder="Имейл хаяг"
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            value={password}
            placeholder="Нууц үг"
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            value={Confpassword}
            placeholder="Нууц үг давтах"
            onChangeText={setConfPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (!name || !email || !password || !Confpassword) {
                console.log("Бүх талбарыг бөглөнө үү.");
                return; // Stops the function if any field is empty.
              }
              if (password !== Confpassword) {
                console.log("Нууц үг таарахгүй байна.");
                return; // Stops the function if the passwords do not match.
              }
              console.log("Бүртгэл:", name, email, password, Confpassword);
              register(name, email, password, Confpassword, navigation);
            }}
          >
            <Text style={styles.buttonText}>Баталгаажуулах</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text style={styles.questionText}>Танд бүртгэл байгаа юу?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.register}
            >
              <Text style={styles.link}>Нэвтрэх</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
    marginBottom: 6,
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
    marginTop: 0,
  },
  questionText: {
    color: "black",
    fontSize: 16,
    marginRight: 5,
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

export default RegisterScreen;

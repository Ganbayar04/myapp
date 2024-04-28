import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DarkMode from "../../styles/darkMode";
import CustomButton from "../../styles/customButton";
import API from "../../config";
import { useUser } from "../../src/contexts/userContext";

const Turul = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

const handleRegister = async () => {
  setIsLoading(true);
  const userId = user?.id;

  if (!userId) {
    Alert.alert("Алдаа", "Хэрэглэгч олдсонгүй. Нэвтэрч орно уу!");
    navigation.navigate("Login");
    setIsLoading(false);
    return;
  }

  if (!name.trim()) {
    Alert.alert("Алдаа", "Дансны төрлийн нэрийг оруулна уу!");
    setIsLoading(false);
    return;
  }

  try {
    const response = await API.post("/dansTurul", { name, userId: user.id });
    if (response.status === 201 || response.status === 200) {
      Alert.alert("Амжилттай", "Дансны төрөл амжилттай үүсгэгдлээ.");
      navigation.navigate("Admin");
    } else {
      throw new Error(`Unexpected HTTP status ${response.status}`);
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message ||
        error.response.data.error ||
        JSON.stringify(error.response.data)
      : error.message;
    Alert.alert(
      "Алдаа",
      `Дансны төрөл бүртгэх явцад алдаа гарлаа: ${errorMessage}`
    );
    console.error("API error:", error);
  } finally {
    setIsLoading(false);
  }
};


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View
      style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <TextInput
            placeholder="Дансны төрлийн нэр"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <CustomButton title="Хадгалах" onPress={handleRegister} />
          <CustomButton
            title="Буцах"
            onPress={() => navigation.navigate("AdminScreen")}
          />
        </ScrollView>
      )}
      <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  darkModeContainer: {
    backgroundColor: "#000",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Turul;

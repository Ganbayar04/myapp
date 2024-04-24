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
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import DarkMode from "../../styles/darkMode";
import CustomButton from "../../styles/customButton";
import API from "../../config";
import { useUser } from "../../src/contexts/userContext";

const Uusgeh = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [name, setName] = useState("");
  const [uldegdel, setUldegdel] = useState("");
  const [tailbar, setTailbar] = useState("");
  const [status, setStatus] = useState("Active");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentDate = new Date().toISOString();

  const handleRegister = async () => {
    setIsLoading(true);
    const userId = user?.id; // context - ээс хэрэглэгчийн id авах
    if (!userId) {
      Alert.alert("Алдаа", "Хэрэглэгч олдсонгүй. Нэвтэрч орно уу!");
      navigation.navigate("Login");
      return;
    }

    try {
      const response = await API.post("/dans", {
        name,
        uldegdel: Number(uldegdel),
        tailbar,
        accountStatus: status,
        date: currentDate,
        user_id: userId,
      });
      if (response.data) {
        Alert.alert("Данс амжилттай үүсгэлээ.");
        navigation.navigate("Account");
      }
    } catch (error) {
      console.log(error.response?.data);
      Alert.alert(
        "Амжилтгүй боллоо!",
        error.response?.data?.message ||
          "Талбаруудыг зөв бөглөж, дахин оролдоно уу!"
      );
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
            placeholder="Дансны нэр"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Үлдэгдэл"
            value={uldegdel}
            onChangeText={setUldegdel}
            style={styles.input}
          />
          <TextInput
            placeholder="Тайлбар"
            value={tailbar}
            onChangeText={setTailbar}
            style={styles.input}
          />
          <Text style={styles.label}>Дансны төлөв:</Text>
          <Picker
            selectedValue={status}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
          >
            <Picker.Item label="Идвэхтэй" value="Active" />
            <Picker.Item label="Идвэхгүй" value="Inactive" />
          </Picker>

          <View>
            <CustomButton title="Хадгалах" onPress={handleRegister} />
            <CustomButton
              title="Буцах"
              onPress={() => navigation.navigate("Account")}
            />
          </View>
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    color: "#333",
  },
  picker: {
    height: 50,
    marginBottom: 200,
    borderColor: "gray", // Optional: You can remove this line if border is not needed
    borderWidth: 0, // Set borderWidth to 0 to remove the border
  },
});

export default Uusgeh;

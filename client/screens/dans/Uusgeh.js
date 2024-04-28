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

  const turulTypes = {
    "Банкны карт": "ObjectIdHere1",
    "Бэлэн мөнгө": "ObjectIdHere2",
    Хадгаламж: "ObjectIdHere3",
    Зээл: "ObjectIdHere4",
    Цалин: "ObjectIdHere5",
  };

  const [selectedTurul, setSelectedTurul] = useState("");

  const handleRegister = async () => {
    setIsLoading(true);
    const userId = user?.id;

    if (!userId) {
      Alert.alert("Алдаа", "Хэрэглэгч олдсонгүй. Нэвтэрч орно уу!");
      navigation.navigate("Login");
      setIsLoading(false);
      return;
    }

    if (!selectedTurul) {
      Alert.alert("Алдаа", "Та дансны төрлийг сонгоно уу.");
      setIsLoading(false);
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
        turul_id: turulTypes[selectedTurul], // Correct field for the turul ID
      });

      if (response.data) {
        Alert.alert("Данс амжилттай үүсгэлээ.");
        navigation.navigate("Account");
      }
    } catch (error) {
      console.log(error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        "Талбаруудыг зөв бөглөж, дахин оролдоно уу!";
      Alert.alert("Амжилтгүй боллоо!", errorMessage);
    } finally {
      setIsLoading(false);
    }
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
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Идвэхтэй" value="Active" />
            <Picker.Item label="Идвэхгүй" value="Inactive" />
          </Picker>
          <Text style={styles.label}>Дансны төрөл:</Text>
          <Picker
            selectedValue={selectedTurul}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedTurul(itemValue)}
          >
            {Object.entries(turulTypes).map(([label, value]) => (
              <Picker.Item key={value} label={label} value={value} />
            ))}
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
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 0,
  },
});

export default Uusgeh;

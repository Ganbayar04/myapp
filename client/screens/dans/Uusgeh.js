import React, { useState, useEffect } from "react";
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
import API from "../../config";
import { useUser } from "../../src/contexts/userContext";
import RNPickerSelect from "react-native-picker-select";
import CustomButton from "../../styles/customButton"

const Uusgeh = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [name, setName] = useState("");
  const [uldegdel, setUldegdel] = useState("");
  const [tailbar, setTailbar] = useState("");
  const [status, setStatus] = useState("Active");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTurul, setSelectedTurul] = useState("");
  const [turulList, setTurulList] = useState([]);

  useEffect(() => {
    const fetchTurulList = async () => {
      try {
        const response = await API.get("/dansTurul");
        if (response.status === 200) {
          setTurulList(response.data);
        } else {
          throw new Error(`Unexpected HTTP status ${response.status}`);
        }
      } catch (error) {
        console.error("Failed to fetch Turul list:", error);
        Alert.alert("Error", "Failed to fetch Turul list.");
      }
    };

    fetchTurulList();
  }, []);

  const handleRegister = async () => {
    setIsLoading(true);
    if (!user?.id) {
      Alert.alert("Алдаа", "Хэрэглэгч олдсонгүй. Нэвтэрч орно уу!");
      navigation.navigate("Login");
      setIsLoading(false);
      return;
    }

    try {
      const response = await API.post("/dans", {
        name,
        uldegdel: Number(uldegdel),
        tailbar,
        accountStatus: status,
        user_id: user.id,
        turul_id: selectedTurul,
      });
      if (response.data) {
        Alert.alert("Данс амжилттай үүсгэлээ.");
        navigation.navigate("Account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      Alert.alert(
        "Амжилтгүй боллоо!",
        error.message || "Error creating account."
      );
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
          <RNPickerSelect
            onValueChange={(value) => setStatus(value)}
            items={[
              { label: "Идвэхтэй", value: "Active" },
              { label: "Идвэхгүй", value: "Inactive" },
            ]}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "Select status...", value: null }}
          />

          <Text style={styles.label}>Дансны төрөл:</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedTurul(value)}
            items={turulList.map((turul) => ({
              label: turul.name,
              value: turul._id,
            }))}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a turul...", value: null }}
            useNativeAndroidPickerStyle={false}
          />
          <CustomButton title="Хадгалах" onPress={handleRegister} />
          <CustomButton title="Буцах" onPress={() => navigation.goBack()} />
        </ScrollView>
      )}
      <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
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
    color: "#333",
    marginVertical: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "white", // Ensures the input field is visible
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "white", // Ensures the input field is visible
  },
});

export default Uusgeh;

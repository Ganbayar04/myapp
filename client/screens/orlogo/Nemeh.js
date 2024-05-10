import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Text,
  Button, // Importing Button here
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../../config";
import { useUser } from "../../src/contexts/userContext";
import RNPickerSelect from "react-native-picker-select";

const Nemeh = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [name, setName] = useState("");
  const [uldegdel, setUldegdel] = useState("");
  const [tailbar, setTailbar] = useState("");
  const [status, setStatus] = useState("Active");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRegister = async () => {
    // Check if all required fields are filled
    if (!name.trim() || !uldegdel.trim() || !tailbar.trim()) {
      Alert.alert("Заавал", "Бүх талбарыг бөглөнө үү!");
      return;
    }

    // Set loading state to true
    setIsLoading(true);

    try {
      // Construct the payload
      const payload = {
        name: name.trim(),
        balance: uldegdel.trim(),
        description: tailbar.trim(),
        status: status, // Assuming 'status' is a part of your form
      };

      // Make an API call
      const response = await API.post("/orlogo", payload);

      // Check if the response is successful
      if (response.status === 200) {
        Alert.alert("Амжилттай", "Орлого амжилттай бүртгэгдлээ.");
        navigation.goBack(); // Navigate back or to another screen if necessary
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      Alert.alert(
        "Алдаа",
        "Орлого бүртгэх явцад алдаа гарлаа: " + error.message
      );
    } finally {
      // Set loading state to false
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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

         
          <Button title="Хадгалах" onPress={handleRegister} />
          <Button title="Буцах" onPress={() => navigation.goBack()} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
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

export default Nemeh;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import API from "../../config";
import DarkMode from "../../styles/darkMode";
import RNPickerSelect from "react-native-picker-select";

const DansEdit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
   const [tailbar, setTailbar] = useState("");
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

  useEffect(() => {
    const fetchAccount = async () => {
      setIsLoading(true);
      try {
        const response = await API.get(`/dans/${route.params.accountId}`);
        if (response.data) {
          setAccount(response.data);
          setName(response.data.name);
          setSelectedTurul(response.data.turul); // Assuming turul is a string ID
        } else {
          Alert.alert("Error", "No account data found.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Failed to fetch account details", error);
        Alert.alert(
          "Error",
          `Failed to fetch account details: ${
            error.response ? error.response.data.message : error.message
          }`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccount();
  }, [route.params.accountId]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await API.put(
        `/dans/${route.params.accountId}`,
        {
          name,
          turul: selectedTurul,
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", "Account updated successfully.");
        navigation.goBack();
      } else {
        throw new Error("Failed to update account");
      }
    } catch (error) {
      console.error("Failed to update account", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
      Alert.alert("Error", "Failed to update account.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <DarkMode />
      <Text style={styles.label}>Дансны нэр:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Дансны тайлбар:</Text>
      <TextInput
        style={styles.input}
        value={tailbar}
        onChangeText={setTailbar}
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
      <Button title="Save Changes" onPress={handleSave} />
      <Button title="Буцах" onPress={() => navigation.goBack()} />
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
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
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
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default DansEdit;

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

const DansEdit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [uldegdel, setUldegdel] = useState("");
 

  useEffect(() => {
    const fetchAccount = async () => {
      setIsLoading(true);
      try {
        const response = await API.get(`/dans/${route.params.accountId}`);
        if (response.data) {
          setAccount(response.data);
          setName(response.data.name);
          setUldegdel(response.data.uldegdel.toString());
          setStatus(response.data.status);
        } else {
          Alert.alert("Error", "No account data found.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Failed to fetch account details", error);
        // Providing more details in the alert
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
      const response = await API.put(`/dans/update/${route.params.accountId}`, {
        name,
        uldegdel: parseFloat(uldegdel),
        status,
      });
      if (response.data) {
        Alert.alert("Success", "Account updated successfully.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Failed to update account", error);
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
      <Text style={styles.label}>Үлдэгдэл:</Text>
      <TextInput
        style={styles.input}
        value={uldegdel}
        onChangeText={setUldegdel}
        keyboardType="numeric"
      />
    
      <Button title="Save Changes" onPress={handleSave} />
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

export default DansEdit;

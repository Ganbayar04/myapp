import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../../config";
import DarkMode from "../../styles/darkMode";
import { useUser } from "../../src/contexts/userContext";
import Icon from "react-native-vector-icons/FontAwesome"; // Ensure you've installed react-native-vector-icons

const Account = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!user || !user.id) {
        Alert.alert("Error", "Please log in to view accounts.");
        return;
      }
      console.log("Хэрэглэгчийн ID-д данс авах хүсэлт гаргах:", user.id);
      try {
        const response = await API.get(`/dans?userId=${user.id}`);
        console.log("Бүртгэл хүлээн авсан:", response.data);
        if (response.data && response.data.length > 0) {
          setAccounts(response.data);
        } else {
          setAccounts([]);
          Alert.alert("Данс байхгүй", "Энэ хэрэглэгчид данс олдсонгүй.");
        }
      } catch (error) {
        console.error(
          "API error:",
          error.response ? error.response.data : error
        );
        Alert.alert(
          "Error",
          error.response && error.response.data && error.response.data.message
            ? `Failed to fetch accounts: ${error.response.data.message}`
            : "Failed to fetch accounts due to network or server error."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccounts();
  }, [user]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View
      style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}
    >
      <ScrollView>
        {accounts.length > 0 ? (
          accounts.map((account, index) => (
            <View key={index} style={styles.accountCard}>
              <Icon
                name="bank"
                size={20}
                color={isDarkMode ? "#fff" : "#000"}
              />
              <Text style={styles.accountText}>
                {account.name} - Үлдэгдэл: {account.uldegdel}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noAccountsText}>No accounts found.</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Uusgeh")}
        >
          <Text
            style={[styles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}
          >
            Данс үүсгэх
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Screen2")}
        >
          <Text
            style={[styles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}
          >
            Хаасан данс харах
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Screen3")}
        >
          <Text
            style={[styles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}
          >
            Тусламж
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: "#333",
  },
  accountCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accountText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  noAccountsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Account;

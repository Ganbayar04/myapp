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

      console.log("Requesting accounts for user ID:", user.id);

      try {
        const response = await API.get(`/dans?userId=${user.id}`);

        console.log("Accounts received:", response.data);

        // Directly use response.data as it should be the array of accounts
        if (response.data && response.data.length > 0) {
          setAccounts(response.data);
        } else {
          // No accounts found
          setAccounts([]); // Clear any existing accounts
          Alert.alert("No Accounts", "No accounts found for this user.");
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
            <View key={index} style={styles.dashboardItem}>
              <Text
                style={[
                  styles.dashboardItemText,
                  { color: isDarkMode ? "#fff" : "#000" },
                ]}
              >
                {account.name} - Үлдэгдэл: {account.uldegdel}
              </Text>
            </View>
          ))
        ) : (
          <Text>No accounts found.</Text>
        )}
        <View style={styles.dashboardContainer}>
          <TouchableOpacity
            style={styles.dashboardItem}
            onPress={() => navigation.navigate("Uusgeh")}
          >
            <Text
              style={[
                styles.dashboardItemText,
                { color: isDarkMode ? "#fff" : "#000" },
              ]}
            >
              Данс үүсгэх
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dashboardItem}
            onPress={() => navigation.navigate("Screen2")}
          >
            <Text
              style={[
                styles.dashboardItemText,
                { color: isDarkMode ? "#fff" : "#000" },
              ]}
            >
              Хаасан данс харах
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dashboardItem}
            onPress={() => navigation.navigate("Screen3")}
          >
            <Text
              style={[
                styles.dashboardItemText,
                { color: isDarkMode ? "#fff" : "#000" },
              ]}
            >
              Тусламж
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  darkModeContainer: {
    backgroundColor: "#000",
  },
  dashboardContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
  },
  dashboardItem: {
    width: "80%",
    aspectRatio: 4,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "black",
  },
  dashboardItemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Account;

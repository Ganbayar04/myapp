import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import DarkMode from "../../styles/darkMode";
import { useUser } from "../../src/contexts/userContext";
import API from "../../config";

const Haasan = () => {
  const [accounts, setAccounts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user && user.id) {
      fetchInactiveAccounts(user.id);
    } else {
      Alert.alert("Error", "Please log in to view accounts.");
    }
  }, [user]);

  const fetchInactiveAccounts = async (userId) => {
    try {
      const response = await API.get(`/dans/accounts/${userId}`);
      console.log("Accounts fetched for user ID:", userId, response.data);
      const inactiveAccounts = response.data.filter(
        (account) => account.accountStatus === "Inactive"
      );
      if (inactiveAccounts.length > 0) {
        setAccounts(inactiveAccounts);
      } else {
        setAccounts([]);
        Alert.alert("No Accounts", "You do not have any inactive accounts.");
      }
    } catch (error) {
      console.error("API error:", error);
      Alert.alert(
        "Error",
        "Failed to fetch accounts due to network or server error."
      );
    }
  };

  // Render the UI
  return (
    <View
      style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}
    >
      <ScrollView>
        <Text style={styles.title}>Inactive Accounts:</Text>
        {accounts.map((account) => (
          <View key={account.id} style={styles.accountContainer}>
            <Text>Account Name: {account.name}</Text>
            <Text>Account Status: {account.accountStatus}</Text>
          </View>
        ))}
      </ScrollView>
      <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  darkModeContainer: {
    backgroundColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  accountContainer: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
});

export default Haasan;

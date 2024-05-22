import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useUser } from "../../src/contexts/userContext";
import API from "../../config";

const Haasan = () => {
  const [accounts, setAccounts] = useState([]);
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
      //console.log("Accounts fetched for user ID:", userId, response.data);
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
      //console.error("API error:", error);
      Alert.alert(
        "Error",
        "Failed to fetch accounts due to network or server error."
      );
    }
  };

  // Render the UI
  return (
    <View style>
      <ScrollView>
        <Text style={styles.title}>Хаасан данс:</Text>
        {accounts.map((account) => (
          <View key={account.id} style={styles.accountContainer}>
            <Text>Дансны нэр: {account.name}</Text>
            <Text>Дансны төлөв: {account.accountStatus}</Text>
          </View>
        ))}
      </ScrollView>
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

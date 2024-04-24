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
    const fetchData = async () => {
      if (!user || !user.id) {
        Alert.alert("Error", "Please log in to view accounts.");
        return;
      }
      try {
        const response = await API.get(`/dans?userId=${user.id}`);
        if (response.data && response.data.length > 0) {
          const InactiveAccounts = response.data.filter(
            (account) => account.accountStatus === "Inactive"
          );
          setAccounts(InactiveAccounts);
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
      }
    };
    fetchData();
  }, [user]);

  return (
    <View
      style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}
    >
      <ScrollView>
        <Text style={styles.title}>Хаалттай данс:</Text>
        {accounts.map((account) => (
          <View key={account.id} style={styles.accountContainer}>
            <Text>Дасны нэр: {account.name}</Text>
            <Text>Дансны төлөв: {account.accountStatus}</Text>
          </View>
        ))}
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
  darkModeContainer: {
    backgroundColor: "#000",
  },
});

export default Haasan;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import API from "../../config"; // Ensure this points to your API configuration

const Info = ({ route }) => {
  const { userId } = route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [accounts, setAccounts] = useState([]); // To store accounts
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
    fetchAccounts();
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const response = await API.get(`/users/${userId}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      Alert.alert("Error", "Failed to load user details.");
    }
  };

  const fetchAccounts = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID is missing.");
      return;
    }
    try {
      const response = await API.get(`/dans?userId=${userId}`);
      console.log("Account data:", response.data); // This will log the data structure
      if (response.data && response.data.length > 0) {
        setAccounts(response.data);
      } else {
        setAccounts([]);
        Alert.alert("No Accounts", "No accounts found for this user.");
      }
    } catch (error) {
      console.error("API error:", error);
      Alert.alert("Error", "Failed to fetch accounts.");
    } finally {
      setIsLoading(false);
    }
  };


  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      {userDetails ? (
        <View>
          <Text style={styles.detailItem}>ID: {userDetails._id}</Text>
          <Text style={styles.detailItem}>Email: {userDetails.email}</Text>
          <Text style={styles.detailItem}>Role: {userDetails.role}</Text>
          <Text style={styles.detailItem}>Accounts:</Text>
          {accounts.map((account, index) => (
            <Text key={index} style={styles.accountItem}>
            Дансны нэр:
              {account.name} - Үлдэгдэл:{" "}
              {account.uldegdel !== undefined
                ? account.uldegdel
                : "Unavailable"}
            </Text>
          ))}
        </View>
      ) : (
        <Text>Бүртгэлтэй данс байхгүй байна.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  detailItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  accountItem: {
    paddingLeft: 20,
    fontSize: 18, // Increased from 14 to 18
    fontWeight: "bold", // Make text bold
    color: "#007AFF", // Example color; adjust as needed
    marginVertical: 5, // Add vertical margin
  },
});


export default Info;

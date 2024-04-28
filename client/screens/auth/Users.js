import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../../config"; // Ensure this points to your API configuration
import DarkMode from "../../styles/darkMode"; // Ensure path correctness
import Info from "./Info";

const Users = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users"); // Adjust the endpoint as necessary
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      Alert.alert("Error", "Failed to load users.");
      setIsLoading(false);
    }
  };

  const navigateToDetails = (userId) => {
    navigation.navigate("Info", { userId });
  };

  return (
    <ScrollView
      style={[styles.container, isDarkMode ? styles.darkModeContainer : {}]}
    >
      <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Index</Text>
            <Text style={styles.headerCell}>Email</Text>
            <Text style={styles.headerCell}>Role</Text>
            <Text style={styles.headerCell}>Actions</Text>
          </View>
          {users.map((user, index) => (
            <View key={user._id} style={styles.tableRow}>
              <Text style={styles.cell}>{index + 1}</Text>
              <View style={styles.emailRoleContainer}>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.role}>{user.role}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigateToDetails(user._id)}
              >
                <Text style={styles.buttonText}>Дэлгэрэнгүй</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  darkModeContainer: {
    backgroundColor: "#333",
    color: "#fff",
  },
  table: {
    marginTop: 60,
  },
  tableHeader: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center", // Align items vertically in rows
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
  },
  emailRoleContainer: {
    flex: 2, // Adjusted to take more space
    flexDirection: "row", // Align email and role horizontally
  },
  email: {
    flex: 1, // Adjusted to take equal space
  },
  role: {
    flex: 1, // Adjusted to take equal space
    marginLeft: 10, // Add margin between email and role
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
  },
});

export default Users;

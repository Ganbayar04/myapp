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
import API from "../../config";

const Users = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      Alert.alert("Error", "Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToDetails = (userId) => {
    navigation.navigate("Info", { userId });
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}></Text>
            <Text style={styles.headerCell}>Email</Text>
            <Text style={styles.headerCell}>Role</Text>
            <Text style={styles.headerCell}>Actions</Text>
          </View>
          {users.filter(user => user.role === "user").map((user, index) => (
            <View key={user._id} style={styles.tableRow}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{user.email}</Text>
              <Text style={styles.cell}>{user.role}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigateToDetails(user._id)}
              >
                <Text style={styles.buttonText}>Details</Text>
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
    backgroundColor: "#fff", 
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#eee",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    color: "#000", 
  },
  cell: {
    flex: 1,
    color: "#000", 
  },
  button: {
    padding: 10,

    borderRadius: 5,
  },
  buttonText: {
    color: "#000", 
    textAlign: "center",
  },
});

export default Users;

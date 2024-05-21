import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useUser } from "../../src/contexts/userContext";
import API from "../../config";

const Completed = () => {
  const [completedTusuws, setCompletedTusuws] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user && user.id) {
      fetchCompletedTusuws(user.id);
    } else {
      Alert.alert("Error", "Please log in to view tusuws.");
    }
  }, [user]);

  const fetchCompletedTusuws = async (userId) => {
    try {
      const response = await API.get(`/tusuw?userId=${userId}`);
      console.log("Tusuws fetched for user ID:", userId, response.data);
      const completedTusuws = response.data.filter(
        (tusuw) => tusuw.tuluw === "Completed"
      );
      if (completedTusuws.length > 0) {
        setCompletedTusuws(completedTusuws);
      } else {
        setCompletedTusuws([]);
        Alert.alert("No Tusuws", "You do not have any completed tusuws.");
      }
    } catch (error) {
      console.error("API error:", error);
      Alert.alert(
        "Error",
        "Failed to fetch tusuws due to network or server error."
      );
    }
  };

  // Render the UI
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Completed Tusuws:</Text>
        {completedTusuws.map((tusuw) => (
          <View key={tusuw._id} style={styles.tusuwContainer}>
            <Text>Tusuw Name: {tusuw.name}</Text>
            <Text>Tusuw Year: {tusuw.year}</Text>
            <Text>Tusuw Month: {tusuw.month}</Text>
            <Text>Tusuw Status: {tusuw.tuluw}</Text>
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
  tusuwContainer: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
});

export default Completed;

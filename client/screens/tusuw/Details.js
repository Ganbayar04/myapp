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
import { useNavigation, useRoute } from "@react-navigation/native";
import API from "../../config"; // Ensure this points to your API configuration

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { tusuw_id } = route.params;
  const [tusuwDetails, setTusuwDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTusuwDetails();
  }, [tusuw_id]);

  const fetchTusuwDetails = async () => {
    setIsLoading(true);
    try {
      const response = await API.get(`/tusuw/${tusuw_id}`);
      setTusuwDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch tusuw details:", error);
      Alert.alert("Error", "Failed to load tusuw details.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      {tusuwDetails ? (
        <View>
          <Text style={styles.detailItem}>Нэр: {tusuwDetails.name}</Text>
          <Text style={styles.detailItem}>Огноо: {tusuwDetails.year} - {tusuwDetails.month}</Text>
          <Text style={styles.detailItem}>Төлөв: {tusuwDetails.tuluw}</Text>
       
        </View>
      ) : (
        <Text>No tusuw details found.</Text>
      )}
      <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate("TOrlogo", { tusuw_id })}
          >
            <Text style={styles.buttonText}>Орлого </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate("TZarlaga", { tusuw_id })}
          >
            <Text style={styles.buttonText}>Зарлага </Text>
          </TouchableOpacity>
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
    paddingVertical: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
 Button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Details;

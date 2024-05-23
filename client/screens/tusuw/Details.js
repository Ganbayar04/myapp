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
  const [orlogos, setOrlogos] = useState([]);
  const [zarlagas, setZarlagas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTusuwDetails();
    fetchOrlogos();
    fetchZarlagas();
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

  const fetchOrlogos = async () => {
    try {
      const response = await API.get(`/tuluw/tusuw/${tusuw_id}`);
      setOrlogos(response.data);
    } catch (error) {
      console.error("Failed to fetch orlogos:", error);
      Alert.alert("Error", "Failed to load orlogos.");
    }
  };

  const fetchZarlagas = async () => {
    try {
      // Adjust the API endpoint based on your backend structure
      const response = await API.get(`/tZarlaga/tusuw/${tusuw_id}`);
      setZarlagas(response.data);
    } catch (error) {
      console.error("Failed to fetch zarlagas:", error);
      Alert.alert("Error", "Failed to load zarlagas.");
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>

        {tusuwDetails ? (
          <View style={styles.tusuwDetailsContainer}>
            <Text style={styles.detailItem}>Нэр: {tusuwDetails.name}</Text>
            <Text style={styles.detailItem}>
              Огноо: {tusuwDetails.year} - {tusuwDetails.month}
            </Text>
            <Text style={styles.detailItem}>Төлөв: {tusuwDetails.tuluw}</Text>
          </View>
        ) : (
          <Text>No tusuw details found.</Text>
        )}

        <View style={styles.orlogoZarlagaContainer}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Орлого:</Text>
            {orlogos.map((item) => (
              <View style={styles.itemContainer} key={item._id}>
                <Text style={styles.itemText}>Нэр: {item.name}</Text>
                <Text style={styles.itemText}>Дүн: {item.dun}</Text>
                <Text style={styles.itemText}>Тайлбар: {item.tailbar}</Text>
                <Text style={styles.itemText}>Гүйцэтгэл: {item.guitsetgel}</Text>
              </View>
            ))}
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Зарлага:</Text>
            {zarlagas.map((item) => (
              <View style={styles.itemContainer} key={item._id}>
                <Text style={styles.itemText}>Нэр: {item.name}</Text>
                <Text style={styles.itemText}>Дүн: {item.dun}</Text>
                <Text style={styles.itemText}>Тайлбар: {item.tailbar}</Text>
                <Text style={styles.itemText}>Гүйцэтгэл: {item.guitsetgel}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  tusuwDetailsContainer: {
    padding: 20,
    paddingBottom: 40, // Added padding to create space between tusuw details and orlogo/zarlaga sections
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  orlogoZarlagaContainer: {
    flexDirection: "row",
  },
  sectionContainer: {
    flex: 1,
    padding: 20,
  },
  detailItem: {
    paddingVertical: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  Button: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});

export default Details;

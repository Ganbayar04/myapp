import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons
import API from "../../config";
import { useUser } from "../../src/contexts/userContext";

const Tusuw = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useUser();
  const userId = route.params?.userId || user?.id;
  const [isLoading, setIsLoading] = useState(true);
  const [tusuws, setTusuws] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchAllTusuws();
  }, [userId]);

  const fetchAllTusuws = async () => {
    try {
      const response = await API.get(`/tusuw?userId=${userId}`);
      setTusuws(response.data);
    } catch (error) {
      console.error("Failed to fetch tusuws:", error);
      Alert.alert("Error", "Failed to fetch tusuws.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTusuw = async () => {
    try {
      const requestData = {
        name,
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        tuluw: "Pending",
        user_id: user.id,
      };
      console.log("Request Data:", requestData); // Log the request data for debugging

      const response = await API.post("/tusuw", requestData);

      console.log("Created Tusuw:", response.data); // Log the response data

      setTusuws((prevTusuws) => [...prevTusuws, response.data]);
      setIsModalVisible(false);
      setName(""); // Clear the input field
      setSelectedDate(new Date()); // Reset the date picker
    } catch (error) {
      console.error("Failed to create tusuw:", error);
      Alert.alert("Error", "Failed to create tusuw.");
    }
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const toggleTusuwStatus = async (tusuw) => {
    const statusCycle = ["Pending", "Completed", "Odoo"];
    const currentStatusIndex = statusCycle.indexOf(tusuw.tuluw);
    const newStatus =
      statusCycle[(currentStatusIndex + 1) % statusCycle.length];

    try {
      const response = await API.put(`/tusuw/${tusuw._id}`, {
        tuluw: newStatus,
      });
      if (response.status === 200) {
        Alert.alert("Удирдлага", "Төсөвийн төлөв амжилттай шинэчлэгдлээ.");
        setTusuws((prevTusuws) =>
          prevTusuws.map((t) =>
            t._id === tusuw._id ? { ...t, tuluw: newStatus } : t
          )
        );
      } else {
        throw new Error("Failed to update tusuw status");
      }
    } catch (error) {
      console.error("API error:", error);
      Alert.alert(
        "Error",
        "Failed to update tusuw status due to network or server error."
      );
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.buttonText}>Төсөв үүсгэх</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Completed")}
        >
          <Text style={styles.buttonText}>Completed</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tusuws}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.tusuwItem}>
            <Text style={styles.tusuwText}>{item.name}</Text>
            <Text style={styles.tusuwText}>
              {item.year} - {item.month}
            </Text>
            <Text style={styles.tusuwText}>{item.tuluw}</Text>
            <MaterialIcons
              name={
                item.tuluw === "Completed"
                  ? "check-circle"
                  : item.tuluw === "Pending"
                  ? "hourglass-empty"
                  : "schedule"
              }
              size={24}
              color={
                item.tuluw === "Completed"
                  ? "green"
                  : item.tuluw === "Pending"
                  ? "orange"
                  : "blue"
              }
              onPress={() => toggleTusuwStatus(item)}
            />
          </View>
        )}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Төсөвийн нэр"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {`Сонгосон огноо: ${selectedDate.getFullYear()} - ${
                  selectedDate.getMonth() + 1
                }`}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <Button title="Төсөв үүсгэх" onPress={handleCreateTusuw} />
            <Button
              title="Болих"
              color="red"
              onPress={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  tusuwItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tusuwText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  dateButtonText: {
    color: "#000",
    fontSize: 16,
  },
});

export default Tusuw;

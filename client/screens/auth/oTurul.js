import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  Alert,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../../config";
import { useUser } from "../../src/contexts/userContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const oTurul = () => {
  const navigation = useNavigation();
  const [orlogoTuruls, setOrlogoTuruls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newOrlogoTurul, setNewOrlogoTurul] = useState("");
  const { user } = useUser();

  useEffect(() => {
    fetchAllOrlogoTurul();
  }, [user]);

  const fetchAllOrlogoTurul = async () => {
    setIsLoading(true);
    try {
      const response = await API.get("/oTurul");
      if (response.status === 200) {
        setOrlogoTuruls(response.data);
      } else {
        throw new Error(`Unexpected HTTP status ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch records:", error);
      Alert.alert("Error", "Failed to fetch orlogoTurul records.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrlogoTurul = async (id) => {
    try {
      const response = await API.delete(`/oTurul/${id}`);
      if (response.status === 200) {
        Alert.alert("Success", "OrlogoTurul deleted successfully.");
        fetchAllOrlogoTurul(); // Refresh the list after a successful delete
      } else {
        Alert.alert("Error", `Failed to delete the orlogoTurul with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", `Failed to delete orlogoTurul: ${error.toString()}`);
    }
  };

  const createOrlogoTurul = async () => {
    try {
      const response = await API.post("/oTurul", { name: newOrlogoTurul });
      if (response.status === 201) {
        Alert.alert("Success", "OrlogoTurul created successfully.");
        setNewOrlogoTurul("");
        setShowModal(false);
        fetchAllOrlogoTurul(); // Refresh the list after a successful create
      } else {
        throw new Error(`Failed to create orlogoTurul with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Create error:", error);
      Alert.alert("Error", `Failed to create orlogoTurul: ${error.toString()}`);
    }
  };

  const ListHeader = () => (
    <View>
      <View style={styles.dashboardContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
          <Text style={styles.buttonText}>Tөрөл үүсгэх</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}> </Text>
        <Text style={styles.headerText}>Төрөл </Text>
        <Text style={styles.headerText}>Устгах</Text>
      </View>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{`${index + 1}    ${item.name}`}</Text>
      <TouchableOpacity onPress={() => deleteOrlogoTurul(item._id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={fetchAllOrlogoTurul}>
        <MaterialIcons name="refresh" size={24} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={orlogoTuruls}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.list}
      />

      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create OrlogoTurul</Text>
            <TextInput
              style={styles.input}
              placeholder="Төрлийн нэр"
              placeholderTextColor="#999" // Add placeholder text color
              value={newOrlogoTurul}
              onChangeText={setNewOrlogoTurul}
            />
            <TouchableOpacity style={styles.saveButton} onPress={createOrlogoTurul}>
              <Text style={styles.saveButtonText}>Хадгалах</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#f5f5f5",
  },
  list: {
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
    flex: 1, // Ensure the text takes up the available space
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#eee", // Light grey background for the header
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  refreshButton: {
    position: "absolute",
    left: 20,
    top: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    zIndex: 1000,
  },
  dashboardContainer: {
    flexDirection: "row", // Keep it in a row or change to column if you want vertical alignment
    justifyContent: "center", // Center the buttons horizontally
    alignItems: "center", // Center the buttons vertically
    marginTop: 10, // Adjust this value to move the buttons further down as needed
    flexWrap: "wrap", // Allows buttons to wrap in smaller screens or orientations
  },
  button: {
    backgroundColor: "#fff",
    padding: 15, // Increase padding for bigger touch area
    borderRadius: 5,
    marginHorizontal: 10, // Add horizontal margin for spacing between buttons
    marginTop: 10, // Optional: add if you want more space between row items when wrapped
  },
  inputContainer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    color: "#000", // Set text color to black
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#000", // Set button text color to black
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: '80%',
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
  },
  cancelButtonText: {
    color: "#007AFF", // Set cancel button text color
    fontSize: 16,
  },
});

export default oTurul;

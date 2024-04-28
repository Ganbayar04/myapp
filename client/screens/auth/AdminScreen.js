import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../../config";
import DarkMode from "../../styles/darkMode";
import { useUser } from "../../src/contexts/userContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const AdminScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [turuls, setTuruls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    fetchAllDansTurul();
  }, [user]);

  const fetchAllDansTurul = async () => {
    setIsLoading(true);
    try {
      const response = await API.get("/dansTurul");
      if (response.status === 200) {
        setTuruls(response.data);
      } else {
        throw new Error(`Unexpected HTTP status ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch records:", error);
      Alert.alert("Error", "Failed to fetch turul records.");
    } finally {
      setIsLoading(false);
    }
  };

 const deleteDansTurul = async (id) => {
   try {
     const response = await API.delete(`/dansTurul/${id}`);
     if (response.status === 200) {
       Alert.alert("Success", "Turul deleted successfully.");
       fetchAllDansTurul(); // Refresh the list after a successful delete
     } else {
       // If the server responds, but not with a success status
       Alert.alert(
         "Error",
         `Failed to delete the turul with status: ${response.status}`
       );
     }
   } catch (error) {
     // This will catch network errors or cases where the server response couldn't be processed
     console.error("Delete error:", error);
     Alert.alert("Error", `Failed to delete turul: ${error.toString()}`);
   }
 };

  


  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}> </Text>
      <Text style={styles.headerText}>Төрөл </Text>
      <Text style={styles.headerText}>Устгах</Text>
    </View>
  );


  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{`${index + 1}    ${  item.name}`}</Text>
      <TouchableOpacity onPress={() => deleteDansTurul(item._id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
 
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View
      style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}
    >
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={fetchAllDansTurul}
      >
        <MaterialIcons name="refresh" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Users")}
        >
          <Text style={styles.buttonText}>Хэрэглэгч</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Turul")}
        >
          <Text style={styles.buttonText}>Төрөл үүсгэх</Text>
        </TouchableOpacity>
        <FlatList
          data={turuls}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          ListHeaderComponent={ListHeader} // Add the header component here
          contentContainerStyle={styles.list}
        />
        
      </ScrollView>

      <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#f5f5f5",
  },
  darkModeContainer: {
    backgroundColor: "#333",
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
});


export default AdminScreen;
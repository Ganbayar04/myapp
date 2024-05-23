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
import { useNavigation, useRoute } from "@react-navigation/native";
import API from "../../config";
import { useUser } from "../../src/contexts/userContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const TOrlogo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useUser();

  const [orlogos, setOrlogos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newOrlogo, setNewOrlogo] = useState({
    name: "",
    tailbar: "",
    dun: "",
    guitsetgel: "",
  });

  const tusuw_id = route.params?.tusuw_id ;  // Get tusuw_id from route parameters

  useEffect(() => {
    fetchAllOrlogos(tusuw_id);
  }, [tusuw_id]);

  const fetchAllOrlogos = async (tusuw_id) => {
    setIsLoading(true);
    try {
      const response = await API.get(`/tuluw/tusuw/${tusuw_id}`);
      if (response.data && response.data.length > 0) {
        setOrlogos(response.data);
      } else {
        setOrlogos([]);
      }
    } catch (error) {
      //console.error("API error:", error);
     // Alert.alert("Error", "Failed to fetch orlogo records.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  
  const createOrlogo = async () => {
    setIsLoading(true);

    if (!user?.id) {
      Alert.alert("Алдаа", "Хэрэглэгч олдсонгүй. Нэвтэрч орно уу!");
      navigation.navigate("Login");
      setIsLoading(false);
      return;
    }

    if (!tusuw_id) {
      Alert.alert("Алдаа", "Төсөв ID олдсонгүй!");
      setIsLoading(false);
      return;
    }

    try {
      const requestData = {
        name: newOrlogo.name,
        tailbar: newOrlogo.tailbar,
        dun: Number(newOrlogo.dun),
        tusuw_id: tusuw_id,  // Use tusuw_id from route parameters
        guitsetgel: Number(newOrlogo.guitsetgel),
        userId: user.id,
      };

      const response = await API.post("/tuluw", requestData);

      if (response.status === 201) {
        Alert.alert("Success", "Орлого амжилттай үүсгэлээ.");
        setNewOrlogo({
          name: "",
          tailbar: "",
          dun: "",
          guitsetgel: "",
        });
        setShowModal(false);
        fetchAllOrlogos(tusuw_id); // Refresh the list after a successful create
      } else {
        throw new Error(`Failed to create orlogo with status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        Alert.alert("Error", `Failed to create orlogo: ${error.response.data.message || error.response.data}`);
      } else {
        console.error("Create error:", error);
        Alert.alert("Error", `Failed to create orlogo: ${error.toString()}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrlogo = async (id) => {
    try {
      const response = await API.delete(`/tuluw/${id}`);
      if (response.status === 200) {
        Alert.alert("Success", "Орлого амжилттай устгалаа.");
        fetchAllOrlogos(tusuw_id); // Refresh the list after a successful delete
      } else {
        Alert.alert("Error", `Failed to delete the orlogo with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", `Failed to delete orlogo: ${error.toString()}`);
    }
  };

  const ListHeader = () => {
    if (orlogos.length === 0) {
      return null;
    }
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Нэр</Text>
          <Text style={styles.headerText}>Дүн</Text>
          <Text style={styles.headerText}>Тайлбар</Text>
          <Text style={styles.headerText}>Гүйцэтгэл</Text>
          <Text style={styles.headerText}>Устгах</Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.dun}</Text>
      <Text style={styles.itemText}>{item.tailbar}</Text>
      <Text style={styles.itemText}>{item.guitsetgel}</Text>
      <TouchableOpacity onPress={() => deleteOrlogo(item._id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Танд орлого байхгүй байна</Text>
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.footerButton} onPress={() => setShowModal(true)}>
        <Text style={[styles.footerButtonText, { fontWeight: "bold" }]}>Орлого үүсгэх</Text>
      </TouchableOpacity>
      <FlatList
        data={orlogos}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.list}
      />

      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Орлого үүсгэх</Text>

            <TextInput
              style={styles.input}
              placeholder="Нэр"
              placeholderTextColor="#999"
              value={newOrlogo.name}
              onChangeText={(text) => setNewOrlogo({ ...newOrlogo, name: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Дүн"
              placeholderTextColor="#999"
              value={newOrlogo.dun}
              onChangeText={(text) => setNewOrlogo({ ...newOrlogo, dun: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Тайлбар"
              placeholderTextColor="#999"
              value={newOrlogo.tailbar}
              onChangeText={(text) => setNewOrlogo({ ...newOrlogo, tailbar: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Гүйцэтгэл"
              placeholderTextColor="#999"
              value={newOrlogo.guitsetgel}
              onChangeText={(text) => setNewOrlogo({ ...newOrlogo, guitsetgel: text })}
            />

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalButtonText}>Цуцлах</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={createOrlogo}
              >
                <Text style={styles.modalButtonText}>Хадгалах</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#ddd",
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    flex: 1,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
  footerButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginVertical: 16,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  footerButtonText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
  list: {
    flexGrow: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "#f0f0f0",
  },
  modalButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default TOrlogo;

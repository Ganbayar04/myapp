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
import RNPickerSelect from "react-native-picker-select";

const Zarlaga = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [Zarlagas, setZarlagas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newZarlaga, setNewZarlaga] = useState({
    name: "",
    dans_id: "",
    zarlaga_turul_id: "",
    t_zarlaga_id: "",
    dun: "",
    tailbar: "",
    ognoo: new Date(),
  });
  const { user } = useUser();
  const [accounts, setAccounts] = useState([]);
  const [turulList, setTurulList] = useState([]);
  const [tZarlagaList, setTZarlagaList] = useState([]);
  const [selectedDans, setSelectedDans] = useState(null);
  const userId = route.params?.userId || user?.id;
  const [selectedTurul, setSelectedTurul] = useState(null);
  const [selectedTZarlaga, setSelectedTZarlaga] = useState(null);

  useEffect(() => {
    fetchAllZarlagas();
    fetchAccounts();
    fetchAllZarlagaTurul();
    fetchAllTZarlaga();
  }, [userId]);

  const fetchAllZarlagas = async () => {
    setIsLoading(true);
    try {
      const response = await API.get(`/zarlaga?userId=${userId}`);
      if (response.status === 200) {
        setZarlagas(response.data);
      } else {
        throw new Error(`Unexpected HTTP status ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch records:", error);
      Alert.alert("Error", "Failed to fetch Zarlaga records.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteZarlaga = async (id) => {
    try {
      const response = await API.delete(`/zarlaga/${id}`);
      if (response.status === 200) {
        Alert.alert("Success", "Зарлага амжилттай устгалаа.");
        fetchAllZarlagas();
      } else {
        Alert.alert("Error", `Failed to delete the Zarlaga with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", `Failed to delete Zarlaga: ${error.toString()}`);
    }
  };

  const createZarlaga = async () => {
    setIsLoading(true);
    if (!user?.id) {
      Alert.alert("Алдаа", "Хэрэглэгч олдсонгүй. Нэвтэрч орно уу!");
      navigation.navigate("Login");
      setIsLoading(false);
      return;
    }

    try {
      const requestData = {
        name: newZarlaga.name,
        dans_id: selectedDans,
        zarlaga_turul_id: selectedTurul,
        t_zarlaga_id: selectedTZarlaga,
        dun: Number(newZarlaga.dun),
        tailbar: newZarlaga.tailbar,
        ognoo: newZarlaga.ognoo,
        userId: user.id,
      };

      console.log("Request data:", requestData);

      const response = await API.post("/zarlaga", requestData);

      if (response.status === 201) {
        Alert.alert("Success", "Зарлага амжилттай үүсгэлээ.");
        setNewZarlaga({
          name: "",
          dans_id: "",
          zarlaga_turul_id: "",
          t_zarlaga_id: "",
          dun: "",
          tailbar: "",
          ognoo: new Date(),
        });
        setShowModal(false);
        fetchAllZarlagas();
      } else {
        throw new Error(`Failed to create Zarlaga with status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        Alert.alert("Error", `Failed to create Zarlaga: ${error.response.data.message || error.response.data}`);
      } else {
        console.error("Create error:", error);
        Alert.alert("Error", `Failed to create Zarlaga: ${error.toString()}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await API.get(`/dans/accounts/${userId}`);
      if (response.data && response.data.length > 0) {
        setAccounts(response.data);
      } else {
        setAccounts([]);
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllZarlagaTurul = async () => {
    setIsLoading(true);
    try {
      const response = await API.get("/zTurul");
      if (response.status === 200) {
        setTurulList(response.data);
      } else {
        throw new Error(`Unexpected HTTP status ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch Zarlaga turul:", error);
      Alert.alert("Error", "Failed to fetch Zarlaga turul.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllTZarlaga = async () => {
    setIsLoading(true);
    try {
      const response = await API.get("/tZarlaga");
      if (response.status === 200) {
        setTZarlagaList(response.data);
      } else {
        throw new Error(`Unexpected HTTP status ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch t_zarlaga:", error);
      Alert.alert("Error", "Failed to fetch t_zarlaga.");
    } finally {
      setIsLoading(false);
    }
  };

  const ListHeader = () => {
    if (Zarlagas.length === 0) {
      return null;
    }
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Нэр</Text>
          <Text style={styles.headerText}>Дүн</Text>
          <Text style={styles.headerText}>Тайлбар</Text>
          <Text style={styles.headerText}>Огноо</Text>
          <Text style={styles.headerText}>Устгах</Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.dun}</Text>
      <Text style={styles.itemText}>{item.tailbar}</Text>
      <Text style={styles.itemText}>
        {new Date(item.ognoo).toLocaleDateString()}
      </Text>
      <TouchableOpacity onPress={() => deleteZarlaga(item._id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Танд зарлага байхгүй байна</Text>
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={[styles.footerButtonText, { fontWeight: "bold" }]}>
          Зарлага үүсгэх
        </Text>
      </TouchableOpacity>
      <FlatList
        data={Zarlagas}
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
            <Text style={styles.modalTitle}>Зарлага үүсгэх</Text>

            <TextInput
              style={styles.input}
              placeholder="Нэр"
              placeholderTextColor="#999"
              value={newZarlaga.name}
              onChangeText={(text) =>
                setNewZarlaga({ ...newZarlaga, name: text })
              }
            />
            <Text style={styles.label}>Данс:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedDans(value)}
              items={accounts.map((account) => ({
                label: account.name,
                value: account._id,
              }))}
              style={pickerSelectStyles}
              placeholder={{ label: "Select a dans...", value: null }}
              useNativeAndroidPickerStyle={false}
            />
            <Text style={styles.label}>Зарлагын төрөл:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedTurul(value)}
              items={turulList.map((turul) => ({
                label: turul.name,
                value: turul._id,
              }))}
              style={pickerSelectStyles}
              placeholder={{ label: "Select a turul...", value: null }}
              useNativeAndroidPickerStyle={false}
            />
            {/* <Text style={styles.label}>Төлөвлөгөөт төрөл:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedTZarlaga(value)}
              items={tZarlagaList.map((tZarlaga) => ({
                label: tZarlaga.name,
                value: tZarlaga._id,
              }))}
              style={pickerSelectStyles}
              placeholder={{ label: "Select a t_zarlaga...", value: null }}
              useNativeAndroidPickerStyle={false}
            />*/}
            <TextInput
              style={styles.input}
              placeholder="Дүн"
              placeholderTextColor="#999"
              value={newZarlaga.dun}
              onChangeText={(text) =>
                setNewZarlaga({ ...newZarlaga, dun: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Тайлбар"
              placeholderTextColor="#999"
              value={newZarlaga.tailbar}
              onChangeText={(text) =>
                setNewZarlaga({ ...newZarlaga, tailbar: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Огноо"
              placeholderTextColor="#999"
              value={newZarlaga.ognoo.toISOString().split("T")[0]}
              onChangeText={(text) =>
                setNewZarlaga({ ...newZarlaga, ognoo: new Date(text) })
              }
            />
            <TouchableOpacity style={styles.saveButton} onPress={createZarlaga}>
              <Text style={styles.saveButtonText}>Хадгалах</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelButtonText}>Буцах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
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
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#eee",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  dashboardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
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
    color: "#000",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#007AFF",
    width: "100%",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
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
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  cancelButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default Zarlaga;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../../config";
import { useUser } from "../../src/contexts/userContext";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RNPickerSelect from "react-native-picker-select";

const Account = ({ route }) => {
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useUser();
  const userId = route.params?.userId || user?.id;
  const [turulList, setTurulList] = useState({});

  // State for creating a new account
  const [name, setName] = useState("");
  const [uldegdel, setUldegdel] = useState("");
  const [tailbar, setTailbar] = useState("");
  const [status, setStatus] = useState("Active");
  const [selectedTurul, setSelectedTurul] = useState("");

  useEffect(() => {
    if (userId) {
      fetchAccounts();
      fetchTurulList();
    }
  }, [userId]);

  const fetchAccounts = async () => {
    try {
      const response = await API.get(`/dans/accounts/${userId}`);
      console.log("Accounts fetched:", response.data);
      if (response.data && response.data.length > 0) {
        setAccounts(response.data);
      } else {
        setAccounts([]);
      }
    } catch (error) {
      //console.error("API error:", error);
      Alert.alert("Error", "Failed to fetch accounts.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTurulList = async () => {
    try {
      const response = await API.get("/dansTurul");
      if (response.status === 200) {
        const turulMapping = response.data.reduce((acc, turul) => {
          acc[turul._id] = turul.name;
          return acc;
        }, {});
        setTurulList(turulMapping);
        // Log to confirm structure
        console.log("Turul mapping:", turulMapping);
      } else {
        throw new Error(`Unexpected HTTP status ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch Turul list:", error);
      Alert.alert("Error", "Failed to fetch Turul list.");
    }
  };

  const toggleAccountStatus = async (account) => {
    const newStatus =
      account.accountStatus === "Active" ? "Inactive" : "Active";
    try {
      const response = await API.put(`/dans/${account._id}`, {
        accountStatus: newStatus,
      });
      if (response.status === 200) {
        Alert.alert("Удирдлага", "Дансны төлөв амжилттай шинэчлэгдлээ.");
        setAccounts((prevAccounts) =>
          prevAccounts.map((acc) =>
            acc._id === account._id ? { ...acc, accountStatus: newStatus } : acc
          )
        );
      } else {
        throw new Error("Failed to update account status");
      }
    } catch (error) {
      console.error("API error:", error);
      Alert.alert(
        "Error",
        "Failed to update account status due to network or server error."
      );
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    if (!user?.id) {
      Alert.alert("Алдаа", "Хэрэглэгч олдсонгүй. Нэвтэрч орно уу!");
      navigation.navigate("Login");
      setIsLoading(false);
      return;
    }

    try {
      const response = await API.post("/dans", {
        name,
        uldegdel: Number(uldegdel),
        tailbar,
        accountStatus: status,
        user_id: user.id,
        turul_id: selectedTurul,
      });
      if (response.data) {
        Alert.alert("Данс амжилттай үүсгэлээ.");
        setIsModalVisible(false);
        fetchAccounts(); // Refresh accounts list
      }
    } catch (error) {
      console.error("Error creating account:", error);
      Alert.alert(
        "Амжилтгүй боллоо!",
        error.message || "Error creating account."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.refreshButton} onPress={fetchAccounts}>
        <MaterialIcons name="refresh" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { marginTop: 70 }]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.buttonText}>Данс үүсгэх</Text>
      </TouchableOpacity>

      <FlatList
        data={accounts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.accountCard}>
            <View style={styles.iconsContainer}>
              <MaterialIcons
                name={
                  item.accountStatus === "Active" ? "check-circle" : "cancel"
                }
                size={24}
                color={item.accountStatus === "Active" ? "green" : "red"}
                onPress={() => toggleAccountStatus(item)}
              />

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Zasah", { accountId: item._id })
                }
              >
                <Icon name="edit" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.accountRow}>
              <Text style={styles.accountText}>{item.name}</Text>
              <Text style={styles.accountText}>{item.uldegdel}</Text>
              <Text style={styles.accountText}>
                {turulList[item.turul_id] || "Unknown"}
              </Text>
            </View>
          </View>
        )}
        numColumns={2} // Set the number of columns for the grid
        columnWrapperStyle={styles.row} // Style to apply on every row
        contentContainerStyle={{ marginTop: 40 }}
      />
      <View style={styles.footerButtons}>
        <RNPickerSelect
          onValueChange={(value) => {
            if (value === "Haasan") {
              navigation.navigate("Haasan");
            } else if (value === "Zarlaga") {
              navigation.navigate("Zarlaga");
            } else if (value === "Orlogo") {
              navigation.navigate("Orlogo");
            } else if (value === "Tusuw") {
              navigation.navigate("Tusuw");
            }
          }}
          items={[
            { label: "Хаасан данс харах", value: "Haasan" },
            { label: "Зарлага", value: "Zarlaga" },
            { label: "Орлого", value: "Orlogo" },
            { label: "Төсөв", value: "Tusuw" },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "Данс харах", value: null }}
          useNativeAndroidPickerStyle={false}
        />
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <ScrollView>
                <TextInput
                  placeholder="Дансны нэр"
                  placeholderTextColor="#000"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Үлдэгдэл"
                  placeholderTextColor="#000"
                  value={uldegdel}
                  onChangeText={setUldegdel}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Тайлбар"
                  placeholderTextColor="#000"
                  value={tailbar}
                  onChangeText={setTailbar}
                  style={styles.input}
                />
                <Text style={styles.label}>Дансны төрөл:</Text>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedTurul(value)}
                  items={Object.keys(turulList).map((key) => ({
                    label: turulList[key],
                    value: key,
                  }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: "Select a turul...", value: null }}
                  useNativeAndroidPickerStyle={false}
                />
                <Button title="Хадгалах" onPress={handleRegister} />
                <Button
                  title="Буцах"
                  onPress={() => setIsModalVisible(false)}
                />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#f5f5f5",
  },
  darkModeContainer: {
    backgroundColor: "#333",
  },
  accountCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    margin: 5,
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  accountText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  refreshButton: {
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1000,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginVertical: 10,
  },
});

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
    backgroundColor: "white",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
  },
});

export default Account;

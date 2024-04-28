import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Text,
  Modal,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import DarkMode from "../../styles/darkMode";
import CustomButton from "../../styles/customButton";
import API from "../../config";
import { useUser } from "../../src/contexts/userContext";

const Uusgeh = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [name, setName] = useState("");
  const [uldegdel, setUldegdel] = useState("");
  const [tailbar, setTailbar] = useState("");
  const [status, setStatus] = useState("Active");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTurul, setSelectedTurul] = useState("");
  const [turulList, setTurulList] = useState([]);

  useEffect(() => {
    fetchTurulList();
  }, []);

  const fetchTurulList = async () => {
    try {
      const response = await API.get("/dansTurul");
      if (response.status === 200) {
        setTurulList(response.data);
      } else {
        throw new Error(`Unexpected HTTP status ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch Turul list:", error);
      Alert.alert("Error", "Failed to fetch Turul list.");
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
        navigation.navigate("Account");
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

  return (
    <View
      style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <TextInput
            placeholder="Дансны нэр"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Үлдэгдэл"
            value={uldegdel}
            onChangeText={setUldegdel}
            style={styles.input}
          />
          <TextInput
            placeholder="Тайлбар"
            value={tailbar}
            onChangeText={setTailbar}
            style={styles.input}
          />
          <Text style={styles.label}>Дансны төлөв:</Text>
          <Picker
            selectedValue={status}
            style={styles.picker}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Идвэхтэй" value="Active" />
            <Picker.Item label="Идвэхгүй" value="Inactive" />
          </Picker>
          <Text style={styles.label}>Дансны төрөл:</Text>
          <Button title="Select Turul" onPress={() => setModalVisible(true)} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Picker
                  selectedValue={selectedTurul}
                  style={{ height: 50, width: 250 }}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedTurul(itemValue);
                    setModalVisible(false);
                  }}
                >
                  {turulList.map((turul) => (
                    <Picker.Item
                      key={turul._id}
                      label={turul.name}
                      value={turul._id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </Modal>
          <CustomButton title="Хадгалах" onPress={handleRegister} />
          <CustomButton title="Буцах" onPress={() => navigation.goBack()} />
        </ScrollView>
      )}
      <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 80,
    paddingHorizontal: 10,
   
    backgroundColor: "#f5f5f5",
  },
  darkModeContainer: {
    backgroundColor: "#000",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    padding:50,
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    color: "#333",
  },
  picker: {
    height: 50,
    marginBottom: 20,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Uusgeh;

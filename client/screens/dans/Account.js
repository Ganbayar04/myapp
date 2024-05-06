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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../../config";
import DarkMode from "../../styles/darkMode";
import { useUser } from "../../src/contexts/userContext";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Account = ({ route }) => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const userId = route.params?.userId || user?.id;
  const [turulList, setTurulList] = useState({});

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
      console.error("API error:", error);
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

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

return (
  <View
    style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}
  >
    <TouchableOpacity style={styles.refreshButton} onPress={fetchAccounts}>
      <MaterialIcons
        name="refresh"
        size={24}
        color={isDarkMode ? "#fff" : "#000"}
      />
    </TouchableOpacity>

    <FlatList
      data={accounts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.accountCard}>
          <View style={styles.iconsContainer}>
            {/* <Icon
              name="bank"
              size={20}
              color={isDarkMode ? "#fff" : "#000"}
              style={{ marginRight: 10 }}
            />*/}
            <MaterialIcons
              name={item.accountStatus === "Active" ? "check-circle" : "cancel"}
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Uusgeh")}
      >
        <Text style={styles.buttonText}>Данс үүсгэх</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Haasan")}
      >
        <Text style={styles.buttonText}>Хаасан данс харах</Text>
      </TouchableOpacity>
    </View>
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
    flexDirection: "column", // Stacks children vertically
    alignItems: "flex-start", // Aligns children to the left
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
    justifyContent: "flex-end", // Aligns icons to the left
    width: "100%", // Uses the full width to avoid unintentional squeezing
  },
   accountText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#fFF",
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
  refreshButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 20,
    zIndex: 1000,
  },
});


export default Account;

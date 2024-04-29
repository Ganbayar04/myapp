import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../../config";
import DarkMode from "../../styles/darkMode";
import { useUser } from "../../src/contexts/userContext";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Account = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    fetchAccounts();
  }, [user]);

  const fetchAccounts = async () => {
    setIsLoading(true);
    if (!user || !user.id) {
      Alert.alert("Алдаа", "Дансыг харахын тулд нэвтэрнэ үү.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await API.get(`/dans?userId=${user.id}`);
      if (response.data && response.data.length > 0) {
        setAccounts(response.data);
      } else {
        setAccounts([]);
        Alert.alert(
          "Данс байхгүй",
          "Танд үүсгэсэн данс байхгүй байна. Шинээр үүсгэнэ үү!"
        );
      }
    } catch (error) {
      console.error("API error:", error.response ? error.response.data : error);
      Alert.alert(
        "Error",
        "Failed to fetch accounts due to network or server error."
      );
    } finally {
      setIsLoading(false);
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
        fetchAccounts(); // Refresh the account list after status update
      } else {
        throw new Error("Failed to update account status");
      }
    } catch (error) {
      console.error("API error:", error.response ? error.response.data : error);
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

      <ScrollView>
        {accounts.length > 0 ? (
          accounts.map((account, index) => (
            <View key={index} style={styles.accountCard}>
              <Icon
                name="bank"
                size={20}
                color={isDarkMode ? "#000" : "#000"}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.accountText}>
                {account.name} - Үлдэгдэл: {account.uldegdel}- Төрөл:{" "}
                {account.turul?.name}
              </Text>
              <MaterialIcons
                name={
                  account.accountStatus === "Active" ? "check-circle" : "cancel"
                }
                size={20}
                color={account.accountStatus === "Active" ? "green" : "red"}
                style={{ marginLeft: "auto", marginRight: 10 }}
                onPress={() => toggleAccountStatus(account)}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Zasah", { accountId: account._id })
                }
              >
                <Icon
                  name="edit"
                  size={20}
                  color="#007AFF"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noAccountsText}>
            Үүсгэсэн данс байхгүй байна.
          </Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Uusgeh")}
        >
          <Text
            style={[styles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}
          >
            Данс үүсгэх
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Haasan")}
        >
          <Text
            style={[styles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}
          >
            Хаасан данс харах
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
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
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accountText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  noAccountsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  refreshButton: {
    backgroundColor: "#007AFF",
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

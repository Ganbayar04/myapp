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
    const fetchAccounts = async () => {
      if (!user || !user.id) {
        Alert.alert("Алдаа", "Дансыг харахын тулд нэвтэрнэ үү.");
        return;
      }
      //console.log("Хэрэглэгчийн ID-д данс авах хүсэлт гаргах:", user.id);
      try {
        const response = await API.get(`/dans?userId=${user.id}`);
        //console.log("Бүртгэл хүлээн авсан:", response.data);
        if (response.data && response.data.length > 0) {
          setAccounts(response.data);
        } else {
          setAccounts([]);
          Alert.alert("Данс байхгүй", "Энэ хэрэглэгчид данс олдсонгүй.");
        }
      } catch (error) {
        console.error(
          "API error:",
          error.response ? error.response.data : error
        );
        Alert.alert(
          "Error",
          error.response && error.response.data && error.response.data.message
            ? `Failed to fetch accounts: ${error.response.data.message}`
            : "Failed to fetch accounts due to network or server error."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccounts();
  }, [user]);

  const toggleAccountStatus = async (account) => {
    //console.log("Дансны объект хүлээн авсан:", account);

    const newStatus =
      account.accountStatus === "Active" ? "Inactive" : "Active";

    if (!account._id) {
      console.error("Дансны дугаар байхгүй байна");
      Alert.alert("Алдаа", "Дансны дугаар байхгүй байна");
      return;
    }

    try {
      //console.log("Дансны дугаарын статусыг шинэчлэх:", account._id);

      const response = await API.put(`/dans/updateStatus/${account._id}`, {
        accountStatus: newStatus,
      });

      if (response.status === 200) {
        const updatedAccount = response.data;
        setAccounts(
          accounts.map((acc) =>
            acc._id === account._id ? { ...acc, accountStatus: newStatus } : acc
          )
        );
        Alert.alert("Амжилттай", `Дансны статус шинэчлэгдсэн ${newStatus}`);
      } else {
        throw new Error("Дансны статусыг шинэчилж чадсангүй");
      }
    } catch (error) {
      console.error("Статусаа шинэчилж чадсангүй:", error);
      Alert.alert(
        "Алдаа",
        `Дансны статусыг шинэчилж чадсангүй: ${error.message || error}`
      );
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View
      style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}
    >
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
                {account.name} - Үлдэгдэл: {account.uldegdel}
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
                  navigation.navigate("EditAccount", { accountId: account._id })
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
          <Text style={styles.noAccountsText}>No accounts found.</Text>
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Screen3")}
        >
          <Text
            style={[styles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}
          >
            Тусламж
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
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  darkModeContainer: {
    backgroundColor: "#333",
  },
  accountCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
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
});

export default Account;

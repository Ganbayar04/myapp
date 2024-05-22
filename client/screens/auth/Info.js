import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import API from "../../config"; // Ensure this points to your API configuration

const Info = ({ route }) => {
  const { userId } = route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [turulList, setTurulList] = useState({});

  useEffect(() => {
    fetchAllData();
  }, [userId]);

  const fetchAllData = async () => {
    await fetchUserDetails();
    await fetchAccounts();
    await fetchTurulList();
  };

  const fetchTurulList = async () => {
    try {
      const response = await API.get("/dansTurul");
      if (response.status === 200) {
        setTurulList(
          response.data.reduce((acc, turul) => {
            acc[turul._id] = turul.name;
            return acc;
          }, {})
        );
      } else {
        Alert.alert("Error", `Unexpected HTTP status ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch Turul list:", error);
      Alert.alert("Error", "Failed to fetch Turul list.");
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await API.get(`/users/${userId}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      Alert.alert("Error", "Failed to load user details.");
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

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      {userDetails ? (
        <View>
          <Text style={styles.detailItem}>И-мейл: {userDetails.email}</Text>
          <Text style={styles.detailItem}>Role: {userDetails.role}</Text>
          <Text style={styles.detailItem}>Данс:</Text>
          {accounts.length > 0 ? (
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Дансны нэр</Text>
                <Text style={styles.headerCell}>Үлдэгдэл</Text>
                <Text style={styles.headerCell}>Төрөл</Text>
                <Text style={styles.headerCell}>Төлөв</Text>
                <Text style={styles.headerCell}>Тайлбар</Text>
              </View>
              {accounts.map((account, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.cell}>{account.name}</Text>
                  <Text style={styles.cell}>
                    {account.uldegdel?.toLocaleString() || "Unavailable"}
                  </Text>
                  <Text style={styles.cell}>
                    {turulList[account.turul_id] || "Тодорхойгүй"}
                  </Text>
                  <Text style={styles.cell}>
                    {account.accountStatus || "Тодорхойгүй"}
                  </Text>
                  <Text style={styles.cell}>
                    {account.tailbar || "Тодорхойгүй"}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.accountItem}>
              No accounts found for this user.
            </Text>
          )}
        </View>
      ) : (
        <Text>No user details found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  detailItem: {
    paddingVertical: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  accountItem: {
    paddingVertical: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Info;

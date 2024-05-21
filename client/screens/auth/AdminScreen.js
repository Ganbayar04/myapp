import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AdminScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <View style={styles.dashboardContainer}>
        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => navigation.navigate("Users")}
        >
          <Text style={styles.dashboardItemText}>Хэрэглэгч</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => navigation.navigate("Turul")}
        >
          <Text style={styles.dashboardItemText}>Tөрөл</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => navigation.navigate("oTurul")}
        >
          <Text style={styles.dashboardItemText}>Орлого</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => navigation.navigate("zTurul")}
        >
          <Text style={styles.dashboardItemText}>Зарлага</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dashboardContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dashboardItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    margin: 10,
    width: 200,
    alignItems: "center",
  },
  dashboardItemText: {
    fontSize: 18,
  },
});

export default AdminScreen;

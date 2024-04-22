import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BasicSlider = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dashboardItem}
        onPress={() => navigation.navigate("Sambar")}
      >
        <Text style={styles.dashboardItemText}>Самбар</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dashboardItem}
        onPress={() => navigation.navigate("Account")}
      >
        <Text style={styles.dashboardItemText}>Данс</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dashboardItem}
        onPress={() => navigation.navigate("Orlogo")}
      >
        <Text style={styles.dashboardItemText}>Орлого</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dashboardItem}
        onPress={() => navigation.navigate("Zarlaga")}
      >
        <Text style={styles.dashboardItemText}>Зарлага</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dashboardItem}
        onPress={() => navigation.navigate("Tusuw")}
      >
        <Text style={styles.dashboardItemText}>Төсөв</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dashboardItem}
        onPress={() => navigation.navigate("Dugtui")}
      >
        <Text style={styles.dashboardItemText}>Дугтуй</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dashboardItem}
        onPress={() => navigation.navigate("Tailan")}
      >
        <Text style={styles.dashboardItemText}>Тайлан</Text>
      </TouchableOpacity>
      {/* Add more dashboard items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  dashboardItem: {
    width: "40%",
    aspectRatio: 1,
    backgroundColor: "#000bff",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  dashboardItemText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BasicSlider;

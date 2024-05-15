import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Swiper from "react-native-swiper";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <View style={styles.dashboardContainer}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },

  teamContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  memberImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  memberBalance: {
    fontSize: 14,
    color: "gray",
  },
  dashboardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  dashboardItem: {
    width: "40%",
    aspectRatio: 1,
    backgroundColor: "#008",
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

export default HomeScreen;

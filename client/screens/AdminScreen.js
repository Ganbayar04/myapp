import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const AdminScreen = ({ route, navigation }) => {
  const username = route.params?.username || "Guest";
  console.log("Админ хуудсанд нэвтэрсэн хэрэглэгчийн нэр:", username);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Админ хуудсанд тавтай морил, {username}!</Text>
      <Button title="Гарах" onPress={() => navigation.replace("Login")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default AdminScreen;

import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = ({ route, navigation }) => {
  const username = route.params?.username || "Guest";
  console.log("Хэрэглэгчийн нэр:", username);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Тавтай морил, хэрэглэгчийн хуудас:  {username}!</Text>
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

export default HomeScreen;

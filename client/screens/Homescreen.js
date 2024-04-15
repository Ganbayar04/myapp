import React, { useContext, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext.js";

const HomeScreen = ({ navigation }) => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const handleLogout = async () => {
    console.log("Гарч байна!...");
    await logout();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      {userInfo.user && (
        <Text style={styles.welcome}>
          Тавтай морил: {userInfo.user.fullname}
        </Text>
      )}
      <Button title="Гарах" color="red" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;

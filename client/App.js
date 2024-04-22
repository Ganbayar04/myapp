import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import HomeScreen from "./screens/Homescreen";
import AdminScreen from "./screens/AdminScreen";
import Sambar from "./screens/Sambar";
import Account from "./screens/dans/Account";
//import Settings from "./screens/Settings";
//import Dugtui from "./screens/Dugtui";
//import Tailan from "./screens/Tailan";
//import Tusuw from "./screens/Tusuw";
//import Orlogo from "./screens/Orlogo";
//import Zarlaga from "./screens/Dugtui";
//import Burtgeh from "./screens/dans/Burtgeh";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Sambar" component={Sambar} />
        <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
/*<Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Sambar" component={Sambar} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Dugtui" component={Dugtui} />
        <Stack.Screen name="Tailan" component={Tailan} />
        <Stack.Screen name="Tusuw" component={Tusuw} />
        <Stack.Screen name="Orlogo" component={Orlogo} />
<Stack.Screen name="Zarlaga" component={Zarlaga} />*/

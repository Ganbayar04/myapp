import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import HomeScreen from "./screens/auth/Homescreen.js";
import AdminScreen from "./screens/auth/AdminScreen";
//import Sambar from "./screens/Sambar";
import Account from "./screens/dans/Account";
import Haasan from "./screens/dans/Haasan";
import Zasah from "./screens/dans/dansEdit.js";
import Users from "./screens/auth/Users.js";
import Dugtui from "./screens/Dugtui";
import Turul from "./screens/dans/turul.js";
import Tusuw from "./screens/tusuw/Tusuw";
import Orlogo from "./screens/orlogo/Orlogo";
import Zarlaga from "./screens/zarlaga/Zarlaga";
import Uusgeh from "./screens/dans/Uusgeh";
import Info from "./screens/auth/Info.js"
import Nemeh from "./screens/orlogo/Nemeh.js";

import { UserProvider } from "./src/contexts/userContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Haasan" component={Haasan} />
          <Stack.Screen name="Zasah" component={Zasah} />
          <Stack.Screen name="Dugtui" component={Dugtui} />
          <Stack.Screen name="Uusgeh" component={Uusgeh} />
          <Stack.Screen name="Tusuw" component={Tusuw} />
          <Stack.Screen name="Orlogo" component={Orlogo} />
          <Stack.Screen name="Zarlaga" component={Zarlaga} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="Turul" component={Turul} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="Nemeh" component={Nemeh} />
        </Stack.Navigator>
       
      </NavigationContainer>
    </UserProvider>
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
         <Stack.Screen name="Tailan" component={Tailan} />
        */

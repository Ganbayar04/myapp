import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import AdminScreen from "./screens/auth/AdminScreen";
//import Sambar from "./screens/Sambar";
import Account from "./screens/dans/Account";
import Haasan from "./screens/dans/Haasan";
import Zasah from "./screens/dans/dansEdit.js";
import Users from "./screens/auth/Users.js";
import Turul from "./screens/auth/turul.js";
import Tusuw from "./screens/tusuw/Tusuw";
import Orlogo from "./screens/dans/Orlogo.js";
import Zarlaga from "./screens/dans/Zarlaga";
import Info from "./screens/auth/Info.js"
import Turulz from "./screens/auth/zTurul.js";
import Turulo from "./screens/auth/oTurul.js";
import Completed from "./screens/tusuw/completed.js";
import TOrlogo from "./screens/tusuw/TOrlogo.js";
import TZarlaga from "./screens/tusuw/TZarlaga.js";
import Details from "./screens/tusuw/Details.js";

import { UserProvider } from "./src/contexts/userContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Haasan" component={Haasan} />
          <Stack.Screen name="Zasah" component={Zasah} />       
          <Stack.Screen name="Orlogo" component={Orlogo} />
          <Stack.Screen name="Zarlaga" component={Zarlaga} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="Turul" component={Turul} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="oTurul" component={Turulz} />
          <Stack.Screen name="zTurul" component={Turulo} />
          <Stack.Screen name="Tusuw" component={Tusuw} />
          <Stack.Screen name="Completed" component={Completed} />
          <Stack.Screen name="TOrlogo" component={TOrlogo} />
          <Stack.Screen name="TZarlaga" component={TZarlaga} />
          <Stack.Screen name="Details" component={Details} />
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

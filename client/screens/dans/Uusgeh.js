import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DarkMode from "../../styles/darkMode";
import CustomButton from '../../styles/customButton'; // Import CustomButton component

const Uusgeh = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [turul, setTurul] = useState("");
  const [uldegdel, setUldegdel] = useState("");
  const [tailbar, setTailbar] = useState("");
  const [role, setRole] = useState("Хаасан Хаагаагүй");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Fixed typo in state name

  const handleRegister = () => {
    // Implement your registration logic here
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle theme
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Turul"
            value={turul}
            onChangeText={setTurul}
            style={styles.input}
          />
          <TextInput
            placeholder="Uldegdel"
            value={uldegdel}
            onChangeText={setUldegdel}
            style={styles.input}
          />
          <TextInput
            placeholder="Tailbar"
            value={tailbar}
            onChangeText={setTailbar}
            style={styles.input}
          />
          <TextInput
            placeholder="Role"
            value={role}
            onChangeText={setRole}
            style={styles.input}
          />
          <CustomButton title="Хадгалах" onPress={handleRegister} />
          <CustomButton
            title="Болих"
            onPress={() => navigation.navigate("Account")}
          />
        </ScrollView>
      )}
      <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  darkModeContainer: {
    backgroundColor: '#000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Uusgeh;

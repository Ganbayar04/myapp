import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DarkMode from "../../styles/darkMode"; 

const Account = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
    <ScrollView>
      <View style={styles.dashboardContainer}>
        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => navigation.navigate("Screen1")}
        >
          <Text style={[styles.dashboardItemText, { color: isDarkMode ? "#fff" : "#000" }]}>Данс үүсгэх</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => navigation.navigate("Screen2")}
        >
          <Text style={[styles.dashboardItemText, { color: isDarkMode ? "#fff" : "#000" }]}>Хаасан данс харах</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => navigation.navigate("Screen3")}
        >
          <Text style={[styles.dashboardItemText, { color: isDarkMode ? "#fff" : "#000" }]}>Тусламж</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
  dashboardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
  dashboardItem: {
    width: '80%',
    aspectRatio: 4,
    marginVertical: 8,
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0,
    borderColor: 'black',
  },
  dashboardItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Account;

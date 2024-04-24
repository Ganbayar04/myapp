import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import DarkMode from "../styles/darkMode"; 

const AdminScreen = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDarkmode, setIsDarkmode] = useState(false);

  // Function to toggle admin status
  const toggleAdminStatus = () => {
    setIsAdmin(!isAdmin);
  };

  const toggleTheme = () => {
    setIsDarkmode(!isDarkmode); // Toggle theme
  };

  return (
    <View style={[styles.container, isDarkmode ? styles.darkModeContainer : null]}>
    <ScrollView>

    
      <Text style={styles.title}>Admin Panel</Text>
      <Text style={styles.text}>You are currently {isAdmin ? 'an admin' : 'not an admin'}</Text>
      <Button
        title={isAdmin ? 'Revoke Admin Privileges' : 'Grant Admin Privileges'}
        onPress={toggleAdminStatus}
      />
      </ScrollView>
      <DarkMode isDarkMode={isDarkmode} setIsDarkMode={setIsDarkmode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  darkModeContainer: {
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default AdminScreen;

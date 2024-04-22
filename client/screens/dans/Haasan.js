import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DarkMode from "../../styles/darkMode"; 
import Account from '../dans/Account';

const Haasan = () => {
  const [users, setUsers] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch data and filter users with "haagaagui" role
  useEffect(() => {
    const fetchData = async () => {
      // Perform data fetching (e.g., fetch from an API)
      // Filter users with "haagaagui" role
      // Example:
      const response = await fetch('https://api.example.com/users');
      const data = await response.json();
      const haagaaguiAccount = data.filter(Account => Account.role=== 'haagaagui');
      setUsers(haagaaguiAccount );
    };

    fetchData();
  }, []);

  return (
     <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      <Text style={styles.title}>Users with Haagaagui Role:</Text>
      {users.map(user => (
        <View key={user.id} style={styles.userContainer}>
          <Text>{user.username}</Text>
          <Text>{user.role}</Text>
          {/* Add other user details as needed */}
        </View>
      ))}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  darkModeContainer: {
    backgroundColor: '#000', // Dark mode background color
  },
});

export default Haasan;

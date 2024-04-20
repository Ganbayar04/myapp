import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DarkMode from "../styles/darkMode"; 

const Settings = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      {/* Add your settings UI components here */}
      {/* For example, buttons, switches, or any other settings elements */}

      {/* DarkMode component */}
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
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  themeToggle: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  themeToggleText: {
    fontSize: 16,
    color: '#000fff',
  },
});

export default Settings;

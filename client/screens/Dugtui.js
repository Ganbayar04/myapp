import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DarkMode from "../../styles/darkMode"; 

const Dugtui = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleEdit = () => {
      // Implement edit functionality
    };
  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      {/* Column: Дугтуй */}
      <View style={styles.column}>
        <Text style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}>Дугтуй</Text>
        {/* Add content for Дугтуй column */}
      </View>

      {/* Column: Төлөвлөгөөт төсөв */}
      <View style={styles.column}>
        <Text style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}>Төлөвлөгөөт төсөв</Text>
        {/* Add content for Төлөвлөгөөт төсөв column */}
      </View>

      {/* Column: Үлдэгдэл */}
      <View style={styles.column}>
        <Text style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}>Үлдэгдэл</Text>
        {/* Add content for Үлдэгдэл column */}
      </View>

      {/* Column: Засах */}
      <View style={styles.column}>
        <Text style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}>Засах</Text>
        {/* Add content for Засах column */}
      </View>
      <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 5,
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  darkModeContainer: {
    backgroundColor: '#000', // Dark mode background color
  },
});

export default Dugtui;

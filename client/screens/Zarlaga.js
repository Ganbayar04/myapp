import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DarkMode from "../../client/styles/darkMode"; 

const Zarlaga = () => {
    const [utga, setUtga] = useState('');
    const [torol, setTorol] = useState('');
    const [tosov, setTosov] = useState('');
    const [dun, setDun] = useState('');
    const [dans, setDans] = useState('');
    const [ognoo, setOgnoo] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleEdit = () => {
      // Implement edit functionality
    };
  
    const handleDelete = () => {
      // Implement delete functionality
    };
  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      {/* Column: Зарлагын утга */}
      <View style={styles.column}>
      <Text style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}>Зарлагын утга</Text>
        {/* Add content for Зарлагын утга column */}
      </View>

      {/* Column: Зарлагын төрөл */}
      <View style={styles.column}>
      <Text style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}>Зарлагын төрөл</Text>
        {/* Add content for Зарлагын төрөл column */}
      </View>

      {/* Column: Төсөв */}
      <View style={styles.column}>
      <Text style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}>Төсөв</Text>
        {/* Add content for Төсөв column */}
      </View>

      {/* Column: Дүн */}
      <View style={styles.column}>
        <Text style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}>Дүн</Text>
        {/* Add content for Дүн column */}
      </View>

      {/* Column: Данс */}
      <View style={styles.column}>
        <Text style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}>Данс</Text>
        {/* Add content for Данс column */}
      </View>

      {/* Column: Огноо */}
      <View style={styles.column}>
        <Text style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}>Огноо</Text>
        {/* Add content for Огноо column */}
      </View>

      {/* Column: Засах / Устгах */}
      <View style={styles.column}>
        <Text style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}>Засах / Устгах</Text>
        {/* Add content for Засах / Устгах column */}
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

export default Zarlaga;

import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import DarkMode from '../../styles/darkMode';

const Zarlaga = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Implement edit functionality
  const handleEdit = () => {
    // Implement edit functionality
  };

  // Implement delete functionality
  const handleDelete = () => {
    // Implement delete functionality
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Define table data
  const ZarlagaData = {
    tableHead: ["Зарлагын утга", "Зарлагын Төрөл", "Төсөв", "Дүн", "Данс", "Огноо", "Засах / Устгах"],
    tableTitle: ['Row', 'Row 2', 'Row 3', 'Row 4'],
    tableData: [
      ["Утга 1", "Төрөл 1", "Төсөв 1", "Дүн 1", "Данс 1", "Огноо 1"],
      ["Утга 2", "Төрөл 2", "Төсөв 2", "Дүн 2", "Данс 2", "Огноо 2"],
    ],
  };

  return (
    <View style={[styles.container,  isDarkMode ? styles.darkModeContainer : null]}>
    <ScrollView>
    <Table className="zarlaga">
        {
          ZarlagaData.tableData.map((rowData, index) => (
            <Row
              key={index}
              data={[...rowData, <TouchableOpacity onPress={handleDelete}><Text>Устгах</Text></TouchableOpacity>]}
              style={index === 0 ? styles.columnHeader : styles.tableRow}
              textStyle={styles.columnText}
            />
          ))
        }
      </Table>
       </ScrollView>
    
      <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 100,
    paddingHorizontal: 10,
    marginTop: 20,
  
  },
  columnHeader: {
    height: 60,
    backgroundColor: '#f7f7f7',
  },
  tableRow: {
    height: 30,
    backgroundColor: '#fff',
  },
  columnText: {
    textAlign: 'center',
    padding: 5,
    fontSize: 12,
  },
  darkModeContainer: {
    backgroundColor: '#000',
  },
});

export default Zarlaga;

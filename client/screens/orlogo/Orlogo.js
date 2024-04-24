import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import DarkMode from "../../styles/darkMode"; 

const Orlogo = () => {
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
  const OrlogoData = {
    tableHead: ["Утга", "Төрөл", "Төсөв", "Дүн", "Данс", "Огноо", "Засах / Устгах"],
    tableTitle: ['Row', 'Row 2', 'Row 3', 'Row 4'],
    tableData: [
      ["Утга 1", "Төрөл 1", "Төсөв 1", "Дүн 1", "Данс 1", "Огноо 1"],
      ["Утга 2", "Төрөл 2", "Төсөв 2", "Дүн 2", "Данс 2", "Огноо 2"],
    ],
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      <ScrollView>
        {/* Table Header */}
        <Table className="Orlogo">
          <Row
            data={OrlogoData.tableHead} // Provide tableHead directly to the Row component
            style={[styles.columnHeader, { backgroundColor: '#1EE34F' }]} // Apply header styles here
            textStyle={styles.columnText}
          />
        </Table>

        {/* Table Body */}
        <Table className="Orlogo">
          {
            OrlogoData.tableData.map((rowData, index) => (
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

export default Orlogo;

<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import DarkMode from "../../styles/darkMode"; 

const Orlogo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Implement edit functionality
=======
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DarkMode from "../../styles/darkMode";

const Orlogo = () => {
  const [utga, setUtga] = useState("");
  const [torol, setTorol] = useState("");
  const [tosov, setTosov] = useState("");
  const [dun, setDun] = useState("");
  const [dans, setDans] = useState("");
  const [ognoo, setOgnoo] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
>>>>>>> f1834a5caa0b867ed692d29cd73013041a2329ca
  const handleEdit = () => {
    // Implement edit functionality
  };

<<<<<<< HEAD
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
=======
  const handleDelete = () => {
    // Implement delete functionality
  };
  return (
    <View
      style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}
    >
      {/* Column: Орлогын утга */}
      <View style={styles.column}>
        <Text
          style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          Орлогын утга
        </Text>
        {/* Add content for Орлогын утга column */}
      </View>

      {/* Column: Орлогын төрөл */}
      <View style={styles.column}>
        <Text
          style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          Орлогын төрөл
        </Text>
        {/* Add content for Орлогын төрөл column */}
      </View>

      {/* Column: Төсөв */}
      <View style={styles.column}>
        <Text
          style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          Төсөв
        </Text>
        {/* Add content for Төсөв column */}
      </View>

      {/* Column: Дүн */}
      <View style={styles.column}>
        <Text
          style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          Дүн
        </Text>
        {/* Add content for Дүн column */}
      </View>

      {/* Column: Данс */}
      <View style={styles.column}>
        <Text
          style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          Данс
        </Text>
        {/* Add content for Данс column */}
      </View>

      {/* Column: Огноо */}
      <View style={styles.column}>
        <Text
          style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          Огноо
        </Text>
        {/* Add content for Огноо column */}
      </View>

      {/* Column: Засах / Устгах */}
      <View style={styles.column}>
        <Text
          style={[styles.columnHeader, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          Засах / Устгах
        </Text>
        {/* Add content for Засах / Устгах column */}
      </View>
>>>>>>> f1834a5caa0b867ed692d29cd73013041a2329ca
      <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    flex: 1,
    padding: 100,
=======
    flexDirection: "row",
    justifyContent: "space-between",
>>>>>>> f1834a5caa0b867ed692d29cd73013041a2329ca
    paddingHorizontal: 10,
    marginTop: 20,
  },
  columnHeader: {
<<<<<<< HEAD
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
=======
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  darkModeContainer: {
    backgroundColor: "#000", // Dark mode background color
>>>>>>> f1834a5caa0b867ed692d29cd73013041a2329ca
  },
});

export default Orlogo;

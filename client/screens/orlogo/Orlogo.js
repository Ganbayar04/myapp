import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Table, Row } from "react-native-table-component";
import DarkMode from "../../styles/darkMode";

const Orlogo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation(); // Correctly using the hook to extract the navigation object.

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
    tableHead: [
      "Утга",
      "Төрөл",
      "Төсөв",
      "Дүн",
      "Данс",
      "Огноо",
      "Засах / Устгах",
    ],
    tableTitle: ["Row", "Row 2", "Row 3", "Row 4"],
    tableData: [
      ["Утга 1", "Төрөл 1", "Төсөв 1", "Дүн 1", "Данс 1", "Огноо 1"],
      ["Утга 2", "Төрөл 2", "Төсөв 2", "Дүн 2", "Данс 2", "Огноо 2"],
    ],
  };

  return (
    <View
      style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}
    >
      <ScrollView>
        {/* Table Header */}
        <Table>
          <Row
            data={OrlogoData.tableHead}
            style={[styles.columnHeader, { backgroundColor: "#1EE34F" }]}
            textStyle={styles.columnText}
          />
        </Table>

        {/* Table Body */}
        <Table>
          {OrlogoData.tableData.map((rowData, index) => (
            <Row
              key={index}
              data={[
                ...rowData,
                <TouchableOpacity onPress={handleDelete}>
                  <Text>Устгах</Text>
                </TouchableOpacity>,
              ]}
              style={index === 0 ? styles.columnHeader : styles.tableRow}
              textStyle={styles.columnText}
            />
          ))}
        </Table>
      </ScrollView>
      <View style={styles.footerButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Nemeh")}
        >
          <Text style={styles.buttonText}>Орлого үүсгэх</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Haasan")}
        >
          <Text style={styles.buttonText}>Шилжүүлэг хийх</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#f7f7f7",
  },
  tableRow: {
    height: 30,
    backgroundColor: "#fff",
  },
  columnText: {
    textAlign: "center",
    padding: 5,
    fontSize: 12,
  },
  darkModeContainer: {
    backgroundColor: "#000",
  },
  button: {
    backgroundColor: "#fFF",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  refreshButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 20,
    zIndex: 1000,
  },
});

export default Orlogo;

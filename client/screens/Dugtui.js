import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import DarkMode from "../../client/styles/darkMode"; 

const Dugtui = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleEdit = (rowData) => {
      // Implement edit functionality here, you can access rowData to identify the item being edited
      console.log("Editing item:", rowData);
    };

    const DugtuiData = {
      tableHead: ["Дугтуй", "Төлөвлөгөөт төсөв", "Үлдэгдэл", "Засах "],
      tableTitle: ['Row', 'Row 2', 'Row 3', 'Row 4'],
      tableData: [
        ["Дугтуй1", "Төлөвлөгөөт төсөв", "Үлдэгдэл", "Засах "],
        ["Дугтуй2", "Төлөвлөгөөт төсөв", "Үлдэгдэл", "Засах "],
      ],
    };
    
    return (
      <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      <ScrollView>
       
       
        {/* Table Header */}
        <Table className="Dugtui">
          <Row
            data={DugtuiData.tableHead}
            style={[styles.columnHeader, { backgroundColor: '#1EE34F' }]}
            textStyle={styles.columnText}
          />
        </Table>
  
        {/* Table Body */}
        <Table className="Dugtui">
          {
            DugtuiData.tableData.map((rowData, index) => (
              <Row
                key={index}
                data={[...rowData, (
                  <TouchableOpacity onPress={() => handleEdit(rowData)}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                )]}
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
  
  export default Dugtui;

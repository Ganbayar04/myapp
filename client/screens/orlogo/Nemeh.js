import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DarkMode from "../../styles/darkMode"; 

const Orlogo = () => {
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
      <Text style={styles.label}>Орлогын утга:</Text>
      <TextInput
        style={styles.input}
        value={utga}
        onChangeText={setUtga}
      />
      <Text style={styles.label}>Орлогын төрөл:</Text>
      <TextInput
        style={styles.input}
        value={torol}
        onChangeText={setTorol}
      />
      <Text style={styles.label}>Төсөв:</Text>
      <TextInput
        style={styles.input}
        value={tosov}
        onChangeText={setTosov}
      />
      <Text style={styles.label}>Дүн:</Text>
      <TextInput
        style={styles.input}
        value={dun}
        onChangeText={setDun}
      />
      <Text style={styles.label}>Данс:</Text>
      <TextInput
        style={styles.input}
        value={dans}
        onChangeText={setDans}
      />
      <Text style={styles.label}>Огноо:</Text>
      <TextInput
        style={styles.input}
        value={ognoo}
        onChangeText={setOgnoo}
      />
      <View style={styles.buttonContainer}>
        <Button title="Засах" onPress={handleEdit} />
        <Button title="Устгах" onPress={handleDelete} />
      </View>

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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  darkModeContainer: {
    backgroundColor: '#000', // Dark mode background color
  },
});

export default Orlogo;

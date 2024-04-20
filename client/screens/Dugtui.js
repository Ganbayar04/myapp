import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';

const DugtuitTusuwScreen = () => {
  const [summaryData, setSummaryData] = useState([
    { label: 'Нийт мөнгө', value: '$2000' },
    { label: 'Хадгалсан мөнгө', value: '$1500' },
    { label: 'Зээлийн үлдэгдэл', value: '$2000' },
    { label: 'Энэ сарын орлого', value: '$500' },
    { label: 'Энэ сарын зарлага', value: '$1500' },
  ]);

  const transactionData = [
    { id: '1', amount: '$100', category: 'Groceries', date: '2024-04-15' },
    { id: '2', amount: '$50', category: 'Dining Out', date: '2024-04-14' },
    { id: '3', amount: '$80', category: 'Transportation', date: '2024-04-13' },
  ];

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text>{item.amount}</Text>
      <Text>{item.category}</Text>
      <Text>{item.date}</Text>
    </View>
  );

  const onSwipeRight = (gestureState, index) => {
    const newData = [...summaryData];
    newData.splice(index, 1);
    setSummaryData(newData);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Өрхийн төсөв</Text>
      </View>

      <FlatList
        data={summaryData}
        renderItem={({ item, index }) => (
          <GestureRecognizer
            key={index}
            style={styles.summaryCard}
            onSwipeRight={() => onSwipeRight({}, index)}
          >
            <FontAwesome name="credit-card" size={24} color="black" />
            <Text style={styles.summaryLabel}>{item.label}</Text>
            <Text>{item.value}</Text>
          </GestureRecognizer>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />

      <View style={styles.navigationContainer}>
        <Button title="Add Transaction" onPress={() => console.log('Add Transaction')} />
        <Button title="View Transactions" onPress={() => console.log('View Transactions')} />
      </View>

      <FlatList
        data={transactionData}
        renderItem={renderTransactionItem}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity onPress={toggleDarkMode} style={styles.darkModeToggle}>
        <Text style={styles.darkModeToggleText}>
          {isDarkMode ? "☀️ Light Theme" : "🌑 Dark Theme"}
        </Text>
      </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  summaryLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  darkModeToggle: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  darkModeToggleText: {
    fontSize: 16,
    color: "#000000",
  },
});

export default DugtuitTusuwScreen;

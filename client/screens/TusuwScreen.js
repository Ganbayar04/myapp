import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const HomeScreen = () => {
  // Dummy data for summary cards and transaction list
  const [summaryData, setSummaryData] = useState([
    { label: 'Самбар' },
    { label: 'Данс' },
    { label: 'Орлого' },
    { label: 'Зарлага' },
    { label: 'Төсөв'},
    { label: 'Дугтуй' },
    { label: 'Тайлан' },
    { label: 'Тохиргоо'}
  ]);

  const transactionData = [
    { id: '1', amount: '$100', category: 'Groceries', date: '2024-04-15' },
    { id: '2', amount: '$50', category: 'Dining Out', date: '2024-04-14' },
    { id: '3', amount: '$80', category: 'Transportation', date: '2024-04-13' },
    // Add more transaction data as needed
  ];

  // Render item for transaction list
  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text>{item.amount}</Text>
      <Text>{item.category}</Text>
      <Text>{item.date}</Text>
    </View>
  );

  // Handle swipe gestures
  const onSwipeRight = (gestureState, index) => {
    const newData = [...summaryData];
    newData.splice(index, 1);
    setSummaryData(newData);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget App</Text>
      </View>

      {/* Summary Cards */}
      <FlatList
        data={summaryData}
        renderItem={({ item, index }) => (
          <GestureRecognizer
            key={index}
            style={styles.summaryCard}
            onSwipeRight={() => onSwipeRight({}, index)}
          >
            <Text>{item.label}</Text>
            <Text>{item.value}</Text>
          </GestureRecognizer>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <Button title="Add Transaction" onPress={() => console.log('Add Transaction')} />
        <Button title="View Transactions" onPress={() => console.log('View Transactions')} />
        {/* Add more navigation buttons as needed */}
      </View>

      {/* Transaction List */}
      <FlatList
        data={transactionData}
        renderItem={renderTransactionItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
    width: 120,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
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
});

export default HomeScreen;

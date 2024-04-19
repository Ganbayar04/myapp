// ZarlagaScreen.js
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Zarlaga = ({ navigation }) => {
  // State for transaction details
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Function to handle Zarlaga
  const handleZarlaga = () => {
    // Add logic to save Zarlaga in database
    console.log('Zarlaga:', { amount, category, description });
    // Redirect or perform any necessary actions after transaction
  };

  return (
    <View>
      <Text>Zarlaga Screen</Text>
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Submit" onPress={handleZarlaga} />
    </View>
  );
};

export default Zarlaga;

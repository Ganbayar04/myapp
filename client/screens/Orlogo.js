// TransactionInScreen.js
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Orlogo  = ({ navigation }) => {
  // State for transaction details
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Function to handle Orlogo
  const handleOrlogo = () => {
    // Add logic to save Orlogo database
    console.log('Orlogo:', { amount, category, description });
    // Redirect or perform any necessary actions after transaction
  };

  return (
    <View>
      <Text>Orlogo Screen</Text>
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
      <Button title="Submit" onPress={handleOrlogo} />
    </View>
  );
};

export default Orlogo;

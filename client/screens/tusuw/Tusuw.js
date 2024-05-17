import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tusuw= () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  
  dashboardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
  dashboardItem: {
    width: '80%',
    aspectRatio: 4,
    marginVertical: 8,
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0,
    borderColor: 'black',
  },
  dashboardItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Tusuw;

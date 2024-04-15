import React from 'react';
import {StatusBar, Text, View,StyleSheet} from 'react-native';
import Navigation from './components/Navigation';
import {AuthProvider} from './context/AuthContext';
const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#06bcee" />
      <Navigation />
    </AuthProvider>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

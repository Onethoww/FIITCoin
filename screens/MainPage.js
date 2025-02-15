import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function MainPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FIIT Coin</Text>
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

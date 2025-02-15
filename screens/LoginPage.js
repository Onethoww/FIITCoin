import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LoginPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FIIT Coin Login</Text>
      <Button title="Login with Google" onPress={() => navigation.navigate('Main')} />
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

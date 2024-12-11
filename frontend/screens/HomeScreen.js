/**
 * StAuth10244: I Rodrigo Wong Mac, #000887648 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made 
 * my work available to anyone else.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Reset the username and password whenever the screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      setUsername('');
      setPassword('');
      setErrorMessage('');
    });

    // Return unsubscribe to clean up the event listener
    return unsubscribe;
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Navigate to MathGameScreen on successful login
        navigation.navigate('MathGame', { username: username });
      } else {
        setErrorMessage('Username and/or password incorrect');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log In</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 20, // Add margin bottom
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});


export default HomeScreen;

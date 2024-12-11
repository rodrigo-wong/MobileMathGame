/**
 * StAuth10244: I Rodrigo Wong Mac, #000887648 certify that this material is my original work.
 * No other person's work has been used without due acknowledgement. I have not made
 * my work available to anyone else.
 */

import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MathGameScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [number1, setNumber1] = useState(Math.floor(Math.random() * 100) + 1);
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 100) + 1);
  const [answer, setAnswer] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Logout"
          onPress={() => navigation.navigate('Home')}
        />
      ),
    });
  }, [navigation]);

  const handleSubmit = () => {
    const correctAnswer = number1 + number2;
    const userAnswer = parseInt(answer, 10);

    fetch('http://localhost:3000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, result: userAnswer === correctAnswer ? 'correct' : 'incorrect' }),
    })
      .then(response => response.json())
      .then((data) => {
        navigation.navigate('GameResult', { result: userAnswer === correctAnswer, username: username, leaders: data });
        setNumber1(Math.floor(Math.random() * 100) + 1);
        setNumber2(Math.floor(Math.random() * 100) + 1);
        setAnswer('');
      })
      .catch(error => {
        console.error('Error updating leaderboard:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {number1} + {number2} = ?
      </Text>
      <TextInput
        placeholder="Enter your answer"
        value={answer}
        onChangeText={setAnswer}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} />
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
  question: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default MathGameScreen;

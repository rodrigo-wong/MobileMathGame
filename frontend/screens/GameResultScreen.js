/**
 * StAuth10244: I Rodrigo Wong Mac, #000887648 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made 
 * my work available to anyone else.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GameResultScreen = ({ route, navigation }) => {
  const { result, username, leaders } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: result ? 'green' : 'red' }]}>
      <Text style={styles.resultText}>{result ? 'Correct!' : 'Incorrect!'}</Text>
      <Text style={styles.leaderboardTitle}>Leaderboard</Text>
      {leaders.leaders.map((username, index) => (
        <Text key={index} style={styles.leaderboardItem}>{username}</Text>
      ))}
      <Button title="Next" onPress={() => navigation.navigate('MathGame', {username: username})} />
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
  resultText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  leaderboardTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
  },
  leaderboardItem: {
    color: 'white',
  },
});

export default GameResultScreen;

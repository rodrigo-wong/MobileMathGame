/**
 * StAuth10244: I Rodrigo Wong Mac, #000887648 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made 
 * my work available to anyone else.
 */

import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // Create this screen
import SignUpScreen from './screens/SignUpScreen'; // Create this screen
import MathGameScreen from './screens/MathGameScreen'; // Create this screen
import GameResultScreen from './screens/GameResultScreen'; // Create this screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MathGame" component={MathGameScreen} />
        <Stack.Screen name="GameResult" component={GameResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

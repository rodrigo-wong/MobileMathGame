/**
 * StAuth10244: I Rodrigo Wong Mac, #000887648 certify that this material is my original work.
 * No other person's work has been used without due acknowledgement. I have not made
 * my work available to anyone else.
 */

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = () => {
    if (!username || !password || !confirmPassword) {
      setErrorMessage("All fields must be completed");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Perform sign-up logic
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) =>
        response
          .json()
          .then((data) => ({ status: response.status, body: data }))
      )
      .then((result) => {
        if (
          result.status === 400 &&
          result.body.error &&
          result.body.error.includes("Username already exists")
        ) {
          setErrorMessage("Username already exists. Please choose another.");
        } else if (result.status === 200) {
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          navigation.replace("MathGame", { username: username });
        } else {
          throw new Error("Sign up failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 20, // Add margin bottom
  },
  input: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default SignUpScreen;

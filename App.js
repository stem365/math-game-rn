import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, Platform } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('+');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    generateProblem();
  }, []);

  const generateProblem = () => {
    const newNum1 = Math.floor(Math.random() * 10);
    const newNum2 = Math.floor(Math.random() * 10);
    const operations = ['+', '-', '*', '/'];
    const newOperation = operations[Math.floor(Math.random() * operations.length)];
    setNum1(newNum1);
    setNum2(newNum2);
    setOperation(newOperation);
    setAnswer('');
  };

  const checkAnswer = () => {
    if (answer.trim() === '' || isNaN(answer)) {
      if (Platform.OS === 'web') {
        alert('Please enter a valid number.');
      } else {
        Alert.alert('Invalid Input', 'Please enter a valid number.', [{ text: 'OK' }]);
      }
      return;
    }

    setAttempts(attempts + 1);
    let correctAnswer;
    switch (operation) {
      case '+':
        correctAnswer = num1 + num2;
        break;
      case '-':
        correctAnswer = num1 - num2;
        break;
      case '*':
        correctAnswer = num1 * num2;
        break;
      case '/':
        correctAnswer = num1 / num2;
        break;
    }

    if (parseFloat(answer) === correctAnswer) {
      if (Platform.OS === 'web') {
        alert('Correct! Good job!');
        generateProblem();
      } else {
        Alert.alert('Correct!', 'Good job!', [{ text: 'Next', onPress: generateProblem }]);
      }
      setScore(score + 1);
    } else {
      if (Platform.OS === 'web') {
        alert('Incorrect. Try again!');
      } else {
        Alert.alert('Incorrect', 'Try again!', [{ text: 'Retry' }]);
      }
      setAnswer('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.problem}>{num1} {operation} {num2} = ?</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={answer}
        onChangeText={setAnswer}
      />
      <Button title="Submit" onPress={checkAnswer} />
      <Text style={styles.score}>Score: {score} of {attempts}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  problem: {
    fontSize: 32,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '30%',
    minWidth: 100,
    textAlign: 'center',
  },
  score: {
    marginTop: 20,
    fontSize: 24,
  },
});
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';

export default function RaiseQueryScreen() {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !query.trim()) {
      Alert.alert('Error', 'Please fill in both email and query fields!');
      return;
    }

    setLoading(true);

    // Simulated API call
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, query }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);

        Alert.alert(
          'Success',
          'Your query has been successfully submitted!',
          [{ text: 'OK', onPress: () => { setEmail(''); setQuery(''); } }]
        );
      } else {
        throw new Error('Failed to submit query');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'An error occurred while submitting your query. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Raise a Query</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter your query"
        multiline
        numberOfLines={4}
        value={query}
        onChangeText={setQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Submit Query" onPress={handleSubmit} color="#6200ee" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200ee',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 16,
  },
});

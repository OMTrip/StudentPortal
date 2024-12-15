import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Requires 'expo-linear-gradient'
import { updateProfile } from '../redux/slice';
import { useDispatch } from 'react-redux';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'test@gmail.com' && password === 'test@123') {
      dispatch(updateProfile({ email }));
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <LinearGradient
      colors={["#6a11cb", "#2575fc"]}
      style={styles.container}
    >
      <Text style={styles.title}>Student Learning Portal</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#bbb"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#bbb"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.footerLink} onPress={() => navigation.navigate('Register')}>
          Sign Up
        </Text>
      </Text> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
  },
  button: {
    width: '90%',
    backgroundColor: '#ff6f61',
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#fff',
  },
  footerLink: {
    color: '#ffdd59',
    fontWeight: 'bold',
  },
});

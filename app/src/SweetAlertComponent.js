import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const AlertModal = ({ visible, onClose, title, message }) => (
  <Modal isVisible={visible} onBackdropPress={onClose}>
    <View style={styles.modal}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Button title="Close" onPress={onClose} />
    </View>
  </Modal>
);


export default AlertModal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
});

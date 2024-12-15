import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';

export default function UploadAssignmentScreen() {
  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState(null);
  const navigation=useNavigation()
  // Function to handle document selection
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow all types of documents
      });

      if (result.canceled) {
        // Document selection was canceled
        Alert.alert('Document selection was canceled.');
      } else if (result.assets && result.assets.length > 0) {
        // Document selected successfully
        const selectedDocument = result.assets[0];
        const selectedName = result.assets[0]; // Access the first document from assets array
        setDocument(selectedDocument); // Store the document object (URI, name, etc.)
        setDocumentName(selectedName.name);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('An error occurred while selecting the document.');
    }
  };

  // Function to handle the upload action
  const uploadDocument = () => {
    if (document) {
      // Document upload logic (e.g., upload to a server)
      Alert.alert('Success', 'Your document has been uploaded!');

      navigation.navigate("Dashboard")
    } else {
      alert('Please select a document first.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Assignment</Text>

      {/* Button to pick a document */}
      <TouchableOpacity style={styles.button} onPress={pickDocument}>
        <Text style={styles.buttonText}>Choose File</Text>
      </TouchableOpacity>

      {/* Display selected document details */}
      {document ? (
        <View style={styles.documentInfo}>
          <Text style={styles.documentText}>📄 File Name: {documentName}</Text>
          <Text style={styles.documentText}>📝 File Type: {document.mimeType}</Text>
        </View>
      ) : (
        <Text style={styles.placeholderText}>No file selected</Text>
      )}

      {/* Button to upload the selected document */}
      <TouchableOpacity style={styles.uploadButton} onPress={uploadDocument}>
        <Text style={styles.uploadButtonText}>Upload File</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#222',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    height: 50,
    width: '85%',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  documentInfo: {
    backgroundColor: '#e2e8f0',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  documentText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 5,
    width:"100%"
  },
  placeholderText: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 20,
  },
  uploadButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16a34a',
    height: 50,
    width: '85%',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

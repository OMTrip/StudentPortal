import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function CoursesScreen() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call for courses
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((response) => response.json())
      .then((data) => {
        const courseData = data.map((item) => ({ id: item.id, title: item.title, description: item.body }));
        setCourses(courseData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderCourse = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Courses</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCourse}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

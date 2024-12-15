import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av';
import * as WebBrowser from 'expo-web-browser';


const imagePaths = {
  math101: require('../../../assets/images/img1.jpg'),
  physics102: require('../../../assets/images/img3.jpg'),
  math103: require('../../../assets/images/img4.jpg'),
  physics104: require('../../../assets/images/img2.jpg'),
  math105: require('../../../assets/images/img5.jpg'),
};


// Dummy data for classes
const classesData = [
  {
    id: '1',
    title: 'Math 101: Algebra Basics',
    description: 'Introduction to Algebra concepts.',
    videoFilePath: require('../../../assets/Vedio/classVedio.mp4'), // Local video
    pdfFilePath: 'https://www.example.com/math-notes.pdf', // URL to a PDF file
    thumbnail: 'math101', // Example thumbnail URL
  },
  {
    id: '2',
    title: 'Science 102: Physics Fundamentals',
    description: 'Basic principles of Physics.',
    videoFilePath: require('../../../assets/Vedio/classVedio.mp4'), // Local video
    pdfFilePath: 'https://www.example.com/physics-notes.pdf', // URL to a PDF file
    thumbnail: 'physics102', // Example thumbnail URL
  },
  {
    id: '3',
    title: 'Math 101: Algebra Basics',
    description: 'Introduction to Algebra concepts.',
    videoFilePath: require('../../../assets/Vedio/classVedio.mp4'), // Local video
    pdfFilePath: 'https://www.example.com/math-notes.pdf', // URL to a PDF file
    thumbnail: 'math103', // Example thumbnail URL
  },
  {
    id: '4',
    title: 'Science 102: Physics Fundamentals',
    description: 'Basic principles of Physics.',
    videoFilePath: require('../../../assets/Vedio/classVedio.mp4'), // Local video
    pdfFilePath: 'https://www.example.com/physics-notes.pdf', // URL to a PDF file
    thumbnail: 'physics104', // Example thumbnail URL
  },
  {
    id: '5',
    title: 'Math 101: Algebra Basics',
    description: 'Introduction to Algebra concepts.',
    videoFilePath: require('../../../assets/Vedio/classVedio.mp4'), // Local video
    pdfFilePath: 'https://www.example.com/math-notes.pdf', // URL to a PDF file
    thumbnail: 'math105', // Example thumbnail URL
  },
  {
    id: '6',
    title: 'Science 102: Physics Fundamentals',
    description: 'Basic principles of Physics.',
    videoFilePath: require('../../../assets/Vedio/classVedio.mp4'), // Local video
    pdfFilePath: 'https://www.example.com/physics-notes.pdf', // URL to a PDF file
    thumbnail: 'physics102', // Example thumbnail URL
  },
 
];

export const PreRecordedClasses = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [viewingType, setViewingType] = useState(null); // Tracks if viewing video or notes

  // Open PDF in a browser or app
  const openPDF = async (pdfUrl) => {
    await WebBrowser.openBrowserAsync(pdfUrl);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedClass(item);
        setViewingType('video');
      }}
    >
      <Image
        // source={{ uri: item.thumbnail }}
        source={imagePaths[item.thumbnail]}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.cardDescription}>
          {item.description}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSelectedClass(item);
            setViewingType('video'); // Set to view video
          }}
        >
          <Text style={styles.buttonText}>Watch Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openPDF(item.pdfFilePath)}
        >
          <Text style={styles.buttonText}>Read Notes</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {selectedClass && viewingType === 'video' ? (
        <View style={styles.videoPlayerContainer}>
          <Video
            source={selectedClass.videoFilePath} // Path to the video
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            useNativeControls
            style={styles.videoPlayer}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setSelectedClass(null);
              setViewingType(null); // Reset to class list
            }}
          >
            <Text style={styles.backButtonText}>Back to Classes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={classesData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2} // Display 2 cards per row
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 130,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 8,
    marginVertical: 5,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  videoPlayerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  videoPlayer: {
    width: '100%',
    height: 250,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196f3',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

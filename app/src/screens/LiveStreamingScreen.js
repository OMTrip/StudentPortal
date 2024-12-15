import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const LiveStreamingScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://studio.youtube.com/channel/UCLgF8OblMOwh166EYMs-y5g/livestreaming' }} // Replace with your live stream URL
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true} // Show a loader until the WebView is loaded
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Background color for better video experience
  },
});

export default LiveStreamingScreen;

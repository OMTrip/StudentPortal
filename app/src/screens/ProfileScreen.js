import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert,Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from '../redux/slice';
import { useNavigation } from 'expo-router';
import AlertModal from '../SweetAlertComponent';

export default function ProfileUpdateScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const profile = useSelector((state) => state.profile);

  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [isVisible, setIsVisible] = useState(false);


 
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

      result.assets.map((item) => {
        return  dispatch(updateProfile({ picture: item.uri }));;
      })
     

    // if (!result.cancelled) {
    //   setImage(result.uri); // Update the profile image
    // }
  };

  const handleSave = () => {
    if(email && phone){
      dispatch(updateProfile({ email, phone }))
      navigation.navigate('Dashboard')
      Alert.alert(
        'Success!',
        'Your profile has been updated successfully.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    }else{
      Alert.alert('Profile not uploaded')
    }

    

  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>
      
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            profile.picture
              ? { uri: profile.picture }
              : require('../../../assets/images/edu.png')
          }
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      
    </View>
     <AlertModal
     visible={isVisible}
     onClose={() => setIsVisible(false)}
     title="Success"
     message="Your profile has been updated!"
   />
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

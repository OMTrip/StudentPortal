import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { getWeatherByCity } from '../utils/api';

const LocationModal = ({ visible, onClose }) => {
    const [city, setCity] = useState('');

    const searchCityWeather = async () => {
        const weather = await getWeatherByCity(city);
        alert(`Weather in ${weather.name}: ${weather.weather[0].description}`);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modal}>
                <Text style={styles.header}>Enter City Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="City"
                    value={city}
                    onChangeText={setCity}
                />
                <Button title="Search" onPress={searchCityWeather} />
                <Button title="Close" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000099' },
    header: { fontSize: 20, marginBottom: 10 },
    input: { width: '80%', borderWidth: 1, padding: 10, backgroundColor: '#fff' },
});

export default LocationModal;

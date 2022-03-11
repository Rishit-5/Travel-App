import React, {useState} from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import {StyleSheet, TextInput, View, Text, Image, Platform, Button, TouchableOpacity} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Firebase from './firebase'
const db = Firebase.database()



export default function Personalization(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    let [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
    };

    let submitForm = () => {
        db.ref('users/' + "userId").set({
            username: "name",
            email: "email",
            profile_picture : "imageUrl"
        });
    };

    if (selectedImage !== null) {
        return (
            <View style={styles.container}>
                <Text style = {{color: "white", textAlign: "center"}}>First Name</Text>
                <TextInput style = {styles.input} value = {firstName} placeholder="First Name" onChangeText={text => setFirstName(text)}/>
                <Text style = {{color: "white", textAlign: "center"}}>Last Name</Text>
                <TextInput style = {styles.input} value = {lastName} placeholder="Last Name" onChangeText={text => setLastName(text)}/>
                <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
                <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                    <Text style={styles.buttonText}>Pick a photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={submitForm} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style = {{color: "white", textAlign: "center"}}>First Name</Text>
            <TextInput style = {styles.input} value = {firstName} placeholder="First Name" onChangeText={text => setFirstName(text)}></TextInput>
            <Text style = {{color: "white", textAlign: "center"}}>Last Name</Text>
            <TextInput style = {styles.input} value = {lastName} placeholder="Last Name" onChangeText={text => setLastName(text)}></TextInput>
            <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={submitForm} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 20,
    },
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    input: {
        height: 40,
        width: 200,
        margin: 6,
        borderWidth: 1,
        padding: 10,
        color: "white",
        borderColor: "white",
    },
});

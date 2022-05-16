import React, {useState} from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import {StyleSheet, TextInput, View, Text, Image, Platform, Button, TouchableOpacity} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Firebase from './firebase'
import CustomMenu from "./CustomMenu";
const db = Firebase.database()
const auth = Firebase.auth()
const storage = Firebase.storage()

export default function Personalization(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    let [selectedImage, setSelectedImage] = React.useState(null);
    let pickerResult;


    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });

    };

    let submitForm = () => {

        db.ref('users/' + auth.currentUser.uid).set({
            fname: firstName,
            lname: lastName,
            email: auth.currentUser.email,
        });
        auth.currentUser.updateProfile({
            displayName: firstName + " " + lastName
        }).then(r => props.navigation.navigate('Tabs', {
            screen: 'Home'
        }))

    };
     let uploadImage = async (uri) => {
        const response = await fetch(uri)
        const blob = await response.blob();

        let ref = storage.ref().child(firstName+"_"+lastName+"PFP")
        storage.ref(firstName+"_"+lastName+"PFP").getDownloadURL()
            .then((url) => {
                db.ref('users/' + auth.currentUser.uid + '/pfp').set({
                    pfpurl: url
                });
            })
        return ref.put(blob)

    };

    if (selectedImage !== null) {
        return (
            <View style={styles.container}>
                <Text style = {{color: "white", textAlign: "center"}}>First Name</Text>
                <TextInput style = {styles.input} value = {firstName} placeholder="First Name" onChangeText={text => setFirstName(text)}/>
                <Text style = {{color: "white", textAlign: "center"}}>Last Name</Text>
                <TextInput style = {styles.input} value = {lastName} placeholder="Last Name" onChangeText={text => setLastName(text)}/>
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

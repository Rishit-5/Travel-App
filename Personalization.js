import React, {useState} from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import {StyleSheet, TextInput, View, Text, Image, Platform, Button, TouchableOpacity} from "react-native";
import * as ImagePicker from 'expo-image-picker';


export default function Personalization(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [image, setImage] = useState(null);
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

    }

    const styles = StyleSheet.create({
        input: {
            height: 40,
            width: 200,
            margin: 6,
            borderWidth: 1,
            padding: 10,
            color: "white",
            borderColor: "white",

        },
        view: {
            justifyContent: "center",
            display: "flex",
            alignItems: "center"
        },
        button: {
            backgroundColor: 'blue',
            padding: 20,
            borderRadius: 5,
        },
        container:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
        }

    });
    return (
        <View style = {styles.container}>
            <View>

                <Text style = {{color: "white", textAlign: "center"}}>First Name</Text>
                <TextInput style = {styles.input} value = {firstName} placeholder="First Name" onChangeText={text => setFirstName(text)}></TextInput>
                <Text style = {{color: "white", textAlign: "center"}}>Last Name</Text>
                <TextInput style = {styles.input} value = {lastName} placeholder="First Name" onChangeText={text => setLastName(text)}></TextInput>
                <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                    <Text style={styles.buttonText}>Pick a photo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

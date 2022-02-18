import React, {useState} from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import {StyleSheet, TextInput, View, Text} from "react-native";

export default function Personalization(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


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

            </View>
        </View>
    );
}

import * as React from 'react';
import {Button, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import Firebase from './firebase'
import {useState} from "react";
const auth = Firebase.auth()

export default function TripFinderScreen(props) {
    const [countryCode, setCountryCode] = useState('')
    const [IATA1, setIATA1] = useState('')
    const [IATA2, setIATA2] = useState('')
    const [IATA3, setIATA3] = useState('')


    function saveAccessToken (result){
        var a = JSON.parse(result)
        console.log(a)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + a.access_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        if (!IATA1 == "" && IATA2 == "" && IATA3 == "") {
            fetch("https://test.api.amadeus.com/v1/reference-data/recommended-locations?cityCodes=" + IATA1 + "&travelerCountryCode=" + countryCode, requestOptions)
                .then(response => response.text())
                .then(result => readData(result))
                .catch(error => console.log('error', error));
        }
        if (!IATA1 == "" && !IATA2 == "" && IATA3 == "") {
            fetch("https://test.api.amadeus.com/v1/reference-data/recommended-locations?cityCodes=" + IATA1 + "," + IATA2 + "&travelerCountryCode=" + countryCode, requestOptions)
                .then(response => response.text())
                .then(result => readData(result))
                .catch(error => console.log('error', error));
        }
        if (!IATA1 == "" && !IATA2 == "" && !IATA3 == "") {
            fetch("https://test.api.amadeus.com/v1/reference-data/recommended-locations?cityCodes=" + IATA1 + "," + IATA2 + "," + IATA3 + "&travelerCountryCode=" + countryCode, requestOptions)
                .then(response => response.text())
                .then(result => readData(result))
                .catch(error => console.log('error', error));
        }

    }
    function readData(result){
        var obj = JSON.parse(result)
        console.log(obj.data[0].name)

        props.navigation.navigate('Locations', {
            firstCity: obj.data[0].name
        })
    }
    function apiCall(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("client_id", "pHm4cGXq1VewxmyBLvtalDUQcyiXO1vg");
        urlencoded.append("client_secret", "B2WXvkVKQQyfWd5o");
        urlencoded.append("grant_type", "client_credentials");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://test.api.amadeus.com/v1/security/oauth2/token", requestOptions)
            .then(response => response.text())
            .then(result =>
                saveAccessToken(result)
            )
            .catch(error => console.log('error', error));

//       var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer h043qYlAa2ZBmrUMQsoPJRW5lWgP");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch("https://test.api.amadeus.com/v1/reference-data/recommended-locations?cityCodes=PAR&travelerCountryCode=FR", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));


    }
    const styles = StyleSheet.create({
        input: {
            height: 40,
            width: 200,
            margin: 6,
            borderWidth: 1,
            padding: 10,
            color: "white",
            borderColor: "white"


        },
        header: {
            fontSize: 40,
            color: "white",
        }

    });
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput style = {styles.input} value = {countryCode} placeholder="Country of Origin" onChangeText={text => setCountryCode(text)}></TextInput>
            <TextInput style = {styles.input} value = {IATA1} placeholder="First IATA Code" onChangeText={text => setIATA1(text)}></TextInput>
            <TextInput style = {styles.input} value = {IATA2} placeholder="Second IATA Code" onChangeText={text => setIATA2(text)}></TextInput>
            <TextInput style = {styles.input} value = {IATA3} placeholder="Third IATA Code" onChangeText={text => setIATA3(text)}></TextInput>

            <Button
                onPress={() => apiCall()} title="api call">
            </Button>
        </View>
    );
}

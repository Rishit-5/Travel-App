import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import Firebase from './firebase'
const auth = Firebase.auth()

export default function HomeScreen(props) {
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

        fetch("https://test.api.amadeus.com/v1/reference-data/recommended-locations?cityCodes=PAR&travelerCountryCode=FR", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
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
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{auth.currentUser?.email}</Text>
            <Button
                onPress={() => apiCall()} title="api call">
            </Button>
        </View>
    );
}

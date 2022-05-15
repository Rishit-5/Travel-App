import * as React from 'react';
import {Button, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import Firebase from './firebase'
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';

import {useState} from "react";
const auth = Firebase.auth()

export default function TripFinderScreen(props) {
    const [countryCode, setCountryCode] = useState('')
    const [IATA1, setIATA1] = useState('')
    const [IATA2, setIATA2] = useState('')
    const [IATA3, setIATA3] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState();
    var testArray = []
    // const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null);
    // const [items, setItems] = useState([
    //     {label: 'Apple', value: 'apple'},
    //     {label: 'Banana', value: 'banana'}
    // ]);

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
        var str = "";
        var strArray = []
        var geocodes = ""
        for (let i = 0; i < obj.data.length; i++) {
            str+=obj.data[i].name + ";"
            strArray.push(obj.data[i].name)
            var lat = obj.data[i].geoCode.latitude
            var long = obj.data[i].geoCode.longitude
            geocodes+=lat + "," + long + ";"
        }
        getPictures(str, obj.data.length, strArray, geocodes)
        // props.navigation.navigate('Locations', {
        //     cities: str
        // })
    }
    function getPictures(str, size, strArray, geocodes){
        console.log(size)
        var myHeaders = new Headers();

        myHeaders.append("Cookie", "__cf_bm=t7H_g.n3D95tY_a9wG9F46LzFLqRG8vOnj8ECPICAQ4-1652329644-0-AT4kuRHfP6Ui0R1qO/day9O5T2fMhQyTSEipiZP7h0s4y8dESIQkySi/kBh0Cqunc1jpNivboF1RyRLvU1n58uo=; anonymous_user_id=None; csrftoken=G3MRRnlnGpK2Zq21bW9cChH1doLO0YDDdrzmzdZty2CCw3SY4ImrwMlVRQJ4M16v");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        for (let i = 0; i < size; i++) {
            fetch("https://pixabay.com/api/\n?key=25493920-c26c94861653ea34a7c858bd4&q=" + strArray[i] + "+city", requestOptions)
                .then(response => response.text())
                .then(result => pictureLoad(result))
                .catch(error => console.log('error', error));

            function pictureLoad(result){
                var obj = JSON.parse(result)
                testArray.push(obj.hits[0].webformatURL)
                if (testArray.length == size){
                    var links = ""
                    for (let j = 0; j < size; j++) {
                        links+=testArray[j] + "~"
                    }
                    props.navigation.navigate('Locations', {
                        cities: str,
                        links: links,
                        geocodes: geocodes
                    })
                }
                // setImage(testArray)
            }
        }
    }
    function apiCall(){
        console.log(countryCode)
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
            <Picker
                selectedValue={countryCode}
                style = {{width: 200, height: 40, alignItems: "center"}}
                onValueChange={(itemValue, itemIndex) =>
                    setCountryCode(itemValue)
                }>
                <Picker.Item value='' label='Country of Origin' />
                <Picker.Item label="France" value="FR" />
                <Picker.Item label="United Kingdom" value="GB" />
                <Picker.Item label="Germany" value="DE" />
                <Picker.Item label="Italy" value="IT" />
                <Picker.Item label="Spain" value="ES" />
                <Picker.Item label="Netherlands" value="NL" />
                <Picker.Item label="United States of America" value="US" />
                <Picker.Item label="Argentina" value="AR" />
                <Picker.Item label="Mexico" value="MX" />
                <Picker.Item label="Saudi Arabia" value="SA" />

            </Picker>
-            <TextInput style = {styles.input} value = {IATA1} placeholder="First IATA Code" onChangeText={text => setIATA1(text)}></TextInput>
            <TextInput style = {styles.input} value = {IATA2} placeholder="Second IATA Code" onChangeText={text => setIATA2(text)}></TextInput>
            <TextInput style = {styles.input} value = {IATA3} placeholder="Third IATA Code" onChangeText={text => setIATA3(text)}></TextInput>

            {/*<DropDownPicker*/}
            {/*    open={open}*/}
            {/*    value={value}*/}
            {/*    items={items}*/}
            {/*    setOpen={setOpen}*/}
            {/*    setValue={setValue}*/}
            {/*    setItems={setItems}*/}
            {/*    showArrowIcon={false}*/}

            {/*    containerStyle = {{*/}
            {/*        backgroundColor: "#FFFFFF", alignItems: "center", width: 200, padding: 20*/}
            {/*    }}*/}
            {/*    dropDownContainerStyle={{*/}
            {/*        backgroundColor: "#FF0000",*/}
            {/*        alignItems: "center",*/}
            {/*        */}
            {/*    }}*/}
            {/*/>*/}
            <Button
                onPress={() => apiCall()} title="api call">
            </Button>
        </View>
    );
}

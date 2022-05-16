import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function SearchScreen(props) {

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    var places = ""
    var colors = ""

    function autocomplete(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic NWI5NmE3NDczZTFiNjU1ZDJiODhlNTlmNWRjNzk4MzU6ZTA0ZDhmYjA5ZWVmYWE1ZjY0YjM5ZTdkODZmN2EyNjg=");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.roadgoat.com/api/v2/destinations/auto_complete?q=" + searchQuery, requestOptions)
            .then(response => response.text())
            .then(result => readDate(result))
            .catch(error => console.log('error', error));
    }

    function readDate(result){
        var obj = JSON.parse(result)
        var latitude = obj.data[0].attributes.latitude
        var longitude = obj.data[0].attributes.longitude
        getPlaces(latitude, longitude)
    }
    function getPlaces(lat, lng){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://api.opentripmap.com/0.1/en/places/radius?radius=80000&lon=" + lng + " &lat="+ lat +" &format=json&kinds=foods&apikey=5ae2e3f221c38a28845f05b6dec08c1c7c0ef3b6e57fad1b900007d9", requestOptions)
            .then(response => response.text())
            .then(result => getPlaceDetails(result, 1))
            .catch(error => console.log('error', error));
        fetch("http://api.opentripmap.com/0.1/en/places/radius?radius=80000&lon=" + lng + " &lat="+ lat +" &format=json&kinds=historic&apikey=5ae2e3f221c38a28845f05b6dec08c1c7c0ef3b6e57fad1b900007d9", requestOptions)
            .then(response => response.text())
            .then(result => getPlaceDetails(result, 2))
            .catch(error => console.log('error', error));
        fetch("http://api.opentripmap.com/0.1/en/places/radius?radius=80000&lon=" + lng + " &lat="+ lat +" &format=json&kinds=natural&apikey=5ae2e3f221c38a28845f05b6dec08c1c7c0ef3b6e57fad1b900007d9", requestOptions)
            .then(response => response.text())
            .then(result => getPlaceDetails(result, 3))
            .catch(error => console.log('error', error));
    }

    function getPlaceDetails(result, time){
        var obj = JSON.parse(result)
        for (let i = 0; i < 10; i++) {

            places += obj[i].name + ";"

            if (time === 1){
                colors+= "#E97451" + ";"
            } else if (time ===2){
                colors+= "#AFE1AF" + ";"
            } else {
                colors+= "#89CFF0" + ";"
            }
        }
        if (places.split(';').length >= 25) {
            console.log(places)
            console.log(colors)
            props.navigation.navigate('Places', {
                places: places,
                colors: colors
            })
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', width: Dimensions.get('window').width }}>

            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{  width: Dimensions.get('window').width }}
                onSubmitEditing = {() => autocomplete()}
            />

        </View>
    );
}

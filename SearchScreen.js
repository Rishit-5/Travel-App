import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function SearchScreen(props) {

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
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

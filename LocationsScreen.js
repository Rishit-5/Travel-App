import * as React from 'react';
import { Button, View, Text, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { useRoute} from '@react-navigation/native';
import {useEffect, useState} from "react";
import {Card, Title, Paragraph } from 'react-native-paper';



export default function LocationsScreen(props) {
    const route = useRoute();
    let [cities, setCities] = useState([])
    let [links, setLinks] = useState([])
    let [geocodes, setGeocodes] = useState([])

    const [image, setImage] = useState([])
    var testArray = []
    cities = route.params.cities.split(";")
    cities = cities.slice(0,-1)

    links = route.params.links.split("~")
    links = links.slice(0,-1)

    geocodes = route.params.geocodes.split(";")
    geocodes = geocodes.slice(0,-1)

    console.log(cities.length)

    function saveAccessToken (result, index){
        var a = JSON.parse(result)
        console.log(a)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + a.access_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var latitude = geocodes[index].substring(0,geocodes[index].indexOf(","))
        var longitude = geocodes[index].substring(geocodes[index].indexOf(",")+1)


        fetch("https://test.api.amadeus.com/v1/location/analytics/category-rated-areas?latitude="+ latitude + "&longitude=" + longitude, requestOptions)
            .then(response => response.text())
            .then(result => readData(result, index))
            .catch(error => console.log('error', error));

    }

    function readData(result, index){
        var obj = JSON.parse(result)
        var sightseeing = obj.data[0].categoryScores.sight.overall;
        console.log(sightseeing)
        var strArray = []
        var geocodes = ""


        // props.navigation.navigate('Locations', {
        //     cities: str
        // })
    }

    function parseData(result, index){
        var obj = JSON.parse(result)
        var slug = obj.data[0].attributes.slug
        LocData(slug, index)
    }

    function LocData(slug, index){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic NWI5NmE3NDczZTFiNjU1ZDJiODhlNTlmNWRjNzk4MzU6ZTA0ZDhmYjA5ZWVmYWE1ZjY0YjM5ZTdkODZmN2EyNjg=");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.roadgoat.com/api/v2/destinations/" + slug, requestOptions)
            .then(response => response.text())
            .then(result => parseData2(result, index))
            .catch(error => console.log('error', error));
    }

    function parseData2(result, index){
        console.log(result)
        var obj = JSON.parse(result)

        var budget = obj.data.attributes.budget
        budget = JSON.stringify(budget)
        budget = budget.substring(budget.indexOf("value")+ 7, budget.indexOf("value")+ 8)

        var safety = obj.data.attributes.safety
        safety = JSON.stringify(safety)
        safety = safety.substring(safety.indexOf("value")+ 7, safety.indexOf("value")+ 8)

        var covid = obj.data.attributes.covid
        covid = JSON.stringify(covid)
        covid = covid.substring(covid.indexOf("value")+ 7, covid.indexOf("value")+ 8)

        props.navigation.navigate('LocationData', {
            city: cities[index],
            link: links[index],
            geocode: geocodes[index],
            budget: budget,
            safety: safety,
            covid: covid
        })
    }

    function navigation(index){

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic NWI5NmE3NDczZTFiNjU1ZDJiODhlNTlmNWRjNzk4MzU6ZTA0ZDhmYjA5ZWVmYWE1ZjY0YjM5ZTdkODZmN2EyNjg=");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.roadgoat.com/api/v2/destinations/auto_complete?q=" + cities[index], requestOptions)
            .then(response => response.text())
            .then(result => parseData(result, index))
            .catch(error => console.log('error', error));


    }



    // for (let i = 0; i < cities.length; i++) {
    //     fetch("https://pixabay.com/api/\n?key=25493920-c26c94861653ea34a7c858bd4&q=" + cities[i] +"+city", requestOptions)
    //         .then(response => response.text())
    //         .then(result => pictureLoad(result))
    //         .catch(error => console.log('error', error));
    //
    //     function pictureLoad(result){
    //         var obj = JSON.parse(result)
    //         testArray.push(obj.hits[0].webformatURL)
    //         setImage(testArray)
    //     }
    // }




    const listItems = cities.map((city, index) =>
        <Card  key={city.toString()}  style = {{width: Dimensions.get('window').width, margin: 20}} onPress = {() => navigation(index)}>

            <Card.Cover source={{ uri: links[index] }} />
            <Card.Content>
                <Title>{city.toString()}</Title>
            </Card.Content>
            <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
            </Card.Actions>
        </Card>    );

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', color: "#FFFFFF" }}>
            <ScrollView>
                {listItems}
            </ScrollView>
        </View>
    );
}

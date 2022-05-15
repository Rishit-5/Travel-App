import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, StyleSheet} from 'react-native';
import {useState} from "react";
import { useRoute} from '@react-navigation/native';
import { Surface, DarkTheme } from 'react-native-paper';


export default function LocationDataScreen(props) {
    const route = useRoute();
    let [city, setCity] = useState()
    let [link, setLink] = useState()
    let [geocode, setGeocode] = useState()
    let [budget, setBudget] = useState()
    let [safety, setSafety] = useState()
    let [covid, setCovid] = useState()
    let [latitude, setLatitude] = useState()
    let [longitude, setLongitude] = useState()



    city = route.params.city
    link = route.params.link
    geocode = route.params.geocode
    budget = route.params.budget
    safety = route.params.safety
    covid = route.params.covid

    latitude = geocode.substring(0, geocode.indexOf(","))
    longitude = geocode.substring(geocode.indexOf("," + 1))

    const styles = StyleSheet.create({
        surface: {
            padding: 8,
            height: 80,
            width: Dimensions.get('window').width - 20,
            marginTop: 10,
            justifyContent: 'center',
            elevation: 4,
            flex: 4
        },
    });

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style = {{flex: 2, width: Dimensions.get('window').width}} source = {{uri: link}}></Image>
            <ScrollView style = {{flex: 5}}>
                <Text style = {{fontSize: 40, color: "white", textAlign: "center"}}>{city}</Text>
                <Surface style = {styles.surface} theme = {DarkTheme}>
                    <Text style = {{color: "#FFFFFF"}}>Budget: {budget}</Text>
                </Surface>

                <Surface style = {styles.surface} theme = {DarkTheme}>
                    <Text style = {{color: "#FFFFFF"}}>Safety: {safety}</Text>
                </Surface>

                <Surface style = {styles.surface} theme = {DarkTheme}>
                    <Text style = {{color: "#FFFFFF"}}>Covid: {covid}</Text>
                </Surface>
            </ScrollView>
        </View>
    );
}

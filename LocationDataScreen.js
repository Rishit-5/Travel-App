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

    city = route.params.city
    link = route.params.link
    geocode = route.params.geocode
    budget = route.params.budget

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
                <Surface style = {styles.surface} theme = {DarkTheme}>
                    <Text style = {{color: "#FFFFFF"}}>{budget}</Text>
                </Surface>

                <Surface style = {styles.surface} theme = {DarkTheme}>
                    <Text style = {{color: "#FFFFFF"}}>leudjnk,</Text>
                </Surface>

                <Surface style = {styles.surface} theme = {DarkTheme}>
                    <Text style = {{color: "#FFFFFF"}}>leudjnk,</Text>
                </Surface>
            </ScrollView>
        </View>
    );
}

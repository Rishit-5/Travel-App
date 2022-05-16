import * as React from 'react';
import {Button, View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import {Card, Searchbar, Title} from 'react-native-paper';
import {useRoute} from "@react-navigation/native";
import {useState} from "react";

export default function PlacesScreen(props) {

    const route = useRoute();
    let [places, setPlaces] = useState([])
    let [colors, setColors] = useState([])

    places = route.params.places.split(";")
    places = places.slice(0,-1)

    colors = route.params.colors.split(";")
    colors = colors.slice(0,-1)



    const listItems = places.map((place, index) =>
        <Card  key={place.toString() + Math.random()}  style = {{width: Dimensions.get('window').width, margin: 20, backgroundColor: colors[index]}}>
            <Card.Content>
                <Title>{place.toString()}</Title>
            </Card.Content>

        </Card>    );

    return (
        <View style={{ flex: 1, alignItems: 'center', width: Dimensions.get('window').width }}>
            <ScrollView>
                {listItems}
            </ScrollView>
        </View>
    );
}

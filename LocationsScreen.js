import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { useRoute} from '@react-navigation/native';
import {useState} from "react";

export default function LocationsScreen(props) {
    const route = useRoute();

    let [cities, setCities] = useState([])
    cities = route.params.cities.split(";")
    cities = cities.slice(0,-1)
    console.log(cities)
    // for (let i = 0; i < 5; i++) {
    //     console.log("whjnwhjns")
    // }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: "#FFFFFF"}}>{route.params.cities}</Text>
        </View>
    );
}

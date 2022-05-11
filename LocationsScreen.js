import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { useRoute} from '@react-navigation/native';

export default function LocationsScreen(props) {
    const route = useRoute();
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: "#FFFFFF"}}>{route.params.firstCity}</Text>
        </View>
    );
}

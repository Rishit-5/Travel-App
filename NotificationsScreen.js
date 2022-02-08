import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';

export default function NotificationsScreen(props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <TouchableOpacity
                onPress={() => props.navigation.navigate('Home')}>
                <Text>go to home</Text>
            </TouchableOpacity>

        </View>
    );
}

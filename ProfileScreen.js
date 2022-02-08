import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';

export default function ProfileScreen(props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <TouchableOpacity
                onPress={() => props.navigation.navigate('Notifications')}>
                <Text>go to notifications</Text>
            </TouchableOpacity>

        </View>
    );
}

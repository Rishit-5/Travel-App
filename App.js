import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomMenu from './CustomMenu';
import HomeScreen from './HomeScreen';
import TripFinderScreen from './TripFinderScreen';
import ProfileScreen from './ProfileScreen';
import LoginScreen from './LoginScreen';
import Personalization from "./Personalization";

import LocationsScreen from "./LocationsScreen";
import LocationDataScreen from "./LocationDataScreen";



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Tabs() {
    return (
        <Drawer.Navigator
            screenOptions={{headerTintColor: '#FFFFFF'}}
            initialRouteName="Home"
            drawerContent={(props) => <CustomMenu {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Trip Finder" component={TripFinderScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Locations" component={LocationsScreen} />
            <Drawer.Screen name="LocationData" component={LocationDataScreen} />
        </Drawer.Navigator>
    );
}
export default function App() {
    return (
        <NavigationContainer theme = {DarkTheme}>
            <Stack.Navigator

                initialRouteName="Tabs"
                drawerContent={(props) => <CustomMenu {...props} />}>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Personalization" component={Personalization} options={{headerShown: false}}/>
                <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

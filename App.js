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
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import LocationsScreen from "./LocationsScreen";



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
        </Drawer.Navigator>
    );
}
export default function App() {
    return (
        <NavigationContainer theme = {DarkTheme}>
            <Stack.Navigator

                initialRouteName="Login"
                drawerContent={(props) => <CustomMenu {...props} />}>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Personalization" component={Personalization} options={{headerShown: false}}/>
                <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

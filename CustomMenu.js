import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import img from "./assets/favicon.png"
import { Avatar } from 'react-native-paper';
import { Icon, Divider } from 'react-native-elements';

export default function CustomMenu(props){
    return(
        <View style={{flex: 1, flexDirection: "column", padding: "5%", backgroundColor: "white"}}>
            <View style = {{flex: 1, justifyContent: "center", backgroundColor: "white"}}>
                <View style = {{flexDirection: "row", alignItems: "center"}}>
                    <Avatar.Image style = {{marginRight: "5%"}} source = {img}/>
                    <View>
                        <Text style = {{fontSize: 28, fontWeight: "bold"}}>Rishit Patil</Text>
                        <Text style = {{ fontSize: 14}}>rishistar05@gmail.com</Text>
                    </View>
                </View>
            </View>

            <Divider color = "#7cabf7" />

            <TouchableOpacity
                style = {{flex: 1, flexDirection: "row", alignItems: "center"}}
                onPress = {() => {props.navigation.navigate("Home")}}>
                <Icon name='home'
                      type='material'
                      color='#000'
                      size = "35"
                />
                <Text style = {{marginLeft: "5%", fontWeight: "bold", fontSize: 20}}>Home
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style = {{flex: 1, flexDirection: "row", alignItems: "center"}}
                onPress = {() => {props.navigation.navigate("Notifications")}}>
                <Icon name='notifications'
                      type='material'
                      color='#000'
                      size = "35"
                />
                <Text style = {{marginLeft: "5%", fontWeight: "bold", fontSize: 20}}>Notifications
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
            style = {{flex: 1, flexDirection: "row", alignItems: "center"}}
            onPress = {() => {props.navigation.navigate("Profile")}}>
            <Icon name='person'
                  type='material'
                  color='#000'
                  size = "35"
            />
            <Text style = {{marginLeft: "5%", fontWeight: "bold", fontSize: 20}}>Profile
            </Text>

        </TouchableOpacity>
            <View style = {{flex: 4}}/>

            <Divider color = "#7cabf7"/>

            <TouchableOpacity
                style = {{flex: 1, flexDirection: "row", alignItems: "center"}}
                onPress = {() => {props.navigation.navigate("Login")}}>
                <Icon name='logout'
                      type='material'
                      color='#000'
                      size = "35"
                />
                <Text style = {{marginLeft: "5%", fontWeight: "bold", fontSize: 20}}>Sign Out
                </Text>

            </TouchableOpacity>
        </View>

    )
}

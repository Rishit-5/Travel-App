import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import img from "./assets/favicon.png"
import { Avatar } from 'react-native-paper';
import { Icon, Divider } from 'react-native-elements';
import Firebase from './firebase'
const auth = Firebase.auth()

export default function CustomMenu(props){
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() =>{
                props.navigation.replace("Login")
            })
    }
    return(
        <View style={{flex: 1, flexDirection: "column", padding: "5%"}}>
            <View style = {{flex: 1, justifyContent: "center"}}>
                <View style = {{flexDirection: "row", alignItems: "center"}}>
                    <Avatar.Image style = {{marginRight: "5%"}} source = {img}/>
                    <View>
                        <Text style = {{fontSize: 28, fontWeight: "bold", color: "white"}}>Rishit Patil</Text>
                        <Text style = {{ fontSize: 14, color: "white"}}>{auth.currentUser?.email}</Text>
                    </View>
                </View>
            </View>

            <Divider color = "#7cabf7" />

            <TouchableOpacity
                style = {{flex: 1, flexDirection: "row", alignItems: "center"}}
                onPress = {() => {props.navigation.navigate("Home")}}>
                <Icon name='home'
                      type='material'
                      color='#FFF'
                      size = "35"
                />
                <Text style = {{marginLeft: "5%", fontWeight: "bold", fontSize: 20, color: "white"}}>Home
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style = {{flex: 1, flexDirection: "row", alignItems: "center"}}
                onPress = {() => {props.navigation.navigate("Notifications")}}>
                <Icon name='notifications'
                      type='material'
                      color='#FFF'
                      size = "35"
                />
                <Text style = {{marginLeft: "5%", fontWeight: "bold", fontSize: 20 , color: "white"}}>Notifications
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
            style = {{flex: 1, flexDirection: "row", alignItems: "center"}}
            onPress = {() => {props.navigation.navigate("Profile")}}>
            <Icon name='person'
                  type='material'
                  color='#FFF'
                  size = "35"
            />
            <Text style = {{marginLeft: "5%", fontWeight: "bold", fontSize: 20, color: "white"}}>Profile
            </Text>

        </TouchableOpacity>
            <View style = {{flex: 4}}/>

            <Divider color = "#7cabf7"/>

            <TouchableOpacity
                style = {{flex: 1, flexDirection: "row", alignItems: "center"}}
                onPress = {() => {handleSignOut()}}>
                <Icon name='logout'
                      type='material'
                      color='#FFF'
                      size = "35"
                />
                <Text style = {{marginLeft: "5%", fontWeight: "bold", fontSize: 20, color: "white"}}>Sign Out
                </Text>

            </TouchableOpacity>
        </View>

    )
}

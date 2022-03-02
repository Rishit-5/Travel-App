import * as React from 'react';
import { Button, View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet } from 'react-native';
import {useState} from "react";
import Firebase from './firebase'
const image = {uri: "https://i.pinimg.com/736x/57/3b/9b/573b9b73c22586c8f4b651e38c244635.jpg"}
const auth = Firebase.auth()

  export default function LoginScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = () => {
      auth.createUserWithEmailAndPassword(email, password)
          .then(userCredentials =>{
            const user = userCredentials.user;
            props.navigation.navigate('Tabs', { screen: 'Home' })
          })
          .catch(error => alert(error.message))
    }
    const handleSignIn = () => {
      auth.signInWithEmailAndPassword(email,password)
          .then(userCredentials =>{
            const user = userCredentials.user;
            props.navigation.navigate('Personalization')

          })
          .catch(error => alert(error.message))
    }
    const styles = StyleSheet.create({
      input: {
        height: 40,
        width: 200,
        margin: 6,
        borderWidth: 1,
        padding: 10,
        color: "white",
        borderColor: "white"


      },
      header: {
        fontSize: 40,
        color: "white",
      }

    });
    function createAccount() {
      props.navigation.navigate('Tabs', {screen: 'Home'})
    }
    return (
        <ImageBackground source = {image} resizeMode="cover" style = {{flex: 1}} blurRadius={5}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(0,0,0,.7)"}}>
            <Text style = {styles.header}>TripEclips</Text>
            <TextInput style = {styles.input} value = {email} placeholder="Email" onChangeText={text => setEmail(text)}></TextInput>
            <TextInput style = {styles.input} value = {password} placeholder="Password" onChangeText={text => setPassword(text)} secureTextEntry></TextInput>

            <TouchableOpacity onPress={handleSignIn} style = {{backgroundColor: "#1E90FF",justifyContent: "center", alignItems: "center", width: 100, height: 40, borderRadius: 5, margin: 6}}>
              <Text style = {{color: "white"}}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp} style = {{backgroundColor: "#1E90FF", justifyContent: "center", alignItems: "center", width: 100, height: 40, borderRadius: 5, margin: 6}}>
              <Text style = {{color: "white"}}>Register</Text>
            </TouchableOpacity>

          </View>
        </ImageBackground>
    );

  }

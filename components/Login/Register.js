
import axios from 'axios';
import * as React from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";

// import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from "@react-navigation/stack";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

const baseUrl = 'http:/snapi.epitech.eu:8000/';
// Passing configuration object to axios
axios({
    method: 'post',
    url: `${baseUrl}/inscription`,
}).then((response) => {
    console.log(response.data);
});




export default RegisterScreen();
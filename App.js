import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import * as React from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableHighlight, Button, TextInput, TouchableOpacity } from "react-native";
const baseUrl = 'http:/snapi.epitech.eu:8000/';
import Login from "./components/Login/Login";
// import Register from "./components/Login/Register";
import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';

import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, CameraType, FlashMode } from 'expo-camera';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('token')
    if(value !== null) {
      // value previously stored
      console.log(value);
    }
  } catch(e) {
    // error reading value
  }
}

let test = null;



function ConnexionScreen({ navigation }) {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit = data => axios({
    method: 'post',
    url: `${baseUrl}/connection`,
    data: data,
}).then(async function(response){
    console.log(response.data);
    console.log(data);
    test = "token";
    navigation.navigate('Camera');

    try {
      await AsyncStorage.setItem('token', response.data.data.token);
      const value = await AsyncStorage.getItem('token');
      console.log(value);
    } catch (error) {
      console.log(error);
    }
}).catch((err) => {
  console.log(err);
});
  // Passing configuration object to axios

  return (
    <View style={styles.container_form}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.firstName && <Text>This is required.</Text>}
      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          require: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={true}
            value={value}
            
          />
        )}
        name="password"
      />

      <View style={styles.buttonForm}>
        <TouchableHighlight style={styles.btn_form} underlayColor="white" onPress={handleSubmit(onSubmit)}>
          <View>
            <Text style={styles.textbtn}> Login </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}




function RegisterScreen({ navigation }) {

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit = data => axios({
    method: 'post',
    url: `${baseUrl}/inscription`,
    data: data,
}).then((response) => {
    console.log(response.data);
    console.log(data);
}).catch((err) => {
  console.log(err);
});
  // const onChange = arg => {
  //   return {
  //     value: arg.nativeEvent.text,
  //   };

  return (
    <View style={styles.container_form}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="email"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            secureTextEntry={true}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true }}
      />

      <View style={styles.buttonForm}>
        <TouchableHighlight style={styles.btn_form} underlayColor="white" onPress={handleSubmit(onSubmit)}>
          <View>
            <Text style={styles.textbtn}> Register </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

function CameraScreen({ navigation }) {

let camera = new Camera();

function logout(test){
  test = null;
  navigation.navigate("Home");
};

const [hasPermission, setHasPermission] = useState(null);
const [type, setType] = useState(CameraType.back);
const [flash, setFlash] = useState(FlashMode.on);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function takePicture(){
    console.log("ok");
  }

  return (
    <View style={styles.camera_container}>
      <Camera style={styles.camera} type={type} ratio={'16:9'} flashMode={flash}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.flip_cam}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text style={styles.btn_textreg}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.take_pic_btn}
            onPress={() => {
              takePicture();
              setFlash(flash === FlashMode.on ? FlashMode.off : FlashMode.on);
            }}>
            <Text style={styles.btn_textreg}></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_logout} underlayColor="white" onPress={() => {logout(test)}}>
            <View>
              <Text style={styles.btn_textreg}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

function HomeScreen({ navigation }) {
  if (test === null) {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./assets/images/logo.png')} />
        <StatusBar style="auto" />
        <View style={styles.container_buttons}>
          <TouchableHighlight style={styles.btn_connection} underlayColor="white" onPress={() => navigation.navigate('Connexion')} >
            <View>
              <Text style={styles.btn_text_connection}>Login</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn_registration} underlayColor="white" onPress={() => navigation.navigate('Register')}>
            <View>
              <Text style={styles.btn_textreg}>Register</Text>
              <Text></Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  } else if (test != null) {
    return (
      <View>
        {navigation.navigate('Camera')}
      </View>
    )
  }
}


export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Connexion" component={ConnexionScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFC00',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#27AAEC',
  },
  camera_container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  take_pic_btn: {
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    width: 100,
    height: 100,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'white',
  },
  flip_cam: {
    flex: 0.5,
    height: 20,
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    textAlign: 'center',
  },
  button_logout: {
    flex: 0.5,
    height: 20,
    // backgroundColor: 'blue',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'center',
  },
  text_camera: {
    fontSize: 18,
    color: 'white',
  },
  container_buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: '-45%',
  },
  logo: {
    width: 150,
    height: 150,
  },
  btn_connection: {
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 15,
    paddingLeft: 35,
    paddingRight: 35,
    marginRight: 15,
    fontSize: 20,
  },
  btn_registration: {
    borderRadius: 30,
    backgroundColor: '#00C1FF',
    padding: 15,
    paddingLeft: 35,
    paddingRight: 35,
  },
  textbtn: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn_form: {
    borderRadius: 30,
    backgroundColor: '#00C1FF',
    padding: 15,
    paddingLeft: 35,
    paddingRight: 35,
    marginRight: 15,
    fontSize: 20,
  },
  buttonForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: '-30%',
  },
  btn_text_connection: {
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  btn_textreg: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  // Form
  label: {
    color: 'grey',
    letterSpacing: 0.5,
    alignSelf: 'baseline',
    paddingLeft: '15%',
    margin: 10,
    textAlign: 'left',
    marginLeft: 0,
  },
  container_form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    height: 40,
    width: '70%',
    padding: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: '400',
    letterSpacing: 0.5,
    marginBottom: '10%',
  },
});
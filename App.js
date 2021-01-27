import React, { Component, useState } from 'react';
import { Text, TextInput,  View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterPage from './RegisterPage.js';
import HomePage from './HomePage.js';
import firebase from 'firebase';
import FirstUser from './FirstUser'
import SecondUser from './SecondUser'
import CurrInput from './CurrInput'

export  const LoginPage = ({navigation}) =>{
  const [info, setInfo] = useState({
  email: '' ,
  isValidated : false,
  password:'',
  isValidatedPassword : false,
  username:'user',
  error: ''
 
  })
  var config = {
    apiKey: 'AIzaSyAXQE034zMC_o2CvteJL2FpkE5QOc0KTgY',
    authDomain: 'myproject-e337f.firebaseapp.com',
    databaseURL: 'https://project-761706236253.firebaseio.com',
    projectId: 'myproject-e337f'
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }

const getEmail = (email)=>{
  var regularPhrase = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (regularPhrase.test(email)===true){
    setInfo({...info, email:email, isValidated:true})
  }
  else{
    setInfo({...info, email:email, isValidated:false})
  }
}

const getPassword = (password)=>{
  if (password.trim().length >=8){
    setInfo({...info, password:password, isValidatedPassword:true})
  }
  else{
    setInfo({...info, password:password, isValidatedPassword: false})
  }
}

const onButtonPress = () => {
  const { email, password } = info
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {navigation.navigate("HomePage", {username: info.username})})
    .catch(onLoginFail)
}
const onLoginFail= () => {
setInfo({...info, error:'authentification failed'})
}

    return (
      <View style={styles.container}>
        <View style={styles.textfields}>
          
          <TextInput style = {styles.input}
           placeholder = "email"
            returnKeyType = "next" 
            keyboardType = "email-adderss" 
            autoCapitalize = "none" 
            autoCorrect ={false}
            onChangeText = {(email)=>{getEmail(email)}}
          />
          {info.isValidated ? null : <Text style={styles.errorText}>
          Email Error
          </Text>}
         
          <TextInput style = {styles.input}
            placeholder = "password" 
            //returnKeyType = "go" 
            secureTextEntry 
            onChangeText={(password)=>{getPassword(password)}}
        />
          
          {info.isValidatedPassword ? null :<Text style={styles.errorText}>
          Password Error
          </Text>}
          {info.error && <Text style={styles.errorText}>
          {info.error}
          </Text>}
          <TouchableOpacity style={styles.buttoncontainer}onPress = {() => {onButtonPress()}}>
            <Text style={styles.buttontext}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttoncontainer}onPress={() => navigation.navigate('RegisterPage')}>
          <Text style={styles.buttontext}>Register Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


export default class App extends Component {
  render() {
    return <NavigationContainer>
    <AppStackNavigator.Navigator initialRouteName="HomePage">
      <AppStackNavigator.Screen name="HomePage" component={HomePage} />
      <AppStackNavigator.Screen name="LoginPage" component={LoginPage} />
      <AppStackNavigator.Screen name="RegisterPage" component={RegisterPage} />
      <AppStackNavigator.Screen name="FirstUser" component={FirstUser} />
      <AppStackNavigator.Screen name="SecondUser" component={SecondUser} />
      <AppStackNavigator.Screen name="CurrInput" component={CurrInput} />
    </AppStackNavigator.Navigator>
  </NavigationContainer>
}
}
const AppStackNavigator = createStackNavigator();

const styles = {
  container: {
    padding: 20,
    backgroundColor: '#ecf0f1',
    justifyContent : 'center',
    display : 'flex',
    flexDirection: 'column',
    alignItems : 'center',
  },
  input: {
    
    borderRadius: 50,
    height: 50,
    backgroundColor: 'white',
    borderColor: '#1abc9c',
    borderWidth: 1,
    color: '#34495e',
    width: 300,
    marginTop: 10,
    alignItems: 'center',
    padding: 16
  },
  buttoncontainer: {
    height: 50,
    borderRadius: 50,
    backgroundColor: '#1abc9c',
    paddingVertical: 10,
    justifyContent: 'center',
    margin: 10
  },
  buttontext: {
    textAlign: 'center',
    color: '#ecf0f1',
    fontSize: 20,
  },
  errorText: {
    color : 'red',
    fontSize : 14,
  }
};

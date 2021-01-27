import React, { Component,useState } from 'react';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import firebase from 'firebase';


const  RegisterPage = ({navigation}) =>{

    const [info, setInfo] = useState({
        email: '' ,
        isValidated : false,
        password:'',
        isValidatedPassword : false,
        phoneNumber: '',
        isValidatedPhoneNumber : false,
        username: '',
       
        })
        var config = {
          apiKey: 'AIzaSyAXQE034zMC_o2CvteJL2FpkE5QOc0KTgY',
          authDomain: 'myproject-e337f.firebaseapp.com',
          databaseURL: 'https://project-761706236253.firebaseio.com',
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

      const getPhoneNumber = (phoneNumber)=>{
          if (phoneNumber.trim().length ===10){
              setInfo({...info, phoneNumber:phoneNumber ,isValidatedPhoneNumber:true})
          }
          else{
            setInfo({...info, phoneNumber:phoneNumber ,isValidatedPhoneNumber:false})
          }

      }
      const onPressed = () => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(info.email, info.password)
          .then(() => {navigation.navigate("HomePage", { username : info.username})})
          .catch((error)=> {
            console.log(error);
          })
      }
  
    return(
      <View style = {styles.container}>
        <View style = {styles.registerform}>
        <TextInput style = {styles.input}
            placeholder = "Enter your name" 
            returnKeyType = "next"
            onChangeText ={(username)=>setInfo({username:username})}
        />
        
        <TextInput style = {styles.input}
            placeholder = "Enter your phone number" 
            returnKeyType = "next"
            onChangeText ={(phoneNumber)=>getPhoneNumber(phoneNumber)}

        />
        
        {info.isValidatedPhoneNumber ? null : <Text style={styles.errorText}>
          Phone number Error
          </Text>}
         <TextInput style={styles.input}
            placeholder = "Enter your email"
            returnKeyType = "next" 
            keyboardType = "email-adderss"
             autoCapitalize = "none" 
             autoCorrect ={false}
             onChangeText = {(email)=>{getEmail(email)}}
           
         />
         {info.isValidated ? null : <Text style={styles.errorText}>
          Email Error
          </Text>}
          <TextInput style={styles.input}
            placeholder = "Enter password"
             returnKeyType = "go"
            secureTextEntry
            onChangeText={(password)=>{getPassword(password)}}
            
          />
          {info.isValidatedPassword ? null :<Text style={styles.errorText}>
          Password Error
          </Text>}
          <TouchableOpacity style={styles.buttoncontainer}onPress={() => {onPressed()}}>
              <Text style={styles.buttontext}>Sign up</Text>
          </TouchableOpacity>
            
            
          <TouchableOpacity style={styles.buttoncontainer}onPress = {() => navigation.navigate('LoginPage')}>
            <Text style={styles.buttontext}>Sign in</Text>
          </TouchableOpacity>
        </View>
        </View>
    );
  
  
}
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
      paddingLeft: 20,
      borderRadius: 50,
      height: 50,
      width: 300,
      backgroundColor: 'white',
      borderColor: '#1abc9c',
      borderWidth: 1,
      marginTop: 10,
      color: '#34495e',
    },
    buttontext: {
        textAlign: 'center',
        color: '#ecf0f1',
        fontSize: 20,
      },

    buttoncontainer: {
      height: 50,
      borderRadius: 50,
      backgroundColor: '#1abc9c',
      paddingVertical: 10,
      justifyContent: 'center',
      margin:10
    },
    errorText: {
        color : 'red',
        fontSize : 14,
      }
  }
  export default RegisterPage;
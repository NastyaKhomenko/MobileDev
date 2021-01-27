import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ImageBackground , } from 'react-native';
import firebase from 'firebase'
import 'firebase/firestore';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextInput } from 'react-native-gesture-handler';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';

const FirstUser = () => {

    var config = {
        apiKey: 'AIzaSyAXQE034zMC_o2CvteJL2FpkE5QOc0KTgY',
        authDomain: 'myproject-e337f.firebaseapp.com',
        databaseURL: 'https://project-761706236253.firebaseio.com',
        projectId: 'myproject-e337f'
      } 
    
      if (!firebase.apps.length) {
        var app = firebase.initializeApp(config)
      }
      var db = firebase.firestore(app);
    
      var docRef = db.collection("HealthCare").doc("cdWEDof0iPlkV8GcPutG");

  const [temperatureLevel, setTemperatureLevel] = useState('');
  const [palpitation, setPalpitation] = useState(0);
  const [bloodPressure, setBloodPressure] = useState('');
  const [update, setUpdate] = useState('');
  const [value, setValue] = useState('');  

  const handleChange = (event) => {
    setUpdate(event.target.value);
    if (update === 'palpitation') {
      getText()
    }
    else if (update === 'temperature') {
      getText()
    }
    else if (update === 'bloodPressure') {
      getText()
    }
  };

  

      const getTemperatureLevel = () => {
        docRef.get().then(function (doc) {
          if (doc.exists) {
            setTemperatureLevel(doc.get('temperature'));
          } else {
            console.log("No such document!");
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
      }
    
      const getPaplitation = () => {
        docRef.get().then(function (doc) {
          if (doc.exists) {
            setPalpitation(doc.get('palpitation'));
          } else {
            console.log("No such document!");
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
      }
    
      const getBloodPressure = () => {
        docRef.get().then(function (doc) {
          if (doc.exists) {
            setBloodPressure(doc.get('bloodPressure'));
          } else {
            console.log("No such document!");
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
      }

      const getText = (text) => {
        setValue(text);
      } 
      
      const UpdateFunc = () => {
        if (update=== 'Palpitation'){
        docRef.update({
          palpitation: value
        })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
    
        setPalpitation(value)
      }
      else if (update==='Temperature'){
        docRef.update({
          temperature: value
        })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
    
        setTemperatureLevel(value)
      }
      else if (update==='Blood pressure'){
        docRef.update({
          bloodPressure: value
        })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
    
        setBloodPressure(value)
      }}

    return <>{getBloodPressure(), getPaplitation(), getTemperatureLevel()} 
    {bloodPressure == '' ? <LinearProgress/> : <><Text style = {styles.nameText}>Amelia Waters</Text>
    <View
  style={{
    borderBottomColor: '#1abc9c',
    borderBottomWidth: 3,
    
  }}
/>
<ImageBackground  style = {styles.background} source={require('./assets/bg.jpg')}  >

    <View style = {styles.container}>
    <Text style = {styles.header}>INDICATORS FOR THE LAST HOUR:</Text>
    <Text style = {styles.text}>Temperature : {temperatureLevel}</Text>
    <Text style = {styles.text}>Palpitation : {palpitation}</Text>
    <Text style = {styles.text}>Blood pressure : {bloodPressure}</Text></View></ImageBackground>
 
            <FormControl>
              <InputLabel id="demo-simple-select-label">Update</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={update}
                onChange={(event) => handleChange(event)}
              >
                <MenuItem onClick={() => setUpdate('Temperature')}>Temperature</MenuItem>
                <MenuItem onClick={() => setUpdate('Palpitation')}>Palpitation</MenuItem>
                <MenuItem onClick={() => setUpdate('Blood pressure')}>Blood pressure</MenuItem>
              </Select>
            </FormControl>
            <TextInput onChangeText={(text) => { getText(text) }} style={{ width: 1535, height: 32, borderColor: 'black', borderStyle: 'solid' }} />
            <Button onClick={UpdateFunc} color='#1A1E3D'>update</Button>
          
    </>}
    </>
}

export default FirstUser

const styles = {
    text: {
     
      color: 'black',
      fontSize: 30,
      textShadowColor: 'black' ,
      padding:7
    },
    container: {
      
    textAlign: 'left',
    marginTop: 150,
    marginLeft:610,
    
    },
    nameText: {
      color: 'black',
      fontSize: 45,
      textAlign: 'center',
      
    },
  background: {
   height: 480,
   width: 1535,
   
  },
  header: {
    color: '#454545',
      fontSize: 25,
      textShadowColor: 'black' ,
    textDecoration: 'underline',
    textAlign: 'left',
    
  },
}
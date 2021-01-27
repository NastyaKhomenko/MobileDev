import React, { useState } from 'react';
import { Text, View, TouchableOpacity,  } from 'react-native';
import firebase from 'firebase'
import 'firebase/firestore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Image from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const HomePage =({navigation,route})=> {
  // const {username}=route.params;
  const onPressed = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('LoginPage')
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  
    return(
      <View style = {styles.container}>
      <View>
        
            <List>
            <View style = {styles.header}>Your patients</View>
              <TouchableOpacity onPress={() => navigation.navigate('FirstUser')}>
              
              <ListItem>
                  <ListItemAvatar>
                    <Avatar source={require('./assets/patient1.jpg')}/>
                  </ListItemAvatar>
                  <ListItemText style = {styles.listItemText}
                    primary="Amelia Waters"
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SecondUser')}>
                <ListItem>
                  <ListItemAvatar>
                  <Avatar src="./assets/patient2.jpg"/>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Jackson Black"
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                </TouchableOpacity>
            </List>
        </View>
        <TouchableOpacity style = {styles.button}onPress={() => navigation.navigate('CurrInput')}><Text style = {styles.buttontext}>Input</Text></TouchableOpacity>
      <TouchableOpacity style = {styles.button}onPress={() => {onPressed()}}>
            <Text style = {styles.buttontext}>Log out</Text>  
          </TouchableOpacity>
          
      </View>
    );
  }


const styles = {
  container : {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 35,
  },
  button: {
      width: 100,
      height: 50,
    borderRadius: 30,
    backgroundColor: '#1abc9c',
    
    justifyContent: 'center',
    marginTop: 20
  },
  buttontext: {
    textAlign: 'center',
    color: '#ecf0f1',
    fontSize: 20,
  },
  header: {
    color: '#1abc9c',
    fontSize: 45,
    textAlign: 'center',
    padding: 30
    
  },
  
}
export default HomePage
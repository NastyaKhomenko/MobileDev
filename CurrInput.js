import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Button from '@material-ui/core/Button';
import CurrencyInput from 'react-native-currency-input';



const CurrInput = ({ navigation }) => {
    const [value, setValue] = useState(0);
    

    return <View style={styles.container}>
        <View style={styles.some}>
            <Text style={styles.title}>Currency input</Text>
            <CurrencyInput style={styles.input}
                value={value}
                onChangeValue={setValue}
                unit="$"
                delimiter=","
                separator="."
                precision={2}
                onChangeText={(formattedValue) => {
                    console.log(formattedValue); // $2,310.46
                }}
            />
        </View>
    </View>
}


const styles = StyleSheet.create({
    some: {
        backgroundColor: '#94fff1',
        height: 200,
        width: 500,
        padding: 20,
        borderColor: '#5c3001',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 25
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1'
    },
    input: {
        height: 70,
        backgroundColor: 'white',
        borderColor: '#5c3001',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 25,
        padding: 10
    },
    title: {
        color: '#5c3001',
        fontSize: 32,
        marginBottom: 28,
        textAlign: 'center'
    },
})

export default CurrInput
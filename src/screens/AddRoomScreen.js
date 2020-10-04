import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';



export default function AddRoomScreen({navigation}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleButtonPress() {
        if(name.length > 0){
            firestore()
                .collection('THREADS')
                .add({nome: name, descricao: description})
                .then(() => { navigation.navigate('Home')});
        }
    }
    
    return (
        <View style={styles.container}>
             <IconButton
                icon='close-circle'
                size={28}
                color = '#FF0000'
                onPress={() => navigation.goBack()}
                style={styles.closeButton}
            />
            <Text>Crie uma nova sala</Text>
            <FormInput
                labelName='Nome da sala'
                value={name}
                autoCapitalize='none'
                onChangeText={name => setName(name)}
            />
            <FormInput
                labelName='Nome da sala'
                value={description}
                autoCapitalize='none'
                onChangeText={description => setDescription(description)}
            />
           <FormButton 
                title='Criar sala'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={handleButtonPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0
    }
})
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';


function handleButtonPress() {
    if(roomName.length > 0){
        firestore()
            .collection('THREADS')
            .add({name: roomName})
            .then(() => { navigation.navigate('Home')});
    }
}
export default function AddRoomScreen({navigation}) {
    const roomName = '';
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
                value={roomName}
                autoCapitalize='none'
            />
           <FormButton 
                title='Entrar'
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
        justifyContent: 'center'
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0
    }
})
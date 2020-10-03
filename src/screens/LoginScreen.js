import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const { width, height } = Dimensions.get('screen'); 

export default function LoginScreen({navigation}){
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View style={styles.container}>
            <Title style={styles.titleText}>Bem Vindo!</Title>
            <FormInput 
                labelName='Email'
                value={email}
                autoCapitalize='none'
                onChangeText={userEmail => setEmail(userEmail)}
            />

            <FormInput 
                labelName='Senha'
                value={password}
                secureTextEntry={true}
                onChangeText={userPassword => setPassword(userPassword)}
            />
            <FormButton 
                title='Entrar'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={() => login(email, password)}
            />
            <FormButton
                title='Novo por aqui? Registre-se'
                modeValue='text'
                uppercase={false}
                labelStyle={styles.navButtonText}
                onPress={() => navigation.navigate('Signup')}
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
    titleText: {
        fontSize: 24,
        marginBottom: 10,
    },
    loginButtonLabel: {
        fontSize: 22,
    },
    navButtontext: {
        fontSize: 16,
        width: width / 2
    }
});
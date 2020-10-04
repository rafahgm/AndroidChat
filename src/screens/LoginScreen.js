import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import { Title, TextInput, Text } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const { width, height } = Dimensions.get('screen'); 

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15
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
    },
    wrongInput: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15,
        backgroundColor: '#FF0000'
    }
});

export default function LoginScreen({navigation}){
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
     
    // Login errors
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [wrongEmail, setWrongEmail] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    function loginWithValidation(email, password) {
        login(email, password).catch(error => {
            // Error message pattern: Error [auth/something]: Something something
            //Extract only whats inside square brackets
            const errorString = error.toString().match(/\[(.*?)\]/)[1];
            
            setErrorLogin(true);

            console.log(errorString);
            switch(errorString) {
                case 'auth/invalid-email': {
                    setErrorMessage('Email inválido.');
                    setWrongEmail(true);                    
                    break;
                }
                case 'auth/user-not-found': {
                    setErrorMessage('Email incorreto');
                    setWrongEmail(true);
                    break;
                }
                case 'auth/wrong-password': {
                    setErrorMessage('Senha incorreta');
                    setWrongPassword(true);
                    break;
                }
            }
        });
    }

    return(
        <View style={styles.container}>
            <Title style={styles.titleText}>Bem Vindo!</Title>
            <TextInput
                labelName='Email'
                value={email}
                style={wrongEmail ? styles.wrongInput : styles.input}
                autoCapitalize='none'
                onChangeText={userEmail => setEmail(userEmail)}
            />

            <TextInput
                labelName='Senha'
                style={wrongPassword ? styles.wrongInput : styles.input}
                value={password}
                secureTextEntry={true}
                onChangeText={userPassword => setPassword(userPassword)}
            />
            <View style={{
                backgroundColor: '#FF0000',
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
                display: errorLogin ? 'flex' : 'none'
            }}>
                <Text style={{color: '#FFF'}}>{errorMessage}</Text>
            </View>
            <FormButton 
                title='Entrar'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={() => loginWithValidation(email, password)}
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

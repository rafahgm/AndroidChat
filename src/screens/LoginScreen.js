import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Title, TextInput, Text } from 'react-native-paper';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { styles } from '../styles/LoginScreen';

function RenderErrorMessage({ errorLogin, errorMessage }) {
  if (errorLogin) {
    return (
      <View style={styles.errorMessage}>
        <Text style={{ color: '#FFF' }}>{errorMessage}</Text>
      </View>
    );
  }
  return null;
}

// eslint-disable-next-line react/prop-types
export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Login errors
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  function loginWithValidation(email, password) {
    login(email, password).catch((error) => {
      // Error message pattern: Error [auth/something]: Something something
      // Extract only whats inside square brackets
      const errorString = error.toString().match(/\[(.*?)\]/)[1];

      setErrorLogin(true);

      switch (errorString) {
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
        default: {
          setErrorMessage(errorString);
          setWrongPassword(true);
          setWrongEmail(true);
        }
      }
    });
  }

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Bem Vindo!</Title>
      <TextInput
        labelName="Email"
        value={email}
        style={wrongEmail ? styles.wrongInput : styles.input}
        autoCapitalize="none"
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <TextInput
        labelName="Senha"
        style={wrongPassword ? styles.wrongInput : styles.input}
        value={password}
        secureTextEntry={true}
        onChangeText={(userPassword) => setPassword(userPassword)}
      />
      <RenderErrorMessage errorLogin={errorLogin} errorMessage={errorMessage} />
      <FormButton
        title="Entrar"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => loginWithValidation(email, password)}
      />
      <FormButton
        title="Novo por aqui? Registre-se"
        modeValue="text"
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
}

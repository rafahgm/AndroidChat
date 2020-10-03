import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScren from '../screens/SignupScreen';
import LoginScren from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='Login' headerMode='none'>
            <Stack.Screen name='Login' component={LoginScren} />
            <Stack.Screen name='Signup' component={SignupScren} />
        </Stack.Navigator> 
    )
}
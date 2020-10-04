import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import AddRoomScreen from '../screens/AddRoomScreen';
import RoomScreen from '../screens/RoomScreen';
import { AuthContext } from './AuthProvider'
import { View } from 'react-native';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

function ChatApp() {
    const { logout } = useContext(AuthContext); 
    return (
        <ChatAppStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6646EE'
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontSize: 22
                    
                },
            }}>
                <ChatAppStack.Screen name='Home' component={HomeScreen} options={({navigation}) => ({
                    headerTitleAlign: 'center',
                    headerLeft: () => {
                        <IconButton
                            icon='logout'
                            size={28}
                            color='#FFFFFF'
                            onPress={() => logout()}
                        />
                    },
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                        <IconButton
                            icon='message-plus'
                            size={28}
                            color='#FFFFFF'
                            onPress={() => navigation.navigate('AddRoom')}
                        />
                        <IconButton
                            icon='logout'
                            size={28}
                            color='#FFFFFF'
                            onPress={() => logout()}
                        />
                        </View>
                    ),
                })} />
                <ChatAppStack.Screen name='Room' component={RoomScreen} options={({route}) => ({
                    title: route.params.thread.nome
                })}/>
        </ChatAppStack.Navigator> 
    )
}

export default function HomeStack() {
    return (
        <ModalStack.Navigator modal='modal' headerMode='none'>
            <ModalStack.Screen name='ChatApp' component={ChatApp} />
            <ModalStack.Screen name='AddRoom' component={AddRoomScreen} />
        </ModalStack.Navigator>
    )
}
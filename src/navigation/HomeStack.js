import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import AddRoomScreen from '../screens/AddRoomScreen';
import RoomScreen from '../screens/RoomScreen';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

function ChatApp() {
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
                    headerRight: () => (
                        <IconButton
                            icon='message-plus'
                            size={28}
                            color='#FFFFFF'
                            onPress={() => navigation.navigate('AddRoom')}
                        />
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
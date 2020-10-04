import React, { useContext, useState, useEffect } from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {IconButton } from 'react-native-paper';
import { GiftedChat, Bubble, Composer, Send } from 'react-native-gifted-chat';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore'

export default function RoomScreen() {
    function renderBubble(props) {
        return(
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#6646EE'
                    }
                }}
    
                textStyle={{
                    right: {
                        color: '#FFF'
                    }
                
                }}
            />
        )
    }

    function renderInputToolbar(props) {
        return(
            <View style={{
                flex: 1,
                flexDirection: 'row',
                paddingBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10
            }}>
                <Composer {...props}
                    placeholder='Digite aqui...'
                    textInputStyle={{
                        backgroundColor: '#EBEBEB',
                        paddingHorizontal: 12,
                        borderRadius: 20
                    }}
                />
                <Send {...props} containerStyle={{
                    width: 48,
                    height: 48
                }} >
                    <IconButton 
                        icon='send-circle'
                        size={48}
                        color='#6646ee'
                        style={{
                            position: 'absolute',
                            bottom: -18,
                            right: -18
                        }}
                    />
                </Send>
            </View>
        )
    }

    const {user} = useContext(AuthContext);
    const currentUser = user.toJSON();

    const [messages, setMessages] = useState([
          /**
     * Mock message data
     */
    // example of system message
    {
        _id: 0,
        text: 'New room created.',
        createdAt: new Date().getTime(),
        system: true
      },
      // example of chat message
      {
        _id: 1,
        text: 'Lorem Ipsum',
        createdAt: new Date().getTime(),
        user: {
          _id: 2,
          name: 'FUCK YOU'
        }
      }
    ]);

    function handleSend(newMessage = []) {
        setMessages(GiftedChat.append(messages, newMessage));
    }

    return(
        <GiftedChat
            messages={messages}
            onSend={newMessage => handleSend(newMessage)}
            user={{_id: 1}}
            minComposerHeight={44}
            minInputToolbarHeight={70} 
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            alwaysShowSend
          />
    )
}

const styles = StyleSheet.create({
    sendingContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    }
})
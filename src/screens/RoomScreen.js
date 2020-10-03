import React, { useContext, useState, useEffect } from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {IconButton } from 'react-native-paper';
import { GiftedChat, Bubble, Composer, Send } from 'react-native-gifted-chat';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore'

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

export default function RoomScreen() {
    const {user} = useContext(AuthContext);
    const currentUser = user.toJSON();

    useEffect(() => {
        console.log({user});
    });

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
            minComposerHeight={70}
            minInputToolbarHeight={70} 
            renderBubble={renderBubble}
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
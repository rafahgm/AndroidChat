import React, { useContext, useState, useEffect } from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {IconButton } from 'react-native-paper';
import { GiftedChat, Bubble, Composer, Send } from 'react-native-gifted-chat';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore'

export default function RoomScreen({route}) {
    const { thread } = route.params;
    const {user} = useContext(AuthContext);
    const currentUser = user.toJSON();
    const [messages, setMessages] = useState([]);

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

    async function handleSend(messages) {
        const text = messages[0].text;

        firestore()
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: currentUser.uid,
                    email: currentUser.email
                }
            });
    }

    useEffect(() => {
        const messagesListener = firestore()
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map( doc => {
                    const firebaseData = doc.data();

                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    }

                    if(!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: firebaseData.user.email
                        };
                    }

                    return data;
                });
                setMessages(messages);
            });

            return () => messagesListener();
    }, []);

    return(
        <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={{ _id: currentUser.uid }}
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
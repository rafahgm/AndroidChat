import React, { useContext, useEffect, useState } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { Divider, List, Title } from 'react-native-paper';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading'
import { FlatList } from 'react-native-gesture-handler';
import useStatusBar from '../util/StatusBar/'

export default function HomeScreen({navigation}) {
    useStatusBar('light-content', '#6646EE');
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('THREADS')
            .onSnapshot((querySnapshot) => {
                console.log(querySnapshot.size)
                const threads = querySnapshot.docs.map((documentSnapshot) => {
                    
                    return {
                        _id: documentSnapshot.id,
                        name: '',
                        ...documentSnapshot.data(),
                    };
                });

                setThreads(threads);

                if(loading) {
                    setLoading(false);
                }
            });
            return () => unsubscribe();
    }, []);

    if(loading) {
        return <Loading />
    }

    const {user, logout} = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <FlatList 
                data={threads}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Room', { thread: item })}
                    >
                        <List.Item 
                            title={item.nome}
                            description={item.descricao}
                            titleNumberOfLines={1}
                            titleStyle={styles.listTitle}
                            descriptionStyle={styles.listDescription}
                            descriptionNumberOfLines={1}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        flex: 1
    },
    listTitle: {
        fontSize: 22,
    },
    listDescription: {
        fontSize: 16,
    }
})
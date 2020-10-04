import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{user,
                setUser, 
                login: async (email, password) => {
                    return await auth().signInWithEmailAndPassword(email, password);
                },
                register: async(email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password).catch(err => console.log(err));
                    } catch(e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.error(e);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // register
    const registerWithEmailPass = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }


    // login
    const signInWithEmailAndPass = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass)
    }

    // google login
    const googleProvider = new GoogleAuthProvider()

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)

    }


    // logout
    const logout = () => {
        return signOut(auth)
    }



    // observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unSubscribe();
        }
    }, [])



    const info = {
        // state
        user,
        loading,

        // set State
        setLoading,

        // function
        registerWithEmailPass,
        signInWithEmailAndPass,
        googleSignIn,
        logout



    }
    return (
        <AuthContext value={info}>
            {children}
        </AuthContext>

    );
};

export default AuthProvider;
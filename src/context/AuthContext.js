import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const Register = (username, email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
            .then((data) => {
                db.collection('users').add({
                    id: data.user.uid,
                    username,
                    email,
                    password,
                });
            });
    };

    const Login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const Logout = () => {
        auth.signOut().then(setCurrentUser(null));
    };

    const ResetPassword = async (email) => {
        await auth.sendPasswordResetEmail(email);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                db.collection('users').get()
                    .then((snapshot) => {
                        const cuser = [];
                        snapshot.forEach((doc) => {
                            const data = {
                                userId: doc.id,
                                id: doc.data().id,
                                username: doc.data().username,
                                email: doc.data().email,
                                isAdmin: doc.data().isAdmin
                            };

                            if (data.id === String(user.uid)) {
                                cuser.push(data);
                            } else { }
                            setCurrentUser(cuser[0]);
                        });
                    });
            };
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        Register,
        Login,
        Logout,
        ResetPassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}
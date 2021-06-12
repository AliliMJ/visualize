import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../api/firebase';
import { database } from '../api/firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [projects, setProjects] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };
    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };
    const logout = () => {
        return auth.signOut();
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setIsLoading(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        return (
            user &&
            database.users
                .doc(user.uid)
                .onSnapshot((doc) => setUserInfo({ ...doc.data() }))
        );
    }, [user]);

    useEffect(() => {
        return (
            user &&
            database.projects
                .where('ower', '==', user.uid)
                .get()
                .then(({ docs }) => {
                    setProjects(docs.map((doc) => doc.data()));
                })
        );
    }, [user]);

    const value = {
        user,
        userInfo,
        projects,
        signup,
        login,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

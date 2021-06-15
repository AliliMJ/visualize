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
                .onSnapshot(({ docs }) =>
                    setProjects(docs.map((doc) => doc.data()))
                )
        );
    }, [user]);
    const collectors = [
        {
            id: 0,
            phone: '0789940112',
            firstname: 'John',
            lastname: 'Doe',
            email: 'john1234@gmail.com',
        },
        {
            id: 1,
            phone: '0511659079',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'smith_ma@yahoo.com',
        },
        {
            id: 2,
            phone: '0776740113',
            firstname: 'Jake',
            lastname: 'Pall',
            email: 'jake69.pal1@gmail.com',
        },
        {
            id: 3,
            phone: '0679613179',
            firstname: 'Mayers',
            lastname: 'Wayne',
            email: 'wayne.mayers@hotmail.com',
        },
        {
            id: 4,
            phone: '0613640179',
            firstname: 'George',
            lastname: 'Watchnew',
            email: 'george_watchdog12@hotmail.com',
        },
    ];

    const value = {
        user,
        userInfo,
        projects,
        collectors,
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
import { useEffect, useState } from 'react';
import { database, docListen } from '../api/firebase';
import defaultAvatar from '../res/defaultAvatar.png';
import { useAuth } from './useAuth';
/**
 *
 * @param {*} userID
 * @returns Info about user specified by userID or the current connected user if no argument is passed.
 */
export const useInfo = (userID) => {
    const [userInfo, setUserInfo] = useState({});
    const { user } = useAuth();
    useEffect(() => {
        const docRef = database.users.doc(userID || user.uid);
        return docListen(docRef, setUserInfo);
    }, []);

    return { ...userInfo, avatar: userInfo.avatar || defaultAvatar };
};

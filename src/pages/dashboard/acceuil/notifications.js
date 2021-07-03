import { useState, useEffect } from 'react';
import Demande from '../../../components/demande';
import { database, getDocs } from '../../../api/firebase';
import { useAuth } from '../../../hook/useAuth';
const Notifications = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const query = database.notifications.where('to', '==', user.uid);
        console.log(user.uid);
        getDocs(query).then((docs) => setNotifications(docs));
    }, []);
    return notifications.map((notification) => (
        <Demande notification={notification} />
    ));
};

export default Notifications;

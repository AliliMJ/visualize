import { useState, useEffect } from 'react';
import Demande from '../../../components/demande';
import { database, getDocs, getDoc } from '../../../api/firebase';
import { useAuth } from '../../../hook/useAuth';
import { useInfo } from '../../../hook/useInfo';

const Notifications = () => {
    const { user } = useAuth();
    const { email } = useInfo();
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const query = database.notifications.where('to', '==', user.uid);

        getDocs(query).then((docs) => setNotifications(docs));
    }, []);
    const handleClick = (notification, action) => {
        const updateNotification = {
            ...notification,
        };
        const updateNotifs = notifications.filter(
            (n) => n.docID !== notification.docID
        );
        updateNotifs.push(updateNotification);
        updateNotification.state = action;

        database.notifications
            .add({
                message: `L'utilisateur ${email} à ${
                    action === 'accepted' ? 'accepté' : 'refusé'
                } votre invitation dans le projet`,
                sentBy: user.uid,
                to: notification.sentBy,
                project: notification.project,
                state: action,
                date: new Date().toDateString(),
            })
            .then(() =>
                database.notifications
                    .doc(notification.docID)
                    .set(updateNotification)
            )

            .then(setNotifications(updateNotifs));
    };
    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h3 className="text-3xl text-gray-500">
                    Notification pas encore répondu
                </h3>
                <div className="space-y-1">
                    {notifications
                        .filter((n) => n.state === 'pending')
                        .map((notification) => (
                            <Demande
                                notification={notification}
                                key={notification.docID}
                                decline={(notification) =>
                                    handleClick(notification, 'declined')
                                }
                                accept={(notification) =>
                                    handleClick(notification, 'accepted')
                                }
                            />
                        ))}
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-3xl text-gray-500">Notification répondu</h3>
                <div className="space-y-1">
                    {notifications
                        .filter((n) => n.state !== 'pending')
                        .map((notification) => (
                            <Demande
                                notification={notification}
                                key={notification.docID}
                                decline={(notification) =>
                                    handleClick(notification, 'declined')
                                }
                                accept={(notification) =>
                                    handleClick(notification, 'accepted')
                                }
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;

import { useState, useEffect } from 'react';
import Demande from '../../../components/demande';
import { database, getDocs, getDoc } from '../../../api/firebase';
import { useAuth } from '../../../hook/useAuth';
import { useInfo } from '../../../hook/useInfo';
import SentInvitation from '../../../components/sentInvitation';

const Notifications = () => {
    const { user } = useAuth();
    const { email, role } = useInfo();
    const [envoye, setEnvoye] = useState([]);
    const [recu, setRecu] = useState([]);
    useEffect(() => {
        const query_recu = database.notifications.where(
            'to_id',
            '==',
            user.uid
        );
        const query_envoye = database.notifications.where(
            'sentByID',
            '==',
            user.uid
        );

        getDocs(query_recu).then((docs) => setRecu(docs));
        getDocs(query_envoye).then((docs) => setEnvoye(docs));
    }, []);
    const handleClick = (notification, action) => {
        // case of collector applying action on invitation.
        const updateNotification = {
            ...notification,
        };
        updateNotification.state = action;

        const updateNotifs = recu.filter((n) => n.docID !== notification.docID);
        updateNotifs.push(updateNotification);

        database.notifications
            .add({
                message: `L'utilisateur ${email} à ${
                    action === 'accepted' ? 'accepté' : 'refusé'
                } votre invitation dans le projet`,
                sentByID: user.uid,
                sentByEmail: email,
                to_id: notification.sentByID,
                to_email: notification.sentByEmail,
                project: notification.project,
                projectID: notification.projectID,
                state: action,
                type: 'response',
                date: new Date().toDateString(),
            })
            .then((reponse) => setEnvoye([...envoye, reponse]))
            .then(() =>
                database.notifications
                    .doc(notification.docID)
                    .set(updateNotification)
            )

            .then(setRecu(updateNotifs));
    };
    return (
        <div className="space-y-10">
            {role === 'superviseur' && (
                <div className="space-y-4">
                    <h3 className="text-3xl text-gray-500">
                        Envoyées par vous
                    </h3>
                    <div className="space-y-1">
                        {envoye
                            .filter(
                                (i) =>
                                    i.type === 'invitation' &&
                                    i.state === 'pending'
                            )
                            .map((notification) => (
                                <SentInvitation
                                    invitation={notification}
                                    key={notification.docID}
                                />
                            ))}
                    </div>
                </div>
            )}
            <div className="space-y-4">
                <h3 className="text-3xl text-gray-500">Réponses</h3>
                <div className="space-y-1">
                    {recu.map((notification) => (
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

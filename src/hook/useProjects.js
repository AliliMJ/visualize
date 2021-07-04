import { useState, useEffect } from 'react';
import { useInfo } from './useInfo';
import { database } from '../api/firebase';
import firebase from 'firebase';
import { useAuth } from './useAuth';
import { getDocs } from '../api/firebase';
/**
 *
 * @returns Array of projects, owned projects if user type
 * is supervisor, if user of type collector then it returns projects he signed to collect data of.
 */
export const useProjects = () => {
    const { role } = useInfo();
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const getProjects = async () => {
            let query;
            console.log(role);
            if (role === 'superviseur')
                query = database.projects.where('owner', '==', user.uid);
            else if (role === 'collecteur') {
                const notification = await getDocs(
                    database.notifications
                        .where('sentByID', '==', user.uid)
                        .where('type', '==', 'response')
                        .where('state', '==', 'accepted')
                );
                if (notification.length === 0) return [];
                const projectIDs = notification.map((p) => p.projectID);
                query = database.projects.where(
                    firebase.firestore.FieldPath.documentId(),
                    'in',
                    projectIDs
                );
            } else return [];

            const data = await getDocs(query);
            console.log(data);
            setProjects(data);
        };
        return getProjects();
    }, [role, user.uid]);

    return projects;
};

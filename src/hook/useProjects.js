import { useState, useEffect } from 'react';
import { useInfo } from './useInfo';
import { database } from '../api/firebase';
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
            const param =
                role === 'superviseur'
                    ? ['owner', '==', user.uid]
                    : ['collectors', 'array-contains', user.uid];

            const query = database.projects.where(...param);
            const data = await getDocs(query);
            setProjects(data);
        };
        return getProjects();
    }, [role, user.uid]);

    return projects;
};

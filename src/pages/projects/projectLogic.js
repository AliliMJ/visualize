import { useState, useEffect, useCallback } from 'react';
import { database, getDocs, getDoc } from '../../api/firebase';
import {
    calculateActivityPercentage,
    calculateActivityTimePercentage,
} from './activity';
import firebase from 'firebase';

/**
 *
 *
 * @todo Clean up of facturess after delete of activity.
 */
const calculateActivityWork = (activity) => {
    if (activity.state === 'Done') {
        return 100;
    } else
        return (
            calculateActivityPercentage(activity) -
            calculateActivityTimePercentage(activity)
        );
};
const ProjectLogic = (projectID) => {
    const [project, setProject] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [work, setWork] = useState(0);
    const [owner, setOwner] = useState({});
    const [activityModal, setActivityModal] = useState(false);
    const [collectors, setCollectors] = useState([]);
    const [activities, setActivities] = useState([]);
    const [collectorModal, setCollectorModal] = useState(false);
    const loadCollectors = async (collectorsID) => {
        if (collectorsID.length > 0) {
            const collectorQuery = database.users.where(
                firebase.firestore.FieldPath.documentId(),
                'in',

                collectorsID
            );
            setCollectors(await getDocs(collectorQuery));
        }
    };
    const load = async () => {
        const projectRef = database.projects.doc(projectID);
        const project = await getDoc(projectRef);
        setProject(project);

        await loadCollectors(project.collectors);

        const activityQuery = database.activities.where(
            'projectID',
            '==',
            project.docID
        );
        setActivities(await getDocs(activityQuery));

        const owner = await getDoc(database.users.doc(project.owner));
        setOwner(owner);
    };

    useEffect(() => {
        load();
    }, []);

    // useEffect(() => {
    //     return async () => {
    //         // const p = await database.projects
    //         //     .doc(projectID)
    //         //     .set({ ...project, work });
    //         console.log(project);
    //     };
    // }, [projectID]);

    useEffect(() => {
        if (activities.length === 0) setWork(0);
        else {
            const total = activities.reduce(
                (acc, activity) => acc + calculateActivityWork(activity),
                0
            );
            setWork(total / activities.length);
        }
    }, [activities]);
    useEffect(() => {
        if (Object.keys(project).length > 0) {
            const { docID, ...p } = project;
            database.projects.doc(projectID).set({ ...p, work });
        }
        console.log(work);
    }, [work]);

    const updateCollectors = (collectors) => {
        setCollectors(collectors);
        const updateProject = {
            ...project,
            collectors: collectors.map((c) => c.docID),
        };
        database.projects.doc(projectID).set(updateProject);
    };
    const addCollector = (collector) => {
        if (
            collector.role === 'collecteur' &&
            !collectors.includes(collector.docID)
        ) {
            updateCollectors([...collectors, collector]);
        }
    };
    const handleDelete = (collector) => {
        const filterCollector = collectors.filter(
            (c) => c.docID !== collector.docID
        );

        updateCollectors(filterCollector);
    };
    const handleAddCollector = async ({ response, value }) => {
        if (response) {
            const getUserByEmail = database.users.where('email', '==', value);
            const collector = await getDocs(getUserByEmail);
            try {
                addCollector(collector[0]);
            } catch {
                alert('Something went wrong.');
            }
        }

        setCollectorModal(false);
    };

    const handleAddActivity = async ({ response, value }) => {
        if (response) {
            const activity = {
                state: 'Not started',
                projectID,
                phase: activities.length + 1,
                percentage: 0,
                remaining: value.budget,
                ...value,
            };
            const { id } = await database.activities.add(activity);

            setActivities([...activities, { ...activity, docID: id }]);
        }
        setActivityModal(false);
    };
    const handleDeleteActivity = async (activity) => {
        try {
            await database.activities.doc(activity.docID).delete();
            setActivities(activities.filter((a) => a.docID !== activity.docID));
        } catch {}
    };

    return {
        project,
        work,
        collectors,
        activities,
        owner,
        collectorModal,
        activityModal,
        setActivityModal,
        setCollectorModal,
        handleAddCollector,
        handleAddActivity,
        handleDelete,
        handleDeleteActivity,
    };
};

export default ProjectLogic;

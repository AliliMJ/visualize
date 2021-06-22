import { useEffect, useState } from 'react';
import { database } from '../../api/firebase';
import JsonActivity from '../../components/jsonActivity';
import IconButton from '../../components/common/iconButton';
import { FaArrowLeft, FaCheck, FaPlay, FaUndoAlt } from 'react-icons/fa';

import { useHistory } from 'react-router';

const Activity = ({ match }) => {
    const [activity, setActivity] = useState({});
    const history = useHistory();
    const onAdd = ({ new_value }) => {
        const new_activity = { ...activity };
        new_activity.actual = { ...new_activity.actual, ...new_value };
        new_activity.expected = { ...new_activity.expected, ...new_value };
        setActivity(new_activity);
    };
    const onEdit = (data, obj) => {
        const new_activity = { ...activity };
        new_activity[obj][data.name] = data.new_value;
        setActivity(new_activity);
    };
    const validate = async () => {
        await database.activities.doc(match.params.id).set(activity);
        back();
    };
    const back = () => {
        history.push(`/projects/${activity.projectID}`);
    };
    useEffect(() => {
        return database.activities
            .doc(match.params.id)
            .get()
            .then((doc) => setActivity(doc.data()));
    }, [match.params.id]);
    const { expected, actual, ...general } = activity;
    const handleState = (state) => {
        const new_activity = { ...activity };
        new_activity.state = state;
        setActivity(new_activity);
    };
    return (
        <div className="p-4 grid grid-cols-2 gap-x-2 gap-y-10">
            <div className="col-span-full relative">
                <IconButton className="text-gray-500 space-x-2" onClick={back}>
                    <FaArrowLeft />
                    <span>Retour</span>
                </IconButton>
                <IconButton
                    name="Valider"
                    className=" absolute right-0 top-0 bg-green-500 text-white"
                    onClick={validate}
                >
                    <FaCheck />
                </IconButton>
            </div>

            <JsonActivity
                onEdit={(data) => onEdit(data, 'data')}
                className="col-span-full relative"
                name="Données statiques de la phase"
                src={general}
            >
                <div className="absolute bottom-0 right-0 grid grid-cols-1">
                    <IconButton
                        className="group space-x-2 justify-self-end"
                        onClick={() => handleState('In progress')}
                    >
                        <span className="transition delay-75 duration-150 ease-in-out opacity-0 group-hover:opacity-100">
                            Lancer
                        </span>
                        <FaPlay />
                    </IconButton>
                    <IconButton
                        className="group space-x-2 justify-self-end"
                        onClick={() => handleState('Done')}
                    >
                        <span className="transition delay-75 duration-150 ease-in-out opacity-0 group-hover:opacity-100">
                            Terminer
                        </span>
                        <FaCheck />
                    </IconButton>
                    <IconButton
                        className="group space-x-2 justify-self-end"
                        onClick={() => handleState('Not started')}
                    >
                        <span className="transition delay-75 duration-150 ease-in-out opacity-0 group-hover:opacity-100">
                            Reset
                        </span>
                        <FaUndoAlt />
                    </IconButton>
                </div>
            </JsonActivity>
            <JsonActivity
                onEdit={(data) => onEdit(data, 'expected')}
                onAdd={onAdd}
                name="Objectifs"
                src={expected}
            />
            <JsonActivity
                onEdit={(data) => onEdit(data, 'actual')}
                name="Données actuelles"
                src={actual}
            />
        </div>
    );
};

export default Activity;

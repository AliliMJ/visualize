import { useEffect, useState } from 'react';
import { database } from '../../api/firebase';
import JsonActivity from '../../components/jsonActivity';
import IconButton from '../../components/common/iconButton';
import { FaArrowLeft, FaCheck, FaPlay, FaUndoAlt } from 'react-icons/fa';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useHistory } from 'react-router';
const difference = (expected, actual) => {
    actual = actual ?? 0;
    expected = expected ?? 0;
    return { diff: Math.abs(expected - actual), max: expected };
};

const Activity = ({ match }) => {
    const [activity, setActivity] = useState({});
    const history = useHistory();

    const activityPercentage = () => {
        let { expected, actual } = activity;
        if (expected === null || expected === undefined) return 100;
        if (actual === null || actual === undefined) return 0;
        let sigma = 0;
        let max_sigma = 0;

        actual = actual ?? {};
        for (let [key, value] of Object.entries(expected)) {
            const { diff, max } = difference(value, actual[key]);
            max_sigma += max;
            sigma += diff;
        }
        return Math.round((1 - sigma / max_sigma) * 100);
    };
    const onAdd = ({ new_value }) => {
        const new_activity = { ...activity };
        new_activity.actual = { ...new_activity.actual, ...new_value };
        new_activity.expected = { ...new_activity.expected, ...new_value };
        setActivity(new_activity);
    };
    const onEdit = (data, obj) => {
        const new_activity = { ...activity };
        new_activity[obj][data.name] = data.new_value;
        new_activity.percentage = activityPercentage();
        setActivity(new_activity);
    };
    const validate = async () => {
        const new_activity = { ...activity };
        activity.percentage = activityPercentage(activity);
        setActivity(new_activity);
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
            <div className="col-span-full flex justify-between">
                <IconButton className="text-gray-500 space-x-2" onClick={back}>
                    <FaArrowLeft />
                    <span>Retour</span>
                </IconButton>

                <IconButton
                    name="Valider"
                    className="bg-green-500 text-white"
                    onClick={validate}
                >
                    <FaCheck />
                </IconButton>
            </div>
            <div className="col-span-full">
                <div className="h-12 border shadow border-gray-200 bg-gray-50 text-gray-500  flex items-center px-5 font-bold">
                    Pourcentages
                </div>
                <div className="border shadow rounded py-10 flex justify-center space-x-10">
                    <div className="flex flex-col justify-center items-center space-x-2">
                        <div className="text-gray-400">Avancement </div>
                        <div>
                            <CircularProgressbar
                                className="h-20 w-20"
                                value={general.percentage}
                                text={`${general.percentage}%`}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col  justify-center items-center space-x-2">
                        <div className="text-gray-400">Temps passé </div>
                        <div>
                            <CircularProgressbar
                                className="h-20 w-20"
                                value={general.percentage}
                                text={`${general.percentage}%`}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col  justify-center items-center space-x-2">
                        <div className="text-gray-400">Coût </div>
                        <div>
                            <CircularProgressbar
                                className="h-20 w-20"
                                value={general.percentage}
                                text={`${general.percentage}%`}
                            />
                        </div>
                    </div>
                </div>
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

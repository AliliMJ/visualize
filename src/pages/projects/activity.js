import { useEffect, useState } from 'react';
import { database, getDoc, getDocs } from '../../api/firebase';
import JsonActivity from '../../components/jsonActivity';
import IconButton from '../../components/common/iconButton';
import FactureModal from './factureModal';
import {
    FaArrowLeft,
    FaCheck,
    FaPlay,
    FaUndoAlt,
    FaPlus,
} from 'react-icons/fa';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useHistory } from 'react-router';

import FactureTable from './factureTable';
import { useInfo } from '../../hook/useInfo';
const difference = ({ expected, actual }) => {
    actual = actual ?? 0;
    expected = expected ?? 0;
    return { diff: Math.abs(expected - actual), max: expected };
};
export const calculateActivityPercentage = ({ actual, expected }) => {
    if (expected === null || expected === undefined) return 0;
    if (actual === null || actual === undefined) return 0;
    if (Object.keys(expected).length === 0 || Object.keys(actual).length === 0)
        return 0;
    let sigma = 0;
    let max_sigma = 0;
    console.log(actual, expected);
    actual = actual ?? {};
    for (let [key, value] of Object.entries(expected)) {
        const { diff, max } = difference({
            expected: value,
            actual: actual[key],
        });
        max_sigma += max;
        sigma += diff;
    }
    return Math.round((1 - sigma / max_sigma) * 100);
};
const calculateRemainingPercentage = ({ remaining, budget }) => {
    if (remaining === undefined || budget === undefined || remaining < 0)
        return 0;
    if (remaining === 0) return 0;
    if (remaining > budget) return 100;

    return Math.round((100 * remaining) / budget);
};
export const calculateActivityTimePercentage = (activity) => {
    const date = new Date(activity.date);
    const now = new Date();
    const diffDays = Math.ceil((now - date) / (1000 * 60 * 60 * 24));
    const percentage = Math.round((100 * diffDays) / activity.delai);
    if (percentage >= 0 && percentage <= 100) return percentage;
    if (percentage > 100) return 100;
    return 0;
};

const Activity = ({ match }) => {
    const { firstName, lastName } = useInfo();
    const [activity, setActivity] = useState({});
    const [factures, setFactures] = useState([]);
    const [timeLeftPercentage, setTimeLeftPercentage] = useState(0);
    const [remainingPercentage, setRemainingPercentage] = useState(0);
    const history = useHistory();

    // const budgetPercentage = useCallback(() => {
    //     if (activity.budget === 0 || !activity.budget) return 100;
    //     const totalCost = -factures.reduce(
    //         (acc, value) => acc + value.amount,
    //         0
    //     );

    //     if (totalCost >= 0 && totalCost <= activity.budget) {
    //         return Math.round((100 * totalCost) / activity.budget);
    //     }
    //     if (totalCost > activity.budget) return 100;
    //     if (totalCost < activity.budget) return 0;
    // }, [activity.budget, factures]);

    const onAdd = ({ new_value }) => {
        const new_activity = { ...activity };
        new_activity.actual = { ...new_activity.actual, ...new_value };
        new_activity.expected = { ...new_activity.expected, ...new_value };
        setActivity(new_activity);
    };
    const onEdit = (data, obj) => {
        const new_activity = { ...activity };
        new_activity[obj][data.name] = data.new_value;
        new_activity.percentage = calculateActivityPercentage(activity);
        setActivity(new_activity);
    };
    const validate = async () => {
        const new_activity = { ...activity };
        activity.percentage = calculateActivityPercentage(activity);
        setActivity(new_activity);
        await database.activities.doc(match.params.id).set(activity);
        back();
    };
    const back = () => {
        history.push(`/projects/${activity.projectID}`);
    };

    //useEffect(() => setCostPercentage(budgetPercentage()), [budgetPercentage]);
    useEffect(() => {
        setRemainingPercentage(
            calculateRemainingPercentage({
                remaining: activity.remaining,
                budget: activity.budget,
            })
        );
    }, [activity.remaining, activity.budget]);
    useEffect(() => {
        setTimeLeftPercentage(calculateActivityTimePercentage(activity));
    }, [activity.date, activity.delai]);
    useEffect(() => {
        const load = async () => {
            const activityRef = database.activities.doc(match.params.id);
            const activity = await getDoc(activityRef);

            setActivity(activity);

            const query = database.factures.where(
                'activityID',
                '==',
                match.params.id
            );
            const factures = await getDocs(query);
            setFactures(factures);
        };
        load();
    }, [match.params.id]);

    const { expected, actual, ...general } = activity;
    const [factureModal, setFactureModal] = useState(false);
    const handleAddFacture = async ({ response, value }) => {
        if (response) {
            const facture = {
                ...value,
                activityID: match.params.id,
                date: new Date().toDateString(),
                by: `${firstName} ${lastName}`,
            };
            const { id } = await database.factures.add(facture);
            setFactures([...factures, { ...facture, docID: id }]);
            const updateActivity = {
                ...activity,
                remaining: activity.remaining + facture.amount,
            };
            database.activities.doc(match.params.id).set(updateActivity);
            setActivity(updateActivity);
        }
        setFactureModal(false);
    };
    const handleState = (state) => {
        const new_activity = { ...activity };
        new_activity.state = state;
        setActivity(new_activity);
    };

    return (
        <div className="p-4 grid grid-cols-2 gap-x-2 gap-y-10">
            {factureModal && <FactureModal emit={handleAddFacture} />}
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
                                value={timeLeftPercentage}
                                text={`${timeLeftPercentage}%`}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col  justify-center items-center space-x-2">
                        <div className="text-gray-400">Budget Restant </div>
                        <div>
                            <CircularProgressbar
                                className="h-20 w-20"
                                value={remainingPercentage}
                                text={`${remainingPercentage}%`}
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
            <div className="col-span-full">
                <div className="h-12 border shadow border-gray-200 bg-gray-50 text-gray-500  flex items-center px-5 font-bold">
                    Financemet
                </div>
                <div className="border shadow rounded py-2 px-5 space-y-1">
                    <FactureTable factures={factures} />
                    <IconButton
                        onClick={() => {
                            setFactureModal(true);
                        }}
                        className="bg-transparent shadow border w-full text-gray-500 rounded items-center justify-center"
                    >
                        <FaPlus />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Activity;

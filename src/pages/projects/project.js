import StateBadge from './stateBadge';

import CollectorTable from './collectorTable';
import ActivityTable from './activityTable';

import IconButton from '../../components/common/iconButton';
import { FaPlus } from 'react-icons/fa';
import CollectorModal from './collectorModal';
import ProjectLogic from './projectLogic';

import ActivityModal from './activityModal';

/**
 *
 *
 * @todo Fix problem when collectors of the project is [].
 */
const Project = ({ match }) => {
    const {
        project,
        collectors,
        activities,
        owner,
        collectorModal,
        activityModal,
        setActivityModal,
        handleAddActivity,
        handleAddCollector,
        setCollectorModal,
        handleDelete,
        handleDeleteActivity,
        work,
    } = ProjectLogic(match.params.id);

    return project ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {collectorModal && <CollectorModal emit={handleAddCollector} />}
            {activityModal && <ActivityModal emit={handleAddActivity} />}

            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-bold text-gray-900">
                    Détails du projet
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    N° {project.docID}
                </p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Titre
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {project.title}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Directeur
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={owner.avatar}
                                        alt=""
                                    />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {owner.firstName} {owner.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {owner.email}
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Etat
                        </dt>
                        <dd className="mt-1 space-x-5 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <StateBadge degree={work} />
                            <span className="text-gray-500">
                                ~{(work + 100) / 2}%
                            </span>
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Budget
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {activities.reduce(
                                (acc, value) => acc + value.remaining,
                                0
                            )}{' '}
                            DZD
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Description
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {project.description}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Documents
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                        <span className="ml-2 flex-1 w-0 truncate">
                                            resume_back_end_developer.pdf
                                        </span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <a
                                            href="#"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </li>
                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                        <span className="ml-2 flex-1 w-0 truncate">
                                            coverletter_back_end_developer.pdf
                                        </span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <a
                                            href="#"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Collecteurs
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex-col space-y-1">
                            <CollectorTable
                                collectors={collectors}
                                onDelete={handleDelete}
                            />
                            <IconButton
                                className="bg-transparent shadow border w-full text-gray-500 rounded items-center justify-center"
                                onClick={() => setCollectorModal(true)}
                            >
                                <FaPlus />
                            </IconButton>
                        </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            <span>Activitées</span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex-col space-y-1">
                            <ActivityTable
                                activities={activities}
                                onDelete={handleDeleteActivity}
                            />

                            <IconButton
                                onClick={() => setActivityModal(true)}
                                className="bg-transparent shadow border w-full text-gray-500 rounded items-center justify-center"
                            >
                                <FaPlus />
                            </IconButton>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    ) : (
        <div className="text-center text-gray-400">
            Vous n'avez pas le droit d'acceder à ce projet.
        </div>
    );
};

export default Project;

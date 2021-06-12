import React from 'react';
import { VscGripper } from 'react-icons/vsc';

import { FaPen, FaTrash, FaCircle } from 'react-icons/fa';
import ListButton from './listButton';
import classNames from 'classnames';
import { reactRename } from 'react-rename';
const DeleteButton = reactRename(ListButton, 'Deleting button');
const EditButton = reactRename(ListButton, 'Edit button');
const MoreButton = reactRename(ListButton, 'More about the project');

const ProjectState = ({ state }) => {
    const remarques = ['En retard', 'Moyen', 'Bon'];

    const classes = ['text-red-400', 'text-yellow-400', 'text-green-400'];

    return (
        <div className="flex items-center text-xs space-x-2">
            <div>Etat:</div>
            <div>
                <FaCircle className={classes[state]} />
            </div>
            <div className="text-gray-400 ">{remarques[state]}</div>
        </div>
    );
};

function ListElement({ name, description, state }) {
    return (
        <div className="flex flex-row  py-2 px-3 border border-gray-300 rounded">
            <div className="flex flex-col self-start space-y-2">
                <section>
                    <h1 className="text-2xl">{name}</h1>
                    <div className="text-gray-500 ">{description}</div>
                </section>

                <ProjectState state={state} />
            </div>

            <div className="flex ml-auto space-x-5 self-end items-center self-center">
                <EditButton
                    name="modifier"
                    className="border  text-xs hover:bg-gray-100"
                >
                    <FaPen />
                </EditButton>

                <DeleteButton
                    name="supprimer"
                    className="bg-red-500 hover:bg-red-700 text-white text-xs"
                >
                    <FaTrash />
                </DeleteButton>

                <MoreButton className="hover:bg-gray-100">
                    <VscGripper />
                </MoreButton>
            </div>
        </div>
    );
}

export default ListElement;

import React from 'react';
import { VscGripper } from 'react-icons/vsc';

import { FaPen, FaTrash, FaCircle } from 'react-icons/fa';
import IconButton from './iconButton';
import { reactRename } from 'react-rename';
import { getRemarque, getClass } from '../helpers/states';

const DeleteButton = reactRename(IconButton, 'Deleting button');
const EditButton = reactRename(IconButton, 'Edit button');
const MoreButton = reactRename(IconButton, 'More about the project');

const ProjectState = ({ state }) => {
    return (
        <div className="flex items-center text-xs space-x-2">
            <div>Etat:</div>
            <div>
                <FaCircle className={getClass(state)} />
            </div>
            <div className="text-gray-400 ">{getRemarque(state)}</div>
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

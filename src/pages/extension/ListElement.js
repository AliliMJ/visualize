import React from 'react';
import { VscGripper } from 'react-icons/vsc';

import { FaPen, FaTrash, FaCircle } from 'react-icons/fa';
import ListButton from './listButton';
import classNames from 'classnames';

function ListElement({ name, description, state }) {
  return (
    <div className="flex flex-row  py-2 px-3 border border-gray-300 rounded">
      <div className="flex flex-col self-start space-y-2">
        <section>
          <h1 className="text-2xl">{name}</h1>
          <div className="text-gray-500 ">{description}</div>
        </section>

        {/*icone + etat*/}
        <div className="flex items-center text-xs space-x-2">
          <div>Etat:</div>
          <div>
            <FaCircle
              className={classNames(
                {
                  'text-red-400': state.bad,
                },
                {
                  'text-yellow-400': state.medium,
                },
                { 'text-green-400': state.good }
              )}
            />
          </div>
          <div className="text-gray-400 ">{state.name}</div>
        </div>
      </div>

      <div className="flex ml-auto space-x-5 self-end items-center self-center">
        <ListButton name="modifier" className="border  text-xs">
          <FaPen />
        </ListButton>

        <ListButton
          name="supprimer"
          className="bg-red-500 hover:bg-red-700 text-white text-xs"
        >
          <FaTrash />
        </ListButton>

        <button className="text-xl p-2 ml-3 border-gray-500 hover:bg-gray-200">
          <VscGripper />
        </button>
      </div>
    </div>
  );
}

export default ListElement;

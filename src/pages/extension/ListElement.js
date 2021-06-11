import React from "react";
import { VscGripper } from "react-icons/vsc";
import { GiSpikeball } from "react-icons/gi";
import { BiPencil } from "react-icons/bi";
import { GrTrash } from "react-icons/gr";

function ListElement({ name, description }) {
  return (
    <div className="flex flex-row space-x-10 m-10 py-1 px-2 border border-gray-800 rounded">
      <div className="flex flex-col self-start">
        <h3 className="p-2 text-2xl">{name}</h3>
        
        
        {/*icone + etat*/ }
        <div className="flex space-x-4">
          <div className="mt-1">
            <GiSpikeball color="red" />
          </div>
          <h5 className="text-gray-600 ">{description}</h5>
        </div>
      
      </div>

      <div className="flex self-end p-4">
        
        <button className="flex hover:bg-gray-200 border py-2 mx-3 rounded">
          <div className="mx-5 my-1.5"><BiPencil size={22}/> </div>
          <h2 className="mr-5 p-1">Modifier</h2>
        </button>

        <button className="flex bg-red-500 hover:bg-red-700 border py-2 mx-3 rounded">
          <div className="mx-5 my-1.5"><GrTrash color size={20}/> </div>
          <h2 className="mr-5 p-1 text-white">Suprimmer</h2>
        </button>

        <button className="text-xl p-2 ml-3 border-gray-500 hover:bg-gray-200">
          <VscGripper />
        </button>
      </div>
    </div>
  );
}

export default ListElement;

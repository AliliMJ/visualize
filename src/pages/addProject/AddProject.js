import React, { useState } from "react";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import Map from "../extension/Map";
import { MapProvider, useMap } from "../extension/useMap";
import { FaFileUpload } from "react-icons/fa";
import {addProjectToDB} from "./projectFunctions";

function AddProject(props) {
  const [clickCords, setClickCords] = useState([0, 0]);
  const [files, setFiles] = useState([]);
  
  const validate = Yup.object({
    name: Yup.string().required("Votre projet doit avoir un nom"),
    description: Yup.string().required(
      "Votre projet doit avoir une description"
    ),
  });

  const init = {
    name: "",
    description: "",
  };

  function handleFile(e) {
    setFiles(e.target.files[0]);
  }
  
  function getCords(e) {
    setClickCords(e);
  }
  return (
    <Formik
      initialValues={init}
      validationSchema={validate}
      onSubmit={(values) => addProjectToDB(values, clickCords, files.name )}
    >
      {(formik) => (
        <>
          <div className="flex flex-col justify-items-center">
            <h1 className="text-4xl self-center mb-10">Ajouter un projet</h1>
            <Form className="self-center border border-gray-600 rounded-md shadow-md">
              <TextField label="Nom du projet" name="name" type="text" />

              <TextField
                label="Description du projet"
                name="description"
                type="text"
              />
              <div className="text-xl px-4 py-2">
                <h1>Emplacement du projet : </h1>
              </div>

              <div>
                <h1 className="text-lg m-2 px-7">
                  Longitude : {clickCords[0].toFixed(5)}
                </h1>
                <h1 className="text-lg m-2 px-7">
                  Latitude : {clickCords[1].toFixed(5)}
                </h1>
              </div>
              <div className="p-4">
                <MapProvider>
                  <Map getLngLat={getCords} />
                </MapProvider>
              </div>
              <div className="m-4 flex bg-blue-500 rounded-lg w-1/5">
                <label
                  htmlFor="fileSelector"
                  className="p-4 text-xl text-white  "
                >
                  Ajouter un Document
                </label>
                <input
                  type="file"
                  name="fileInput"
                  id="fileSelector"
                  className="hidden"
                  onChange={handleFile}
                />
                <div className="m-4">
                  <FaFileUpload size={45} color="white" />
                </div>
                <h1 className="p-4 mt-2 text-lg text-blue-800">Fichier à ajouter : {files.name}</h1>
              </div>
              <button
                type="submit"
                className="m-4 p-2 text-3xl bg-green-500 text-white rounded-md"
              >
                Ajouter
              </button>
            </Form>
          </div>
        </>
      )}
    </Formik>
  );
}

export default AddProject;

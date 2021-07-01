import React, { useState } from "react";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import Map from "../extension/Map";
import { MapProvider, useMap } from "../extension/useMap";
import { FaFileUpload } from "react-icons/fa";
import { addProjectToDB } from "./projectFunctions";

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
    <div className="bg-blue-500 w-full h-full">
      <Formik
        initialValues={init}
        validationSchema={validate}
        onSubmit={(values) => addProjectToDB(values, clickCords, files.name)}
      >
        {(formik) => (
          <>
            <div className="p-4 bg-white flex flex-col justify-items-center">
              <Form className="self-center border border-gray-600 rounded-md shadow-md">
                <TextField label="Nom du projet" name="name" type="text" />

                <TextField
                  label="Description du projet"
                  name="description"
                  type="text"
                />
                <div className="m-4 ml-6 p-1 border border-black rounded-lg  shadow-md w-1/3">
                  <div className="text-xl px-4 py-2">
                    <h1 className="font-bold text-gray-500">Emplacement du projet : </h1>
                  </div>

                  <div>
                    <h1 className="text-lg m-2 px-7">
                      Longitude : {clickCords[0].toFixed(5)}° E
                    </h1>
                    <h1 className="text-lg m-2 px-7">
                      Latitude : {clickCords[1].toFixed(5)}° N
                    </h1>
                  </div>
                </div>
                <div className="p-4 ml-2">
                  <MapProvider>
                    <Map getLngLat={getCords} />
                  </MapProvider>
                </div>
                <div className="flex ml-2">
                  <div className="m-4 flex bg-blue-500 rounded-lg">
                    <label
                      htmlFor="fileSelector"
                      className="p-6 text-xl text-white  "
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
                    <div className="m-3 pr-1">
                      <FaFileUpload size={50} color="white" />
                    </div>
                  </div>

                  <div className="flex border m-4 border-black w-1/2 rounded-md  shadow-md">
                    <h1 className="m-5 text-lg font-bold text-gray-500">
                      {" "}
                      Fichier à ajouter :{" "}
                    </h1>
                    <h1 className="m-5 text-lg text-blue-800">{files.name}</h1>
                  </div>
                </div>

                <button
                  type="submit"
                  className="m-4 ml-6 p-4 text-3xl bg-green-500 text-white rounded-md"
                >
                  Ajouter
                </button>
              </Form>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}

export default AddProject;

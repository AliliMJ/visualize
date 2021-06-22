import React,{useState} from "react";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import { database } from "../../api/firebase";
import Activity from "./ActivityForm";
import { date } from "yup/lib/locale";

function AddProject(props) {

  const validate = Yup.object({
    name: Yup.string().required("Votre projet doit avoir un nom"),
    description: Yup.string().required(
      "Votre projet doit avoir une description"
    ),
    startDate1: Yup.date().required().max(Yup.ref('endDate1'),"Impossible !"),
    startDate2: Yup.date().required().max(Yup.ref('endDate2'),"Impossible !"),
    startDate3: Yup.date().required().max(Yup.ref('endDate3'),"Impossible !"),
    endDate1: Yup.date().required().min(Yup.ref('startDate1'),"Impossible !"),
    endDate2:  Yup.date().required().min(Yup.ref('startDate2'),"Impossible !"),
    endDate3:  Yup.date().required().min(Yup.ref('startDate3'),"Impossible !"),
  });
  
  const [validationSchema, setValidationSchema] = useState(Yup.object({
    object1: Yup.string().required("Objet requis"),
    quantity1: Yup.number()
      .typeError("doit etre un nombre")
      .required("Quantité requise"),
    importance1: Yup.number()
      .typeError("doit etre un nombre")
      .required("Importance requise"),
    }).concat(validate));

  const [initActivityValues,setInitActivityValues] = useState({
    object11:"",
    quantity11:0,
    importance11:0,
    startDate1:new Date(),
    startDate2:new Date(),
    startDate3:new Date(),
    endDate1:new Date(),
    endDate2:new Date(),
    endDate3:new Date(),
  })

  


  function addProjectToDB({ name, description, budget }) {
    database.projects
      .add({
        name,
        description,
      })
      .then(window.alert("ajouté !"))
      .catch((e) => window.alert(`Erreur ${e}`));
  }

  const  changeValidators = (activityNumber,value)=> {


    let initTemp = {};
    for (let index = 1; index <= value; index++) {
        initTemp[`object${activityNumber}${index}`] = "";
        initTemp[`quantity${activityNumber}${index}`] = 0;
        initTemp[`importance${activityNumber}${index}`] = 0;
    }

    const valSchemaTemp = {};

    for (let index = 1; index <= value; index++) {
      valSchemaTemp[`object${activityNumber}${index}`] = Yup.string().required("Objet requis");
      valSchemaTemp[`quantity${activityNumber}${index}`] =  Yup.number()
        .typeError("doit etre un nombre")
        .required("Quantité requise");
        valSchemaTemp[`importance${activityNumber}${index}`] =Yup.number()
        .typeError("doit etre un nombre")
        .required("Importance requise");
      };  
    
    setInitActivityValues(initTemp);
    setValidationSchema(Yup.object(valSchemaTemp).concat(validate));
    
  }

  return (
    <Formik
      initialValues={initActivityValues}
      validationSchema={validationSchema}
      onSubmit={(values) => addProjectToDB(values)}
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

              <h1 className="text-2xl px-7">Activités</h1>
              <br/>
              {}
              <h1 className="text-xl px-8">1ere activité</h1>
              <Activity activityNumber="1" handleChange={changeValidators}  form={formik} />
              
              <h1 className="text-xl px-8">1ere activité</h1>
              <Activity activityNumber="2" handleChange={changeValidators}  form={formik} />
              
              <h1 className="text-xl px-8">3eme activité</h1>
              <Activity activityNumber="3" handleChange={changeValidators}  form={formik} />

              <button
                className="m-4 p-3 text-white bg-blue-500 rounded-lg"
                type="submit"
              >
                Ajouter
                {/* {console.log(formik.values)} */}
              </button>
              
            </Form>
          </div>
        </>
      )}
    </Formik>
  );
}

export default AddProject;

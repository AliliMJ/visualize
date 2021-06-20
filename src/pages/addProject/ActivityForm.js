import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import TextField from "./TextField";
import * as Yup from 'yup';
import {ErrorMessage} from "formik";

function ActivityForm(props) {

  const [date, setDate] = useState(new Date());
  const [deadLine, setDeadLine] = useState(new Date());
  const [objects, setObjects] = useState(0);
  
  
  

  function changeObjects(value) {
    setObjects(parseInt(value));
    props.handleChange(props.activityNumber,value);
  }

  function displayRows() {
    let rows = Array.apply(null, Array(objects)).map((el, i) => row(props.activityNumber,1+i));
    return <div>{rows}</div>;
  }
  function row(activityNumber,i) {
    return (
      <div className="flex px-5" key={`${activityNumber}${i}`}>
        <TextField label="Nom Objet" name={`object${activityNumber}${i}`} type="text" />
        <TextField label="Quantité" name={`quantity${activityNumber}${i}`} type="text" />
        <TextField label="Importance" name={`importance${activityNumber}${i}`} type="text" />￼
      </div>
    );
  }

  return (
    <>
      <div className="flex px-8 py-8">

        <h1 className="m-2">Date debut</h1>
        <DatePicker  format="dd/MM/yyyy" name={`startDate${props.activityNumber}`} value={date} onChange={(e)=>{props.form.setFieldValue(`startDate${props.activityNumber}`,e);setDate(e)}}/>
        <div className="px-3 text-red-500"><ErrorMessage name={`startDate${props.activityNumber}`}/></div>
        
        <h1 className="m-2">Date Fin</h1>
        <DatePicker format="dd/MM/yyyy"  name={`endDate${props.activityNumber}`} value={deadLine} onChange={(e)=>{props.form.setFieldValue(`endDate${props.activityNumber}`,e);setDeadLine(e)}}  />
        <div className="px-3 text-red-500"><ErrorMessage name={`endDate${props.activityNumber}`}/></div>

        <h1 className="m-2 ml-6 mr-0.5">Élements</h1>
        <select
          className="form-select mx-4 p-1 text-white bg-blue-500 rounded-md focus:outline-none"
          onChange={(e) => changeObjects(e.target.value)}
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>
      <div>{displayRows()}</div>
    </>
  );
}

export default ActivityForm;

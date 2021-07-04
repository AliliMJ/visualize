import React from "react";
import { ErrorMessage, useField } from "formik";

function TextField({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="m-6">
        <input
          className="form-input px-4 py-2 block w-full border border-black rounded-md shadow-md focus:outline-none focus:ring focus:border-blue-300"
          {...field}
          {...props}
          placeholder={label}
        />
      </div>
      <div className="text-red-600 m-4">
        <ErrorMessage name={field.name} />
      </div>
    </>
  );
}

export default TextField;

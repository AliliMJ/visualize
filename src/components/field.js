import { Field as FormikField, useFormikContext } from 'formik';

const Field = ({ name, label, className, ...props }) => {
  const { errors, touched } = useFormikContext();
  return (
    <FormikField
      placeholder={label}
      name={name}
      className={`px-4 py-2 border rounded ${className} ${
        errors[name] && touched[name] ? 'border-red-700' : 'border-gray-300'
      }`}
      {...props}
    />
  );
};

export default Field;

/* <Field
    placeholder={label}
    name={name}
    className={`border-gray-300 px-4 py-2 border rounded ${className}`}
    {...props}
  /> */

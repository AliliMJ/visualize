import { useField, useFormikContext } from 'formik';

const TextArea = ({ className, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field] = useField(props);
  const { errors } = useFormikContext();
  return (
    <>
      <textarea
        className={`px-4 py-2 border rounded ${className} ${
          errors[props.name] ? 'border-red-700' : 'border-gray-300'
        }`}
        {...field}
        {...props}
      />
    </>
  );
};

export default TextArea;

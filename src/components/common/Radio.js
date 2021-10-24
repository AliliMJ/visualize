import { useField } from 'formik';

const Radio = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'radio' });
  return (
    <label>
      <input type="radio" {...field} {...props} className="hidden" />
      <div
        className={`inline-block  h-full shadow-lg rounded overflow-hidden ${
          field.checked ? 'border-4 border-green-300 ' : 'border-4'
        }`}
      >
        {children}
      </div>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </label>
  );
};

export default Radio;

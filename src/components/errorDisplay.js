import { useFormikContext } from 'formik';

const ErrorDisplay = () => {
  const { errors, touched } = useFormikContext();

  const messages = () => {
    //return [key, value] array of errors that need to be displayed.
    return Object.entries(errors).filter(([key]) => touched[key] != undefined);
  };
  return (
    <div className="bg-red-200 text-red-700 rounded">
      {messages().map(([key, value]) => (
        <div className="py-1 px-2" key={key}>
          - {value}
        </div>
      ))}
    </div>
  );
};

export default ErrorDisplay;

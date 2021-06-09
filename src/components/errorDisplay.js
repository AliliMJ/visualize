import { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
const ErrorDisplay = () => {
  const { errors, touched } = useFormikContext();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    let m = [];
    for (let key in errors) {
      if (touched[key]) m = [...m, errors[key]];
    }
    setMessages(m);
    return () => setMessages([]);
  }, [errors, touched]);
  return (
    messages.length > 0 && (
      <div className="p-3 bg-red-200 text-red-700 rounded">
        {messages.map((message) => (
          <div>- {message}</div>
        ))}
      </div>
    )
  );
};

export default ErrorDisplay;

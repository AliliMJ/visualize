import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ErrorDisplay from '../components/errorDisplay';

import TextArea from '../components/textArea';
const supportSchema = Yup.object().shape({
  message: Yup.string()
    .required('Vous devez ecrire quelque chose.')
    .max(10, "Taille maximale d'un message est 255 characteres."),
});
const Support = () => {
  const sendMessage = (data) => {
    console.log(data.message);
  };
  return (
    <div>
      <h1>Reporter un probléme</h1>
      <Formik
        initialValues={{ message: '' }}
        onSubmit={sendMessage}
        validationSchema={supportSchema}
      >
        <Form>
          <ErrorDisplay />
          <TextArea name="message" placeholder="Massage" />
          <button type="submit">Send</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Support;

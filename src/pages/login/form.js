import { Link } from 'react-router-dom';
import { Form } from 'formik';

import Field from '../../components/field';
import ErrorDisplay from '../../components/errorDisplay';
import Separator from './separator';

const LoginForm = () => {
  return (
    <Form className="flex flex-col  w-full space-y-4">
      <ErrorDisplay />
      <Field name="email" label="Adresse email" />

      <Field name="password" label="Mot de passe" type="password" />

      <button
        type="submit"
        className="rounded py-2 font-bold bg-blue-500 text-white w-full"
      >
        S'identifier
      </button>

      <Separator />

      <Link
        to="/register"
        className="rounded py-2 font-bold bg-transparent text-center text-blue-500 border-2 border-blue-500 w-full"
      >
        S'inscrire
      </Link>
    </Form>
  );
};

export default LoginForm;

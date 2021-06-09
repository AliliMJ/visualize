import { Form } from 'formik';
import Field from '../../components/field';
import ErrorDisplay from '../../components/errorDisplay';
import RoleChoise from './roleChoise';
import Footer from './footer';

const RegisterForm = () => {
  return (
    <Form className="grid grid-cols-1 gap-4 w-full">
      <ErrorDisplay />
      <Field name="firstName" label="Nom" />

      <Field name="lastName" label="Prénom" />
      <Field
        name="email"
        label="Adresse email"
        className="col-span-full"
        type="email"
      />
      <Field name="password" label="Mot de passe" type="password" />
      <Field
        name="verifyPassword"
        label="Confirmer votre mot de passe"
        type="password"
      />

      <div className="font-bold col-span-full">Choisissez votre rôle :</div>
      <RoleChoise />
      <button
        type="submit"
        className="rounded py-2 font-bold bg-blue-500 text-white col-span-full"
      >
        S'inscrire
      </button>
      <Footer />
    </Form>
  );
};

export default RegisterForm;

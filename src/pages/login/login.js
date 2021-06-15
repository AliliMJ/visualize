import logo from '../../svg/logo.svg';

import { Formik } from 'formik';

import { useState } from 'react';
import { useAuth } from '../../hook/useAuth';
import { useHistory, Link } from 'react-router-dom';
import Dialog from '../../components/common/diag';
import loginSchema from './loginSchema';
import LoginForm from './form';

const Login = () => {
  const [dialogHidden, setDialogHidden] = useState(true);
  const history = useHistory();
  const { login } = useAuth();
  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);

      history.push('/dashboard');
    } catch (e) {
      setDialogHidden(false);
    }
  };
  return (
    <div className="flex items-center justify-center py-10">
      {!dialogHidden && (
        <Dialog
          action={() => setDialogHidden(true)}
          title="Connexion échouée"
          message="Votre email / mot de passe est invalide. "
        />
      )}
      <div className="md:border flex flex-col rounded md:shadow-lg w-96 md:w-1/2 overflow-hidden p-6 space-y-10 items-center">
        <Link to="/">
          <img src={logo} alt="logo de visualize" className="w-20" />
        </Link>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          <LoginForm />
        </Formik>
      </div>
    </div>
  );
};

export default Login;

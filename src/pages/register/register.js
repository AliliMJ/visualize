import React from 'react';

import logo from '../../svg/logo.svg';
import registerSchema from './registerSchema';
import RegisterForm from './registerForm';
import { useAuth } from '../../hook/useAuth';
import { database } from '../../api/firebase';

import { Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
    const initialValues = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        verifyPassword: '',
        role: 'collecteur',
    };
    const history = useHistory();

    const { signup } = useAuth();

    const onSubmit = async (data) => {
        //after validation

        try {
            const { user } = await signup(data.email, data.password);
            const { firstName, lastName, email, role } = data;

            await database.users.doc(user.uid).set({
                firstName,
                lastName,
                email,
                role,
            });

            history.push('/dashboard');
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div className="flex items-center justify-center py-10">
            <div className="md:border flex flex-col rounded md:shadow-lg max-w-xl overflow-hidden p-6 space-y-10 items-center">
                <Link to="/">
                    <img src={logo} alt="Logo de visualize" className="w-20" />
                </Link>

                <div className="text-2xl md:text-3xl font-bold">
                    Création de votre compte
                </div>

                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={registerSchema}
                >
                    <RegisterForm />
                </Formik>
            </div>
        </div>
    );
};

export default Register;

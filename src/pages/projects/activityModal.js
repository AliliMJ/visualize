import { FaPlus } from 'react-icons/fa';

import { Form, Formik } from 'formik';
import Field from '../../components/field';

const ActivityModal = ({ emit }) => {
    const init = { name: '', date: '', delai: 0, budget: 0 };
    const onAdd = (data) => {
        emit({ response: true, value: data });
    };
    const onAbort = () => {
        emit({ response: false });
    };
    return (
        <Formik initialValues={init} onSubmit={onAdd}>
            <Form>
                <div
                    className="fixed z-10 inset-0 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                        ></div>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center w-full sm:mt-0  sm:text-left">
                                        <div className="flex items-center space-x-3">
                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <FaPlus />
                                            </div>
                                            <h3
                                                className="text-lg leading-6 font-medium text-gray-900"
                                                id="modal-title"
                                            >
                                                Ajouter une activitée
                                            </h3>
                                        </div>

                                        <div className="mt-2 flex flex-col space-y-3 text-gray-600">
                                            <label htmlFor="name">Nom</label>
                                            <Field name="name" />

                                            <label htmlFor="date">
                                                Date début
                                            </label>
                                            <Field name="date" type="date" />
                                            <label htmlFor="delai">
                                                Délai ( En jours )
                                            </label>
                                            <Field name="delai" type="number" />
                                            <label htmlFor="delai">
                                                Budget ( En DZD )
                                            </label>
                                            <Field
                                                name="budget"
                                                type="number"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-green-700 shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Ajouter
                                </button>
                                <button
                                    type="button"
                                    onClick={onAbort}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-400 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default ActivityModal;

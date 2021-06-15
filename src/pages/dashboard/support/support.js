import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ErrorDisplay from '../../../components/errorDisplay';
import { MdReportProblem } from 'react-icons/md';
import { FiSend } from 'react-icons/fi';
import { FaInfoCircle } from 'react-icons/fa';
import TextArea from '../../../components/textArea';

const supportSchema = Yup.object().shape({
    message: Yup.string()
        .required('Vous devez ecrire quelque chose.')
        .max(
            10,
            "La taille d'un message ne doit pas dépasser 255 characteres."
        ),
});
const Support = () => {
    const sendMessage = (data) => {
        console.log(data.message);
    };
    return (
        <div className="flex flex-col space-y-6">
            <div className="space-y-3">
                <div className="flex items-center space-x-6">
                    <h1 className="text-3xl">Signaler un probléme</h1>
                    <MdReportProblem size="2rem" />
                </div>
                <hr />
            </div>
            <div className="flex items-center space-x-2 p-2 bg-blue-100 rounded  ">
                <FaInfoCircle size="1rem" className="flex-shrink-0" />
                <div className="border-l border-blue-200 px-2">
                    Votre message sera envoyé à l'équipe de travail, vous aurez
                    un retour dés que votre probléme soit résolu.
                </div>
            </div>
            <div className="flex justify-center">
                <Formik
                    initialValues={{ message: '' }}
                    onSubmit={sendMessage}
                    validationSchema={supportSchema}
                >
                    <Form className="flex flex-col  w-full md:max-w-xl space-y-3 ">
                        <div className="text-gray-500">
                            Écrivez un message descriptif où vous montienez
                            votre probléme briévement :
                        </div>

                        <ErrorDisplay />
                        <TextArea
                            className="resize-none w-full h-40"
                            name="message"
                            placeholder="Ecrire quelque chose"
                        />
                        <div className="flex space-x-2">
                            <button
                                className="bg-blue-400 text-white font-bold px-3 py-1 rounded"
                                type="submit"
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Envoyer</span>
                                    <FiSend />
                                </div>
                            </button>
                            <button
                                type="button"
                                className="bg-white text-black font-bold rounded border  px-3 py-1"
                            >
                                Annuler
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Support;

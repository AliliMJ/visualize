import * as Yup from 'yup';
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Adresse email est invalide.'),
});

export default loginSchema;

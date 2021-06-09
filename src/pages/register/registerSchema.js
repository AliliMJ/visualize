import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required('Le champ "Nom" est obligatoire.'),
  lastName: Yup.string().required('Le champ "Prénom" est obligatoire.'),
  email: Yup.string()
    .email('Adresse email est invalide.')
    .required('Le champ "Adresse email" est obligatoire.'),
  password: Yup.string()
    .min(6, 'Le mot de passe doit dépasser 6 charactéres.')
    .required('Le champ "Mot de passe" est obligatoire.'),
  verifyPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Les deux champs de mot de passe doivent être égaux.'
    )
    .required('Le champ de confirmation est obligatoire.'),
});

export default registerSchema;

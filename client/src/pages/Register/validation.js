import * as Yup from 'yup';

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .required('Илтимос маълумот киритинг'),
  username: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .matches(/^[a-zA-Z0-9_]+$/, 'Invalid characters in username')
    .required('Илтимос маълумот киритинг'),
  email: Yup.string().email('Invalid email address').required('Илтимос маълумот киритинг'),
  password: Yup.string()
    .min(6, 'Must be 6 characters at minimum')
    .required('Илтимос маълумот киритинг'),
});

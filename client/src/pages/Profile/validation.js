import * as Yup from 'yup';

export const profileSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .required(),
  username: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .matches(/^[a-zA-Z0-9_]+$/, 'Invalid characters in username')
    .required(),
  password: Yup.string()
    .min(6, 'Must be 6 characters at minimum')
});

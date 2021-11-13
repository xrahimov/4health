import * as Yup from 'yup';

export const patientSchema = Yup.object({
  lastname: Yup.string().min(2, 'Камида 2 та ҳарф киритинг').required('Илтимос маълумот киритинг'),
  firstname: Yup.string().min(2, 'Камида 2 та ҳарф киритинг').required('Илтимос маълумот киритинг'),
  fathername: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .required('Илтимос маълумот киритинг'),
  phonenumber: Yup.string()
    .matches(/^[0-9]+$/, 'Телефон рақамни тўғри киритинг: 931234567')
    .min(9, 'Телефон рақамни тўғри киритинг: 931234567')
    .max(9, 'Телефон рақамни тўғри киритинг: 931234567')
    .required('Илтимос маълумот киритинг'),
});

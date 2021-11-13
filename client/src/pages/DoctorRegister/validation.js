import * as Yup from 'yup';

export const doctorSchema = Yup.object({
  lastname: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .max(30, '30 ҳарфдан кам бўлиши керак')
    .required('Илтимос маълумот киритинг'),
  firstname: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .max(30, '30 ҳарфдан кам бўлиши керак')
    .required('Илтимос маълумот киритинг'),
  fathername: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .max(30, '30 ҳарфдан кам бўлиши керак')
    .required('Илтимос маълумот киритинг'),
  phonenumber: Yup.string()
    .matches(/^[0-9]+$/, 'Телефон рақамни тўғри киритинг: 931234567')
    .min(9, 'Телефон рақамни тўғри киритинг: 931234567')
    .max(9, 'Телефон рақамни тўғри киритинг: 931234567')
    .required('Илтимос маълумот киритинг'),
});

export const specSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .max(30, '30 ҳарфдан кам бўлиши керак')
    .required('Илтимос маълумот киритинг'),
  description: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .max(300, 'Must be 300 characters or less')
    .required('Илтимос маълумот киритинг'),
});

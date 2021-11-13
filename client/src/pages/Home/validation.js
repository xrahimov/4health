import * as Yup from 'yup';

export const serviceSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .required('Илтимос маълумот киритинг'),
  norm: Yup.string(),
  edizm: Yup.string(),
});

export const serviceTypeSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .required('Илтимос маълумот киритинг'),
  description: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .required('Илтимос маълумот киритинг'),
});

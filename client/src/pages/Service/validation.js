import * as Yup from 'yup';

export const appointmentSchema = Yup.object({
  // doctor: Yup.string(),
  patient: Yup.string(),
  service: Yup.string(),
  servicetype: Yup.string(),
});

export const serviceTypeSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .required('Илтимос маълумот киритинг'),
  description: Yup.string()
    .min(2, 'Камида 2 та ҳарф киритинг')
    .required('Илтимос маълумот киритинг'),
});

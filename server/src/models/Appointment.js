import mongoose from 'mongoose';
import Joi from 'joi';
import { patientSchema } from './Patient.js';
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    patient: patientSchema,
    services: [{ type: Object }],
    uzis: [{ type: Object }],
    uzidoctor: { type: Object, default: {} },
    price: {
      type: Number,
      default: 0,
    },
    isfinished: {
      type: Boolean,
      default: false,
    },
    ispaid: {
      type: Boolean,
      default: false,
    },
    appointmenttype: [
      {
        type: String,
        required: true,
      },
    ],
    searchfield: {
      type: String,
      required: true,
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const validateAppointment = (patient) => {
  const schema = Joi.object({
    patient: Joi.object(),
    services: Joi.object(),
    uzidoctor: Joi.object(),
    price: Joi.number(),
    isfinished: Joi.boolean(),
    ispaid: Joi.boolean(),
    appointments: Joi.array(),
    uzis: Joi.object(),
    searchfield: Joi.string(),
    appointmenttype: Joi.string(),
  });

  return schema.validate(patient);
};

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;

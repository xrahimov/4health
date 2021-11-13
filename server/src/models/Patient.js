import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

export const patientSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    fathername: {
      type: String,
      required: true
    },
    birthday: {
      type: Date,
      required: true
    },
    phonenumber: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    appointments: [{
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      default: []
    }],
    isdeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
);

export const validatePatient = (patient) => {
  const schema = Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    fathername: Joi.string().min(2).required(),
    birthday: Joi.string().required(),
    phonenumber: Joi.number().required(),
    gender: Joi.string().required(),
    appointments: Joi.array(),
  });
  return schema.validate(patient);
};

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;

import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const doctorSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    fathername: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    eid: {
      type: Number,
      required: true,
      unique: true,
    },
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        default: [],
      },
    ],
    uziparents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'UziParent',
        default: [],
      },
    ],
    image: {
      type: String,
      default: '',
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const validateDoctor = (patient) => {
  const schema = Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    fathername: Joi.string().min(2).max(50).required(),
    birthday: Joi.string().required(),
    phonenumber: Joi.number().required(),
    image: Joi.string(),
    gender: Joi.string().max(1).required(),
    appointments: Joi.array(),
    uziparents: Joi.array(),
  });

  return schema.validate(patient);
};

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;

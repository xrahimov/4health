import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const specializationSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isdeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
);

export const validateSpecialization = (specialization) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(300).required(),
  });
  return schema.validate(specialization);
};

const Specialization = mongoose.model('Specialization', specializationSchema);

export default Specialization;

import mongoose from 'mongoose';
import Joi from 'joi';
import { serviceTypeSchema } from './ServiceType.js';
const { Schema } = mongoose;

export const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    norm: {
      type: String,
      required: true,
      default: '',
    },
    edizm: {
      type: String,
      required: true,
      default: '',
    },
    price: {
      type: Number,
      required: true,
    },
    servicetype: serviceTypeSchema,
    result: {
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

export const validateService = (service) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    price: Joi.number().required(),
    servicetype: Joi.object().required(),
    norm: Joi.string(),
    result: Joi.string(),
    edizm: Joi.string(),
  });
  return schema.validate(service);
};

const Service = mongoose.model('Service', serviceSchema);

export default Service;

import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

export const serviceTypeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const validateServiceType = (service) => {
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    price: Joi.number(),
  });
  return schema.validate(service);
};

const ServiceType = mongoose.model('ServiceType', serviceTypeSchema);

export default ServiceType;

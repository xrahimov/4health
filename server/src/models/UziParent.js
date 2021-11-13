import mongoose from 'mongoose';
import Joi from 'joi';

const { Schema } = mongoose;

const uziParentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    uzichilds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UziChild', default: [] }],
    description: {
      type: String,
      required: true,
    },
    vrach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const validateUziParent = (service) => {
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    uzichilds: Joi.object(),
    vrach: Joi.string().min(2).required(),
  });

  return schema.validate(service);
};

const UziParent = mongoose.model('UziParent', uziParentSchema);

export default UziParent;

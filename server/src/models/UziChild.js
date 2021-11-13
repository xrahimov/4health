import mongoose from 'mongoose';
import Joi from 'joi';

const { Schema } = mongoose;

export const uziChildSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
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
    content: {
      type: String,
      default: '',
    },
    uziparent: { type: mongoose.Schema.Types.ObjectId, ref: 'UziParent' },
    result: {
      type: String,
      default: '',
    },
    pageloc: {
      type: Number,
      required: true,
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const validateUziChild = (service) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    uziparent: Joi.string().required(),
    norm: Joi.string(),
    result: Joi.string(),
    content: Joi.string(),
    edizm: Joi.string(),
    pageloc: Joi.number(),
  });

  return schema.validate(service);
};

const UziChild = mongoose.model('UziChild', uziChildSchema);

export default UziChild;

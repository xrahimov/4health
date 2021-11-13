import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const labResultSchema = new Schema(
  {
    servicetype: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType' }, 
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    result: {
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

export const validateLabResult = (message) => {
  const schema = Joi.object({
    servicetype: Joi.string().required(),
    service: Joi.string().required(),
    patient: Joi.string().required(),
    result: Joi.string().required(),
  });
  return schema.validate(message);
};

const LabResult = mongoose.model('LabResult', labResultSchema);

export default LabResult;

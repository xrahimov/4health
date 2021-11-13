import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const eidSchema = new Schema(
  {
    eid: {
      type: Number,
      default: 100
    },
    isdeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
);

export const validateEid = (eid) => {
  const schema = Joi.object({
    eid: Joi.number().greater(100).required(),
  });
  return schema.validate(eid);
};

const Eid = mongoose.model('Eid', eidSchema);

export default Eid;

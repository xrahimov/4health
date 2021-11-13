import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isdeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
);

export const validateMessage = (message) => {
  const schema = Joi.object({
    text: Joi.string().min(5).max(300).required(),
  });
  return schema.validate(message);
};

const Message = mongoose.model('Message', messageSchema);

export default Message;

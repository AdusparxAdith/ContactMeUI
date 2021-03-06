const mongoose = require('mongoose');

const { Schema } = mongoose;
const { validateEmail } = require('../utils/validateEmail');

const FormSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Please enter a name',
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: 'Please enter an email address',
      validate: [validateEmail, 'Please enter a valid email address']
    },
    message: {
      type: String,
      required: 'Please include a message',
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { collection: 'forms', versionKey: false }
);

const Forms = mongoose.model('forms', FormSchema);

module.exports = {
  Forms
};

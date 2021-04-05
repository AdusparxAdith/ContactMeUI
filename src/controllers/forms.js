const { Forms } = require('../models/forms');
const { parse } = require('json2csv');

const getForms = async (_, res) => {
  try {
    const forms = await Forms.find({}).select({ _id: 0 }).lean();

    res.status(200).send(forms);
  } catch (error) {
    res
      .status(500)
      .send({
        message: 'Something went wrong, please try again',
        error: error.message
      });
  }
};

const saveForm = async (req, res) => {
  try {
    const { name = null, message = null, email = null } = req.body;
    const form = new Forms({
      name,
      message,
      email
    });

    const document = await form.save();

    res.status(201).send(document);
  } catch (error) {
    if (error.message.includes('validation'))
      return res.status(400).send({ message: error.message.toUpperCase() });

    res.status(500).send({
      message: 'Something went wrong, please try again',
      error: error.message
    });
  }
};

const getFormsCSV = async (_, res) => {
  try {
    const data = await Forms.find({}).select({ _id: 0 }).lean();

    const fields = [
      {
        label: 'Name',
        value: 'name'
      },
      {
        label: 'Email',
        value: 'email'
      },
      {
        label: 'Date',
        value: (row) => row['date'].toLocaleString()
      },
      {
        label: 'Message',
        value: 'message'
      }
    ];

    const csv = parse(data, {
      fields
    });

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).send({
      message: 'Something went wrong, please try again',
      error: error.message
    });
  }
};

module.exports = { getForms, saveForm, getFormsCSV };

const express = require('express');
const { saveForm, getForms, getFormsCSV } = require('../controllers/forms');
const router = express.Router();

router.get('/', getForms);

router.get('/csv', getFormsCSV);

router.post('/', saveForm);

module.exports = router;

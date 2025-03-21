const express = require('express');
const { validateReceipt } = require('../controllers/validateController');

const router = express.Router();
router.post('/validate', validateReceipt);

module.exports = router;

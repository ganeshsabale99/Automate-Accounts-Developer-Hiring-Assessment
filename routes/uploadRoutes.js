const express = require('express');
const { uploadReceipt } = require('../controllers/uploadController');

const router = express.Router();
router.post('/upload', uploadReceipt);

module.exports = router;

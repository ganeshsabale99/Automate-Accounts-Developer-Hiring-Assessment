const express = require('express');
const { processReceipt } = require('../controllers/processController');

const router = express.Router();
router.post('/process', processReceipt);

module.exports = router;

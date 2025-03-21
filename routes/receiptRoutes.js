const express = require('express');
const { getAllReceipts, getReceiptById } = require('../controllers/receiptController');

const router = express.Router();
router.get('/receipts', getAllReceipts);
router.get('/receipts/:id', getReceiptById);

module.exports = router;

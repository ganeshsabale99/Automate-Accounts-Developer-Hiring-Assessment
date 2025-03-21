const express = require("express");
const router = express.Router();
const { deleteReceipt } = require("../controllers/deleteController");

router.delete("/:fileId", deleteReceipt);

module.exports = router;

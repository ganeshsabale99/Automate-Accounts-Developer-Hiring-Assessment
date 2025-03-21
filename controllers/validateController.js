const fs = require("fs");
const db = require("../db");

exports.validateReceipt = (req, res) => {
  const { fileId } = req.body;

  db.get(`SELECT * FROM receipt_file WHERE id = ?`, [fileId], (err, file) => {
    if (err || !file) return res.status(404).json({ error: "File not found" });

    const filePath = file.file_path;

    if (!fs.existsSync(filePath)) {
      db.run(
        `UPDATE receipt_file SET is_valid = 0, invalid_reason = ? WHERE id = ?`,
        ["File does not exist", fileId]
      );
      return res.status(400).json({ error: "File does not exist" });
    }

    const isValidPDF = filePath.endsWith(".pdf");
    const invalidReason = isValidPDF ? null : "Not a valid PDF file";

    db.run(
      `UPDATE receipt_file SET is_valid = ?, invalid_reason = ? WHERE id = ?`,
      [isValidPDF ? 1 : 0, invalidReason, fileId],
      (updateErr) => {
        if (updateErr)
          return res.status(500).json({ error: updateErr.message });

        res.status(200).json({
          message: isValidPDF
            ? "File is a valid PDF"
            : "File validation failed",
          fileId,
          isValid: isValidPDF,
        });
      }
    );
  });
};

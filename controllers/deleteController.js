const fs = require("fs");
const db = require("../db");

exports.deleteReceipt = (req, res) => {
  const { fileId } = req.params;

  db.get(`SELECT * FROM receipt_file WHERE id = ?`, [fileId], (err, file) => {
    if (err || !file) {
      return res.status(404).json({ error: "File not found" });
    }

    const filePath = file.file_path;

    fs.unlink(filePath, (err) => {
      if (err) console.log("File not found or already deleted:", filePath);

      db.run(`DELETE FROM receipt WHERE file_path = ?`, [filePath], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        db.run(`DELETE FROM receipt_file WHERE id = ?`, [fileId], (err) => {
          if (err) return res.status(500).json({ error: err.message });

          res.status(200).json({ message: "Receipt deleted successfully" });
        });
      });
    });
  });
};

const multer = require("multer");
const db = require("../db");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
}).single("receipt");

exports.uploadReceipt = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const { filename, path: filePath } = req.file;

    db.get(
      `SELECT * FROM receipt_file WHERE file_name = ?`,
      [filename],
      (err, existingFile) => {
        if (err) return res.status(500).json({ error: err.message });

        if (existingFile) {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr)
              console.error("Error deleting duplicate file:", unlinkErr);
          });

          return res.status(400).json({ error: "Receipt already uploaded!" });
        }

        db.run(
          `INSERT INTO receipt_file (file_name, file_path, is_valid, is_processed, created_at) VALUES (?, ?, ?, ?, datetime('now'))`,
          [filename, filePath, 1, 0],
          function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({
              message: "File uploaded successfully",
              fileId: this.lastID,
            });
          }
        );
      }
    );
  });
};

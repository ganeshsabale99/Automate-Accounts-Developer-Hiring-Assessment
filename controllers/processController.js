const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const Tesseract = require("tesseract.js");
const db = require("../db");

const pdfToImage = async (pdfPath, outputImagePath) => {
  return new Promise((resolve, reject) => {
    const command = `pdftoppm -png -singlefile "${pdfPath}" "${outputImagePath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) return reject(`Error converting PDF to image: ${stderr}`);
      resolve(outputImagePath + ".png");
    });
  });
};

exports.processReceipt = async (req, res) => {
  const { fileId } = req.body;

  db.get(
    `SELECT * FROM receipt_file WHERE id = ?`,
    [fileId],
    async (err, file) => {
      if (err || !file)
        return res.status(404).json({ error: "File not found" });

      const pdfPath = file.file_path;
      const outputImagePath = path.join(__dirname, "../uploads/receipt_image");

      try {
        const imagePath = await pdfToImage(pdfPath, outputImagePath);

        const { data } = await Tesseract.recognize(imagePath, "eng");
        const text = data.text;

        console.log("Extracted Text:", text);

        const merchantName =
          text.match(/(THE VENETIAN|THE PALAZZO|Las Vegas)/i)?.[0] || "Unknown";

        const purchasedAt = text.match(/\d{2}\/\d{2}\/\d{4}/)?.[0] || null;

        const amountMatches = text.match(/\d{1,3}(?:,\d{3})*\.\d{2}/g) || [];

        console.log("Extracted Amounts:", amountMatches);

        let totalAmount = 0;

        if (amountMatches.length > 0) {
          totalAmount = Math.max(
            ...amountMatches.map((amount) =>
              parseFloat(amount.replace(/,/g, ""))
            )
          );
        }

        console.log("Final Total Amount:", totalAmount);

        db.run(
          `INSERT INTO receipt (purchased_at, merchant_name, total_amount, file_path) VALUES (?, ?, ?, ?)`,
          [purchasedAt, merchantName, totalAmount, pdfPath],
          function (err) {
            if (err) return res.status(500).json({ error: err.message });

            db.run(`UPDATE receipt_file SET is_processed = 1 WHERE id = ?`, [
              fileId,
            ]);
            res.status(201).json({
              message: "Receipt processed successfully",
              receiptId: this.lastID,
              totalAmount: totalAmount,
            });
          }
        );
      } catch (error) {
        res.status(500).json({ error: "Error processing receipt: " + error });
      }
    }
  );
};

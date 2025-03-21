const db = require('../db');

exports.getAllReceipts = (req, res) => {
    db.all(`SELECT * FROM receipt`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

exports.getReceiptById = (req, res) => {
    const { id } = req.params;

    db.get(`SELECT * FROM receipt WHERE id = ?`, [id], (err, row) => {
        if (err || !row) return res.status(404).json({ error: 'Receipt not found' });
        res.status(200).json(row);
    });
};

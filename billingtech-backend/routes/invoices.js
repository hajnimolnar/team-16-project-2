const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM invoices', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM invoices WHERE invoice_id = ?', [id], (err, invoice) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    db.all('SELECT * FROM line_items WHERE invoice_id = ?', [id], (err, items) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ ...invoice, line_items: items });
    });
  });
});

module.exports = router;

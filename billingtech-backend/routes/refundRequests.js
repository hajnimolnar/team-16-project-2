const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { invoice_id, user_id, request_description } = req.body;

  if (!invoice_id || !user_id || !request_description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(
    `INSERT INTO refund_requests (invoice_id, user_id, request_description, status) VALUES (?, ?, ?, ?)`,
    [invoice_id, user_id, request_description, 'Pending'],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        refund_request_id: this.lastID,
        invoice_id,
        user_id,
        request_description,
        status: 'Pending',
        created_at: new Date().toISOString(),
      });
    }
  );
});

module.exports = router;

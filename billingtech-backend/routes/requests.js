const express = require('express');
const router = express.Router();
const db = require('../db');
const simulateGenAI = require('../genai/mockGenAI');

router.post('/', (req, res) => {
  const { user_id, invoice_id, description } = req.body;
  const aiResponse = simulateGenAI(description);

  if (aiResponse.type === 'change') {
    db.run(
      `INSERT INTO change_requests (line_item_id, user_id, request_description, status) VALUES (?, ?, ?, ?)`,
      [1, user_id, aiResponse.request_description, aiResponse.status],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ change_request_id: this.lastID, ...aiResponse });
      }
    );
  } else if (aiResponse.type === 'refund') {
    db.run(
      `INSERT INTO refund_requests (invoice_id, user_id, request_description, status) VALUES (?, ?, ?, ?)`,
      [invoice_id, user_id, aiResponse.request_description, aiResponse.status],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ refund_request_id: this.lastID, ...aiResponse });
      }
    );
  }
});

module.exports = router;

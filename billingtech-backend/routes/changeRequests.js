const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { line_item_id, user_id, request_description } = req.body;

  if (!line_item_id || !user_id || !request_description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(
    `INSERT INTO change_requests (line_item_id, user_id, request_description, status) VALUES (?, ?, ?, ?)`,
    [line_item_id, user_id, request_description, 'Pending'],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        change_request_id: this.lastID,
        line_item_id,
        user_id,
        request_description,
        status: 'Pending',
        created_at: new Date().toISOString(),
      });
    }
  );
});

module.exports = router;

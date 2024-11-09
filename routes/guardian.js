const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all guardians
router.get('/', (req, res) => {
  const query = 'SELECT * FROM guardian';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data from database');
      return;
    }
    res.render('guardian', { guardians: results });
  });
});

// GET Create Guardian page
router.get('/create', (req, res) => {
  res.render('create-guardian');
});

// POST Create Guardian
router.post('/create', (req, res) => {
  const { id, first_name, last_name, email, phone_number } = req.body;
  const sql = `INSERT INTO guardian (id, first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [id, first_name, last_name, email, phone_number], (err, result) => {
    if (err) throw err;
    res.redirect('/guardian');
  });
});

// GET Update Guardian page
router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM guardian WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('update-guardian', { guardian: result[0] });
    } else {
      res.redirect('/guardian');
    }
  });
});

// POST Update Guardian
router.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone_number } = req.body;
  const sql = 'UPDATE guardian SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE id = ?';
  
  db.query(sql, [first_name, last_name, email, phone_number, id], (err, result) => {
    if (err) throw err;
    res.redirect('/guardian');
  });
});

// GET Delete Guardian confirmation page
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM guardian WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('delete-guardian', { guardian: result[0] });
    } else {
      res.redirect('/guardian');
    }
  });
});

// POST Delete Guardian
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM guardian WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/guardian');
  });
});

module.exports = router;
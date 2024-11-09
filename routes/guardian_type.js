const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust the path to your actual database configuration

// READ: Get all guardian types
router.get('/', (req, res) => {
  const query = 'SELECT * FROM guardian_type';
  
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching data from database');
      return;
    }
    res.render('guardian_type', { guardianTypes: results });
  });
});

// GET Create Guardian Type page
router.get('/create', (req, res) => {
  res.render('create-guardian_type');
});

// POST Create Guardian Type
router.post('/create', (req, res) => {
  const { id, name } = req.body;
  const query = 'INSERT INTO guardian_type (id, name) VALUES (?, ?)';
  
  db.query(query, [id, name], (err, result) => {
    if (err) throw err;
    res.redirect('/guardian_type');
  });
});

// GET Update Guardian Type page
router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM guardian_type WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('update-guardian_type', { guardianType: result[0] });
    } else {
      res.redirect('/guardian_type');
    }
  });
});

// POST Update Guardian Type
router.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const query = 'UPDATE guardian_type SET name = ? WHERE id = ?';
  
  db.query(query, [name, id], (err, result) => {
    if (err) throw err;
    res.redirect('/guardian_type');
  });
});

// GET Delete Guardian Type confirmation page
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM guardian_type WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('delete-guardian_type', { guardianType: result[0] });
    } else {
      res.redirect('/guardian_type');
    }
  });
});

// POST Delete Guardian Type
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM guardian_type WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/guardian_type');
  });
});

module.exports = router;
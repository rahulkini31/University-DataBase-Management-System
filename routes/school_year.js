const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all school years
router.get('/', (req, res) => {
  const query = 'SELECT * FROM school_year';
  
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching data from database');
      return;
    }
    res.render('school_year', { school_years: results });
  });
});

// GET Create School Year page
router.get('/create', (req, res) => {
  res.render('create-school_year');
});

// POST Create School Year
router.post('/create', (req, res) => {
  const { id, year_name, start_year, end_year } = req.body;
  const sql = `INSERT INTO school_year (id, year_name, start_year, end_year) VALUES (?, ?, ?, ?)`;

  db.query(sql, [id, year_name, start_year, end_year], (err, result) => {
    if (err) throw err;
    res.redirect('/school_year');
  });
});

// GET Update School Year page
router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM school_year WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('update-school_year', { school_year: result[0] });
    } else {
      res.redirect('/school_year');
    }
  });
});

// POST Update School Year
router.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { year_name, start_year, end_year } = req.body;
  const sql = 'UPDATE school_year SET year_name = ?, start_year = ?, end_year = ? WHERE id = ?';
  db.query(sql, [year_name, start_year, end_year, id], (err, result) => {
    if (err) throw err;
    res.redirect('/school_year');
  });
});

// GET Delete School Year confirmation page
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM school_year WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('delete-school_year', { school_year: result[0] });
    } else {
      res.redirect('/school_year');
    }
  });
});

// POST Delete School Year
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM school_year WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/school_year');
  });
});

module.exports = router;
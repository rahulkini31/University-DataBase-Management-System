const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all teachers
router.get('/', (req, res) => {
  const query = 'SELECT * FROM teacher';
  
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching data from database');
      return;
    }
    res.render('teacher', { teachers: results });
  });
});

// GET Create Teacher page
router.get('/create', (req, res) => {
  res.render('create-teacher');
});

// POST Create Teacher
router.post('/create', (req, res) => {
  const { id, first_name, last_name, gender, email, phone_number } = req.body;
  const sql = `INSERT INTO teacher (id, first_name, last_name, gender, email, phone_number) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [id, first_name, last_name, gender, email, phone_number], (err, result) => {
    if (err) throw err;
    res.redirect('/teacher');
  });
});

// GET Update Teacher page
router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM teacher WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('update-teacher', { teacher: result[0] });
    } else {
      res.redirect('/teacher');
    }
  });
});

// POST Update Teacher
router.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, gender, email, phone_number } = req.body;
  const sql = 'UPDATE teacher SET first_name = ?, last_name = ?, gender = ?, email = ?, phone_number = ? WHERE id = ?';

  db.query(sql, [first_name, last_name, gender, email, phone_number, id], (err, result) => {
    if (err) throw err;
    res.redirect('/teacher');
  });
});

// GET Delete Teacher confirmation page
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM teacher WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('delete-teacher', { teacher: result[0] });
    } else {
      res.redirect('/teacher');
    }
  });
});

// POST Delete Teacher
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM teacher WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/teacher');
  });
});

module.exports = router;
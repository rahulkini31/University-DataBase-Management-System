const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all students
router.get('/', (req, res) => {
  const query = 'SELECT * FROM student';
  
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching students from the database');
      return;
    }
    res.render('student', { students: results });
  });
});

// GET Create Student page
router.get('/create', (req, res) => {
  res.render('create-student');
});

// POST Create Student
router.post('/create', (req, res) => {
  const { id, given_name, middle_name, last_name, date_of_birth, gender, enrollment_date } = req.body;
  const sql = `INSERT INTO student (id, given_name, middle_name, last_name, date_of_birth, gender, enrollment_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [id, given_name, middle_name, last_name, date_of_birth, gender, enrollment_date], (err, result) => {
    if (err) throw err;
    res.redirect('/student');
  });
});

// GET Update Student page
router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM student WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('update-student', { student: result[0] });
    } else {
      res.redirect('/student');
    }
  });
});

// POST Update Student
router.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { given_name, middle_name, last_name, date_of_birth, gender, enrollment_date } = req.body;
  const sql = 'UPDATE student SET given_name = ?, middle_name = ?, last_name = ?, date_of_birth = ?, gender = ?, enrollment_date = ? WHERE id = ?';

  db.query(sql, [given_name, middle_name, last_name, date_of_birth, gender, enrollment_date, id], (err, result) => {
    if (err) throw err;
    res.redirect('/student');
  });
});

// GET Delete Student confirmation page
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM student WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('delete-student', { student: result[0] });
    } else {
      res.redirect('/student');
    }
  });
});

// POST Delete Student
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM student WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/student');
  });
});

module.exports = router;
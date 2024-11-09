const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all classroom types
router.get('/', (req, res) => {
  const query = 'SELECT * FROM classroom_types';
  
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching data from database');
      return;
    }
    res.render('classroom_types', { classroomTypes: results });
  });
});

// GET Create Classroom Type page
router.get('/create', (req, res) => {
  res.render('create-classroom_types');
});

// POST Create Classroom Type
router.post('/create', (req, res) => {
  const { id, name } = req.body;
  const sql = `INSERT INTO classroom_types (id, name) VALUES (?, ?)`;

  db.query(sql, [id, name], (err, result) => {
    if (err) throw err;
    res.redirect('/classroom_types');
  });
});

// GET Update Classroom Type page
router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM classroom_types WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('update-classroom_types', { classroomType: result[0] });
    } else {
      res.redirect('/classroom_types');
    }
  });
});

// POST Update Classroom Type
router.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const sql = 'UPDATE classroom_types SET name = ? WHERE id = ?';
  db.query(sql, [name, id], (err, result) => {
    if (err) throw err;
    res.redirect('/classroom_types');
  });
});

// GET Delete Classroom Type confirmation page
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM classroom_types WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('delete-classroom_types', { classroomType: result[0] });
    } else {
      res.redirect('/classroom_types');
    }
  });
});

// POST Delete Classroom Type
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM classroom_types WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/classroom_types');
  });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all departments
router.get('/', (req, res) => {
  const query = 'SELECT * FROM department';
  
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching data from database');
      return;
    }
    res.render('department', { departments: results });
  });
});

// GET Create Department page
router.get('/create', (req, res) => {
  res.render('create-department');
});

// POST Create Department
router.post('/create', (req, res) => {
  const { id, department_name } = req.body;
  const sql = 'INSERT INTO department (id, department_name) VALUES (?, ?)';

  db.query(sql, [id, department_name], (err, result) => {
    if (err) throw err;
    res.redirect('/department');
  });
});

// GET Update Department page
router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM department WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('update-department', { department: result[0] });
    } else {
      res.redirect('/department');
    }
  });
});

// POST Update Department
router.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { department_name } = req.body;
  const sql = 'UPDATE department SET department_name = ? WHERE id = ?';
  db.query(sql, [department_name, id], (err, result) => {
    if (err) throw err;
    res.redirect('/department');
  });
});

// GET Delete Department confirmation page
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM department WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('delete-department', { department: result[0] });
    } else {
      res.redirect('/department');
    }
  });
});

// POST Delete Department
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM department WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/department');
  });
});

module.exports = router;
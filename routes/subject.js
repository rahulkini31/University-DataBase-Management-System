const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all subjects
router.get('/', (req, res) => {
  const query = `
    SELECT subject.id, subject.subject_name, department.department_name 
    FROM subject 
    JOIN department ON subject.department_id = department.id
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching data from database');
      return;
    }
    res.render('subject', { subjects: results });
  });
});

// GET Create Subject page
router.get('/create', (req, res) => {
  const departmentQuery = 'SELECT * FROM department';  // Fetch all departments to populate in the form
  db.query(departmentQuery, (err, departments) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching departments');
      return;
    }
    res.render('create-subject', { departments });
  });
});

// POST Create Subject
router.post('/create', (req, res) => {
  const { id, department_id, subject_name } = req.body;
  const sql = `INSERT INTO subject (id, department_id, subject_name) VALUES (?, ?, ?)`;

  db.query(sql, [id, department_id, subject_name], (err, result) => {
    if (err) throw err;
    res.redirect('/subject');
  });
});

// GET Update Subject page
router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const subjectQuery = 'SELECT * FROM subject WHERE id = ?';
  const departmentQuery = 'SELECT * FROM department';  // Fetch departments to show in the dropdown
  
  db.query(subjectQuery, [id], (err, subjectResult) => {
    if (err) throw err;
    if (subjectResult.length > 0) {
      db.query(departmentQuery, (err, departmentResults) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error fetching departments');
          return;
        }
        res.render('update-subject', { subject: subjectResult[0], departments: departmentResults });
      });
    } else {
      res.redirect('/subject');
    }
  });
});

// POST Update Subject
router.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { department_id, subject_name } = req.body;
  const sql = 'UPDATE subject SET department_id = ?, subject_name = ? WHERE id = ?';

  db.query(sql, [department_id, subject_name, id], (err, result) => {
    if (err) throw err;
    res.redirect('/subject');
  });
});

// GET Delete Subject confirmation page
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM subject WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('delete-subject', { subject: result[0] });
    } else {
      res.redirect('/subject');
    }
  });
});

// POST Delete Subject
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM subject WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/subject');
  });
});

module.exports = router;
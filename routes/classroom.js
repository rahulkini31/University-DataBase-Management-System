const express = require('express');
const router = express.Router();
const db = require('../config/db');
// READ: Get all classrooms
router.get('/', (req, res) => {
  const query = 'SELECT * FROM classroom';
  
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching data from database');
      return;
    }
    res.render('classroom', { classrooms: results });
  });
});
// GET Create Classroom page
router.get('/create', (req, res) => {
  res.render('create-classroom');
});
// POST Create Classroom
router.post('/create', (req, res) => {
  const { id, room_type_id, room_name, capacity } = req.body;
  const sql = `INSERT INTO classroom (id, room_type_id, room_name, capacity) VALUES (?, ?, ?, ?)`;

  db.query(sql, [id, room_type_id, room_name, capacity], (err, result) => {
    if (err) throw err;
    res.redirect('/classroom');
  });
});
// GET Update Classroom page
router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM classroom WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('update-classroom', { classroom: result[0] });
    } else {
      res.redirect('/classroom');
    }
  });
});
// POST Update Classroom
router.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { room_name, capacity } = req.body;
  const sql = 'UPDATE classroom SET room_name = ?, capacity = ? WHERE id = ?';
  db.query(sql, [room_name, capacity, id], (err, result) => {
    if (err) throw err;
    res.redirect('/classroom');
  });
});
// GET Delete Classroom confirmation page
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM classroom WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('delete-classroom', { classroom: result[0] });
    } else {
      res.redirect('/classroom');
    }
  });
});
// POST Delete Classroom
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM classroom WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/classroom');
  });
});
module.exports = router;
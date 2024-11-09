const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all student year levels
router.get('/', (req, res) => {
  const sql = `
      SELECT sy.*, s.given_name, s.last_name, yl.level_name, sy2.year_name
      FROM student_year_level sy
      JOIN student s ON sy.student_id = s.id
      JOIN year_level yl ON sy.level_id = yl.id
      JOIN school_year sy2 ON sy.school_year_id = sy2.id
  `;

  db.query(sql, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error fetching data from database');
          return;
      }
      res.render('student_year_level', { student_year_levels: results });
  });
});
// GET Create Student Year Level page
router.get('/create', (req, res) => {
  const studentsQuery = 'SELECT * FROM student';
  const levelsQuery = 'SELECT * FROM year_level';
  const schoolYearsQuery = 'SELECT * FROM school_year';

  db.query(studentsQuery, (err, students) => {
    if (err) throw err;
    db.query(levelsQuery, (err, levels) => {
      if (err) throw err;
      db.query(schoolYearsQuery, (err, schoolYears) => {
        if (err) throw err;
        res.render('create-student_year_level', { students, levels, schoolYears });
      });
    });
  });
});

// POST Create Student Year Level
router.post('/create', (req, res) => {
  const { student_id, level_id, school_year_id, score } = req.body;
  const sql = `INSERT INTO student_year_level (student_id, level_id, school_year_id, score) VALUES (?, ?, ?, ?)`;

  db.query(sql, [student_id, level_id, school_year_id, score], (err, result) => {
    if (err) throw err;
    res.redirect('/student_year_level');
  });
});

// GET Update Student Year Level page
router.get('/update/:student_id/:level_id/:school_year_id', (req, res) => {
  const { student_id, level_id, school_year_id } = req.params;
  const sql = 'SELECT * FROM student_year_level WHERE student_id = ? AND level_id = ? AND school_year_id = ?';
  
  db.query(sql, [student_id, level_id, school_year_id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const studentsQuery = 'SELECT * FROM student';
      const levelsQuery = 'SELECT * FROM year_level';
      const schoolYearsQuery = 'SELECT * FROM school_year';

      db.query(studentsQuery, (err, students) => {
        if (err) throw err;
        db.query(levelsQuery, (err, levels) => {
          if (err) throw err;
          db.query(schoolYearsQuery, (err, schoolYears) => {
            if (err) throw err;
            res.render('update-student_year_level', { student_year_level: result[0], students, levels, schoolYears });
          });
        });
      });
    } else {
      res.redirect('/student_year_level');
    }
  });
});

// POST Update Student Year Level
router.post('/update/:student_id/:level_id/:school_year_id', (req, res) => {
  const { student_id, level_id, school_year_id } = req.params;
  const { score } = req.body;
  const sql = 'UPDATE student_year_level SET score = ? WHERE student_id = ? AND level_id = ? AND school_year_id = ?';
  
  db.query(sql, [score, student_id, level_id, school_year_id], (err, result) => {
    if (err) throw err;
    res.redirect('/student_year_level');
  });
});

// GET Delete Student Year Level confirmation page
router.get('/delete/:student_id/:level_id/:school_year_id', (req, res) => {
  const { student_id, level_id, school_year_id } = req.params;
  const sql = 'SELECT * FROM student_year_level WHERE student_id = ? AND level_id = ? AND school_year_id = ?';

  db.query(sql, [student_id, level_id, school_year_id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('delete-student_year_level', { student_year_level: result[0] });
    } else {
      res.redirect('/student_year_level');
    }
  });
});

// POST Delete Student Year Level
router.post('/delete/:student_id/:level_id/:school_year_id', (req, res) => {
  const { student_id, level_id, school_year_id } = req.params;
  const sql = 'DELETE FROM student_year_level WHERE student_id = ? AND level_id = ? AND school_year_id = ?';

  db.query(sql, [student_id, level_id, school_year_id], (err, result) => {
    if (err) throw err;
    res.redirect('/student_year_level');
  });
});

module.exports = router;
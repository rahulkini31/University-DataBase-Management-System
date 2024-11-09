const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all student_guardian relationships
router.get('/', (req, res) => {
  const query = `
    SELECT sg.student_id, s.given_name, s.last_name, sg.guardian_type_id, gt.name AS guardian_type, 
           sg.guardian_id, g.first_name, g.last_name
    FROM student_guardian sg
    JOIN student s ON sg.student_id = s.id
    JOIN guardian_type gt ON sg.guardian_type_id = gt.id
    JOIN guardian g ON sg.guardian_id = g.id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching data from database');
      return;
    }
    res.render('student_guardian', { student_guardians: results });
  });
});

// GET Create Student-Guardian Relationship page
router.get('/create', (req, res) => {
  const queryStudents = 'SELECT id, given_name, last_name FROM student';
  const queryGuardians = 'SELECT id, first_name, last_name FROM guardian';
  const queryGuardianTypes = 'SELECT id, name FROM guardian_type';

  db.query(queryStudents, (err, students) => {
    if (err) throw err;
    db.query(queryGuardians, (err, guardians) => {
      if (err) throw err;
      db.query(queryGuardianTypes, (err, guardianTypes) => {
        if (err) throw err;
        res.render('create-student_guardian', { students, guardians, guardianTypes });
      });
    });
  });
});

// POST Create Student-Guardian Relationship
router.post('/create', (req, res) => {
  const { student_id, guardian_type_id, guardian_id } = req.body;
  const sql = `INSERT INTO student_guardian (student_id, guardian_type_id, guardian_id) VALUES (?, ?, ?)`;

  db.query(sql, [student_id, guardian_type_id, guardian_id], (err, result) => {
    if (err) throw err;
    res.redirect('/student_guardian');
  });
});

// GET Update Student-Guardian Relationship page
router.get('/update/:student_id/:guardian_id', (req, res) => {
  const { student_id, guardian_id } = req.params;
  const query = `
    SELECT * FROM student_guardian
    WHERE student_id = ? AND guardian_id = ?`;

  db.query(query, [student_id, guardian_id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const queryStudents = 'SELECT id, given_name, last_name FROM student';
      const queryGuardians = 'SELECT id, first_name, last_name FROM guardian';
      const queryGuardianTypes = 'SELECT id, name FROM guardian_type';

      db.query(queryStudents, (err, students) => {
        if (err) throw err;
        db.query(queryGuardians, (err, guardians) => {
          if (err) throw err;
          db.query(queryGuardianTypes, (err, guardianTypes) => {
            if (err) throw err;
            res.render('update-student_guardian', {
              student_guardian: result[0], students, guardians, guardianTypes
            });
          });
        });
      });
    } else {
      res.redirect('/student_guardian');
    }
  });
});

// POST Update Student-Guardian Relationship
router.post('/update/:student_id/:guardian_id', (req, res) => {
  const { student_id, guardian_id } = req.params;
  const { guardian_type_id } = req.body;
  const sql = `
    UPDATE student_guardian 
    SET guardian_type_id = ? 
    WHERE student_id = ? AND guardian_id = ?`;

  db.query(sql, [guardian_type_id, student_id, guardian_id], (err, result) => {
    if (err) throw err;
    res.redirect('/student_guardian');
  });
});

// GET Delete Student-Guardian Relationship confirmation page
router.get('/delete/:student_id/:guardian_id', (req, res) => {
  const { student_id, guardian_id } = req.params;
  const query = `
    SELECT sg.*, s.given_name, s.last_name, g.first_name, g.last_name, gt.name AS guardian_type 
    FROM student_guardian sg
    JOIN student s ON sg.student_id = s.id
    JOIN guardian g ON sg.guardian_id = g.id
    JOIN guardian_type gt ON sg.guardian_type_id = gt.id
    WHERE sg.student_id = ? AND sg.guardian_id = ?`;

  db.query(query, [student_id, guardian_id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render('delete-student_guardian', { student_guardian: result[0] });
    } else {
      res.redirect('/student_guardian');
    }
  });
});

// POST Delete Student-Guardian Relationship
router.post('/delete/:student_id/:guardian_id', (req, res) => {
  const { student_id, guardian_id } = req.params;
  const sql = 'DELETE FROM student_guardian WHERE student_id = ? AND guardian_id = ?';

  db.query(sql, [student_id, guardian_id], (err, result) => {
    if (err) throw err;
    res.redirect('/student_guardian');
  });
});

module.exports = router;
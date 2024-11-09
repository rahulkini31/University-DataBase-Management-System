const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all student_class records
router.get('/', (req, res) => {
    const query = `
        SELECT sc.*, s.given_name, s.last_name, c.name AS class_name
        FROM student_class sc
        JOIN student s ON sc.student_id = s.id
        JOIN class c ON sc.class_id = c.id
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching data from database');
            return;
        }
        res.render('student_class', { student_classes: results });
    });
});

// GET Create Student Class page
router.get('/create', (req, res) => {
    // Fetch students and classes for the dropdowns
    const studentQuery = 'SELECT * FROM student';
    const classQuery = 'SELECT * FROM class';
    
    db.query(studentQuery, (err, students) => {
        if (err) throw err;

        db.query(classQuery, (err, classes) => {
            if (err) throw err;
            res.render('create-student-class', { students, classes });
        });
    });
});

// POST Create Student Class
router.post('/create', (req, res) => {
    const { student_id, class_id, score } = req.body;
    const sql = `INSERT INTO student_class (student_id, class_id, score) VALUES (?, ?, ?)`;

    db.query(sql, [student_id, class_id, score], (err, result) => {
        if (err) throw err;
        res.redirect('/student_class');
    });
});

// GET Update Student Class page
router.get('/update/:student_id/:class_id', (req, res) => {
    const { student_id, class_id } = req.params;
    
    const sql = 'SELECT * FROM student_class WHERE student_id = ? AND class_id = ?';
    db.query(sql, [student_id, class_id], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            const studentQuery = 'SELECT * FROM student';
            const classQuery = 'SELECT * FROM class';
            
            db.query(studentQuery, (err, students) => {
                if (err) throw err;

                db.query(classQuery, (err, classes) => {
                    if (err) throw err;
                    res.render('update-student-class', { student_class: result[0], students, classes });
                });
            });
        } else {
            res.redirect('/student_class');
        }
    });
});

// POST Update Student Class
router.post('/update/:student_id/:class_id', (req, res) => {
    const { student_id, class_id } = req.params;
    const { score } = req.body;
    const sql = 'UPDATE student_class SET score = ? WHERE student_id = ? AND class_id = ?';
    
    db.query(sql, [score, student_id, class_id], (err, result) => {
        if (err) throw err;
        res.redirect('/student_class');
    });
});

// GET Delete Student Class confirmation page
router.get('/delete/:student_id/:class_id', (req, res) => {
    const { student_id, class_id } = req.params;
    const sql = 'SELECT * FROM student_class WHERE student_id = ? AND class_id = ?';
    
    db.query(sql, [student_id, class_id], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.render('delete-student-class', { student_class: result[0] });
        } else {
            res.redirect('/student_class');
        }
    });
});

// POST Delete Student Class
router.post('/delete/:student_id/:class_id', (req, res) => {
    const { student_id, class_id } = req.params;
    const sql = 'DELETE FROM student_class WHERE student_id = ? AND class_id = ?';

    db.query(sql, [student_id, class_id], (err, result) => {
        if (err) throw err;
        res.redirect('/student_class');
    });
});

module.exports = router;
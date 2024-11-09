const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all classes
router.get('/', (req, res) => {
    const query = `
        SELECT c.*, s.subject_name, t.first_name AS teacher_first, t.last_name AS teacher_last,
               term.term_name, p1.name AS start_period_name, p2.name AS end_period_name, 
               r.room_name AS classroom_name
        FROM class c
        JOIN subject s ON c.subject_id = s.id
        JOIN teacher t ON c.teacher_id = t.id
        JOIN term ON c.term_id = term.id
        JOIN period p1 ON c.start_period_id = p1.id
        JOIN period p2 ON c.end_period_id = p2.id
        JOIN classroom r ON c.classroom_id = r.id
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching data from database');
            return;
        }
        res.render('class', { classes: results });
    });
});

// GET Create Class page
router.get('/create', (req, res) => {
    const subjectQuery = 'SELECT * FROM subject';
    const teacherQuery = 'SELECT * FROM teacher';
    const termQuery = 'SELECT * FROM term';
    const periodQuery = 'SELECT * FROM period';
    const classroomQuery = 'SELECT * FROM classroom';

    // Run all queries in parallel
    db.query(subjectQuery, (err, subjects) => {
        if (err) throw err;
        db.query(teacherQuery, (err, teachers) => {
            if (err) throw err;
            db.query(termQuery, (err, terms) => {
                if (err) throw err;
                db.query(periodQuery, (err, periods) => {
                    if (err) throw err;
                    db.query(classroomQuery, (err, classrooms) => {
                        if (err) throw err;
                        res.render('create-class', { subjects, teachers, terms, periods, classrooms });
                    });
                });
            });
        });
    });
});

// POST Create Class
router.post('/create', (req, res) => {
    const { id, subject_id, teacher_id, term_id, start_period_id, end_period_id, classroom_id, name } = req.body;
    const sql = `
        INSERT INTO class (id, subject_id, teacher_id, term_id, start_period_id, end_period_id, classroom_id, name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [id, subject_id, teacher_id, term_id, start_period_id, end_period_id, classroom_id, name], (err, result) => {
        if (err) throw err;
        res.redirect('/class');
    });
});

// GET Update Class page
router.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM class WHERE id = ?';
    const subjectQuery = 'SELECT * FROM subject';
    const teacherQuery = 'SELECT * FROM teacher';
    const termQuery = 'SELECT * FROM term';
    const periodQuery = 'SELECT * FROM period';
    const classroomQuery = 'SELECT * FROM classroom';

    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            // Run all queries in parallel for dropdown data
            db.query(subjectQuery, (err, subjects) => {
                if (err) throw err;
                db.query(teacherQuery, (err, teachers) => {
                    if (err) throw err;
                    db.query(termQuery, (err, terms) => {
                        if (err) throw err;
                        db.query(periodQuery, (err, periods) => {
                            if (err) throw err;
                            db.query(classroomQuery, (err, classrooms) => {
                                if (err) throw err;
                                res.render('update-class', { class: result[0], subjects, teachers, terms, periods, classrooms });
                            });
                        });
                    });
                });
            });
        } else {
            res.redirect('/class');
        }
    });
});

// POST Update Class
router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { subject_id, teacher_id, term_id, start_period_id, end_period_id, classroom_id, name } = req.body;
    const sql = `
        UPDATE class
        SET subject_id = ?, teacher_id = ?, term_id = ?, start_period_id = ?, end_period_id = ?, classroom_id = ?, name = ?
        WHERE id = ?
    `;
    db.query(sql, [subject_id, teacher_id, term_id, start_period_id, end_period_id, classroom_id, name, id], (err, result) => {
        if (err) throw err;
        res.redirect('/class');
    });
});

// GET Delete Class confirmation page
router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM class WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.render('delete-class', { class: result[0] });
        } else {
            res.redirect('/class');
        }
    });
});

// POST Delete Class
router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM class WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.redirect('/class');
    });
});

module.exports = router;
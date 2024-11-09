const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all periods
router.get('/', (req, res) => {
    const query = `
        SELECT p.*, sy.year_name
        FROM period p
        JOIN school_year sy ON p.year_id = sy.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching data from database');
            return;
        }
        res.render('period', { periods: results });
    });
});

// GET Create Period page
router.get('/create', (req, res) => {
    const query = 'SELECT * FROM school_year';
    db.query(query, (err, schoolYears) => {
        if (err) throw err;
        res.render('create-period', { schoolYears });
    });
});

// POST Create Period
router.post('/create', (req, res) => {
    const { id, year_id, name, start_time, end_time } = req.body;
    const sql = `INSERT INTO period (id, year_id, name, start_time, end_time) VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [id, year_id, name, start_time, end_time], (err, result) => {
        if (err) throw err;
        res.redirect('/period');
    });
});

// GET Update Period page
router.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM period WHERE id = ?';
    const yearQuery = 'SELECT * FROM school_year';

    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            db.query(yearQuery, (err, schoolYears) => {
                if (err) throw err;
                res.render('update-period', { period: result[0], schoolYears });
            });
        } else {
            res.redirect('/period');
        }
    });
});

// POST Update Period
router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { year_id, name, start_time, end_time } = req.body;
    const sql = 'UPDATE period SET year_id = ?, name = ?, start_time = ?, end_time = ? WHERE id = ?';

    db.query(sql, [year_id, name, start_time, end_time, id], (err, result) => {
        if (err) throw err;
        res.redirect('/period');
    });
});

// GET Delete Period confirmation page
router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM period WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.render('delete-period', { period: result[0] });
        } else {
            res.redirect('/period');
        }
    });
});

// POST Delete Period
router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM period WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.redirect('/period');
    });
});

module.exports = router;
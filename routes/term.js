const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all terms
router.get('/', (req, res) => {
    const query = `
        SELECT t.*, sy.year_name
        FROM term t
        JOIN school_year sy ON t.year_id = sy.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching data from database');
            return;
        }
        res.render('term', { terms: results });
    });
});

// GET Create Term page
router.get('/create', (req, res) => {
    const sql = 'SELECT * FROM school_year'; // Get school years for dropdown
    db.query(sql, (err, schoolYears) => {
        if (err) throw err;
        res.render('create-term', { schoolYears });
    });
});

// POST Create Term
router.post('/create', (req, res) => {
    const { id, year_id, term_name, term_number, start_date, end_date } = req.body;
    const sql = `INSERT INTO term (id, year_id, term_name, term_number, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [id, year_id, term_name, term_number, start_date, end_date], (err, result) => {
        if (err) throw err;
        res.redirect('/term');
    });
});

// GET Update Term page
router.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM term WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const schoolYearsSql = 'SELECT * FROM school_year'; // Get school years for dropdown
            db.query(schoolYearsSql, (err, schoolYears) => {
                if (err) throw err;
                res.render('update-term', { term: result[0], schoolYears });
            });
        } else {
            res.redirect('/term');
        }
    });
});

// POST Update Term
router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { year_id, term_name, term_number, start_date, end_date } = req.body;
    const sql = 'UPDATE term SET year_id = ?, term_name = ?, term_number = ?, start_date = ?, end_date = ? WHERE id = ?';
    db.query(sql, [year_id, term_name, term_number, start_date, end_date, id], (err, result) => {
        if (err) throw err;
        res.redirect('/term');
    });
});

// GET Delete Term confirmation page
router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM term WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.render('delete-term', { term: result[0] });
        } else {
            res.redirect('/term');
        }
    });
});

// POST Delete Term
router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM term WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.redirect('/term');
    });
});

module.exports = router;
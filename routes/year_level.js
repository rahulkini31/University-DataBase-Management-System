const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Get all year levels
router.get('/', (req, res) => {
    const query = 'SELECT * FROM year_level';
    
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching data from database');
            return;
        }
        res.render('year_level', { year_levels: results });
    });
});

// GET Create Year Level page
router.get('/create', (req, res) => {
    res.render('create-year_level');
});

// POST Create Year Level
router.post('/create', (req, res) => {
    const { id, level_name, level_order } = req.body;
    const sql = `INSERT INTO year_level (id, level_name, level_order) VALUES (?, ?, ?)`;

    db.query(sql, [id, level_name, level_order], (err, result) => {
        if (err) throw err;
        res.redirect('/year_level');
    });
});

// GET Update Year Level page
router.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM year_level WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.render('update-year_level', { year_level: result[0] });
        } else {
            res.redirect('/year_level');
        }
    });
});

// POST Update Year Level
router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { level_name, level_order } = req.body;
    const sql = 'UPDATE year_level SET level_name = ?, level_order = ? WHERE id = ?';
    db.query(sql, [level_name, level_order, id], (err, result) => {
        if (err) throw err;
        res.redirect('/year_level');
    });
});

// GET Delete Year Level confirmation page
router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM year_level WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.render('delete-year_level', { year_level: result[0] });
        } else {
            res.redirect('/year_level');
        }
    });
});

// POST Delete Year Level
router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM year_level WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.redirect('/year_level');
    });
});

module.exports = router;
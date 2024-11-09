const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    if (!req.session.username || req.session.role !== 'student') {
        return res.redirect('/login');
    }
    const userId = req.session.username;
    const query = `
        SELECT s.* 
        FROM student s
        JOIN users u ON s.id = u.username
        WHERE u.username = ?`;
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving student details.');
        }
        if (results.length === 0) {
            return res.status(404).send('Student not found.');
        }
        const studentDetails = results[0];
        res.render('student-dashboard', {
            username: studentDetails.given_name,
            role: req.session.role,
            studentDetails: studentDetails
        });
    });
});
module.exports = router;
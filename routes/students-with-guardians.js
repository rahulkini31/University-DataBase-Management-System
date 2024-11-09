const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to get students with guardians
router.get('/', (req, res) => {
    if (!req.session.userId || req.session.role !== 'admin') {
        return res.redirect('/login'); // Redirect to login if not authenticated or not an admin
    }

    // Call the stored procedure to get students with guardians
    db.query('CALL GetStudentsWithGuardians()', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving data');
        }

        // results[0] contains the result set from the stored procedure
        res.render('students-with-guardians', {
            username: req.session.username,
            role: req.session.role,
            students: results[0] // Pass the student data to the view
        });
    });
});

module.exports = router;
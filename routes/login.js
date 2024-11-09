const express = require('express');
const router = express.Router();
const db = require('../config/db'); // g you haveAssumin a db configuration file

// Route to serve the login page
router.get('/', (req, res) => {
    res.render('login'); // Render the login EJS template
});

// Route to handle login
router.post('/', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error during login.');
        }

        if (results.length > 0) {
            const user = results[0];
            // Store user information in session
            req.session.userId = user.id;
            req.session.role = user.role;
            req.session.username = user.username; // Store username for display
            
            // Redirect to the appropriate dashboard based on role
            if (user.role === 'admin') {
                return res.redirect('/admin-dashboard'); // Redirect to admin dashboard
            } else if (user.role === 'student') {
                return res.redirect('/student-dashboard'); // Redirect to student dashboard
            } else {
                return res.status(403).send('Access denied.'); // Handle other roles if necessary
            }
        } else {
            return res.status(401).send('Invalid username or password.'); // Handle invalid credentials
        }
    });
});

module.exports = router;
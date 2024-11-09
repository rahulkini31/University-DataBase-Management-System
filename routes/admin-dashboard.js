const express = require('express');
const router = express.Router();

// Route to serve the admin dashboard
router.get('/', (req, res) => {
    if (!req.session.userId || req.session.role !== 'admin') {
        return res.redirect('/login'); // Redirect to login if not authenticated or not an admin
    }

    res.render('admin-dashboard', {
        username: req.session.username,
        role: req.session.role
    });
});

module.exports = router;
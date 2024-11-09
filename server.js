const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');
const session = require('express-session');
app.use(session({
    secret: 'simple-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//middleware
app.use('/classroom',  require('./routes/classroom') );
app.use('/classroom_types', require('./routes/classroom_types'));
app.use('/department', require('./routes/department'));
app.use('/subject', require('./routes/subject'));
app.use('/guardian', require('./routes/guardian'));
app.use('/guardian_type', require('./routes/guardian_type'));
app.use('/student', require('./routes/student'));
app.use('/student_guardian', require('./routes/student_guardian'));
app.use('/teacher', require('./routes/teacher'));
app.use('/school_year', require('./routes/school_year'));
app.use('/year_level', require('./routes/year_level'));
app.use('/student_year_level', require('./routes/student_year_level'));
app.use('/term', require('./routes/term'));
app.use('/period', require('./routes/period'));
app.use('/class', require('./routes/class'));
app.use('/student_class', require('./routes/student_class'));
app.use('/login', require('./routes/login'));
app.use('/admin-dashboard', require('./routes/admin-dashboard'));
app.use('/student-dashboard', require('./routes/student-dashboard'));
app.use('/students-with-guardians', require('./routes/students-with-guardians'));
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Route to logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.redirect('/dashboard');
        }
        res.redirect('/login');
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
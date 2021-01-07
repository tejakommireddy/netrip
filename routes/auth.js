const express = require('express');
const { con } = require('../config/db');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const alreadyLoggedIn = (req, res, next) => {
    if (req.session.username) {
        res.redirect('/new');
    } else {
        next();
    }
}

router.get('/login', alreadyLoggedIn, (req, res) => {
    res.render('login', { title: 'Login', isLoggedIn: false });
});

router.post('/login', (req, res) => {
    const usernameOrEmail = req.body.username_or_email;
    const password = req.body.password;
    con.query('SELECT * FROM client WHERE username=? OR email=?', [usernameOrEmail, usernameOrEmail], (err, result) => {
        if (result.length === 1) {
            if (password === result[0].password) {
                req.session.email = result[0].email;
                req.session.username = result[0].username;
                req.session.clientId = result[0].id;
                res.redirect('/new');
            } else {
                req.flash('error', 'Wrong password!');
                res.redirect('/auth/login');
            }
        }
        else {
            req.flash('error', 'Wrong username or email');
            res.redirect('/auth/login');
        }
    });
});

router.get('/signup', alreadyLoggedIn, (req, res) => {
    res.render('signup', { title: 'Signup', isLoggedIn: false });
});

router.post('/signup', [
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "i")
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    con.query('SELECT * from client WHERE username=? OR email=?', [username, email], (err, result) => {
        if (result.length !== 0) {
            req.flash("error", 'Username or email already taken!')
            res.redirect('/auth/signup');
        }
        else {
            con.query('INSERT INTO client (username, password, email) values (?, ?, ?)', [username, password, email], (er) => {
                if (er) throw er;
                con.query('SELECT id FROM client WHERE username=?', [username], (error, results) => {
                    con.query('INSERT INTO email_config (client_id, email_to, message) values (?, ?, ?)', [results[0].id, email, 'Please set a message']);
                    res.redirect('/auth/login');
                })
            });
        }
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;
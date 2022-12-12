const express = require('express');
const router = express.Router();

const users = [];

router.get('/users', (req, res, next) => {
    res.render('users', { pageTitle: 'users', users: users, path: '/users' });
});

router.post('/users', (req, res, next) => {
    // console.log(req.body);
    users.push(req.body);
    res.render('users', { pageTitle: 'users', users: users, path: '/users' });
});

module.exports = router;
const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();
// This router is like mini express app tied to/pluggable to other express apps which we can export here.

//  /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    // console.log('add-product middleware');
    // res.send(`
    //     <form action="/add-product" method="POST">
    //         <input type="text" name="title">
    //         <button type="submit">Add Product</button>
    //     </form>
    // `);

    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

//   /admin/add-product => POST
router.post('/add-product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});


module.exports = router;
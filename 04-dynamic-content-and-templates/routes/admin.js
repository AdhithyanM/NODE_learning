const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    // html file
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    // pug file
    // res.render('add-product', { pageTitle: 'Add Product' });    // loads add-product.pug in views if pug is configured in express app as view
    
    // hbs, ejs file
    res.render('add-product', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
        formsCSS: true, 
        productCSS: true, 
        activeAddProduct: true 
    });

});

router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
})

exports.routes = router;
exports.products = products;    // exporting this reference type products to other module.
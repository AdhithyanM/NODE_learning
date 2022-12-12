const express = require('express');

const path = require('path');

const rootDir = require('../util/path');

const adminData = require('../routes/admin');
/*
    above line is one way is sharing data from admin module which is products to this shop module.
    This as a disadvantage. It data is inherent to our node server as it is running
    Therefore it is shared across all users and sessions !!!!!!
    Sometimes this kind of sharing is needed but its very very rare.

    you always want to fetch data for a specific request and if that happens to be the same data, you show it for all users that send this request.
    But sharing this data across requests, across users is typically something you don't want to do.
    User A and User B will say same data <--- should not be the case.

    later we will learn a technique to share data in memory here in the node app across different requests but only for one and the same user and not across users

    data sharing:
    - across requests and across users
    - across different requests and not across users 
*/

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log('shop.js', adminData.products);

    // html file
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    // pug file
    // res.render('shop');    // looks for shop.pug in views package as we configured the same in server-1.js
    // res.render() uses the default templating engine.
    
    const products = adminData.products;
    // res.render('shop', { prods: products, docTitle: 'Shop' });
    // res.render('shop', { pageTitle: 'Shop', prods: products, docTitle: 'Shop', path: '/', hasProducts: products.length > 0 });

    // hbs, ejs file
    res.render('shop', { 
        pageTitle: 'shop', 
        prods: products, 
        docTitle: 'Shop', 
        path: '/',
        hasProducts: products.length > 0, 
        activeShop: true, 
        formsCSS: true,
        // layout: false
    });
});

module.exports = router;
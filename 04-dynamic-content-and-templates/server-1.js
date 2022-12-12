const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const app = express();

// setting global configuration values

/*
    PUG
    app set allows us to set any values globally on our express application.
    this can also be keys or configuration items. 
    if express doesn't understand then it ignores them but we can read from app object with app get
    -- we can set some reserved keywords using this that lead our express app to behave differently.

    we use pug as view engine here. While installing the pug templating engine, it actually ships with built in express support and auto registers itself with express.
*/
// app.set('view engine', 'pug');
// app.set('views', 'views');      // where to find our views. it says to look under views package.

/* 
    HBS
    For express handlebars, we should do it by below way
    we use app.engine() for handlebars and not for pug because pug is kind of built-in
*/
// const expressHbs = require('express-handlebars');
// // app.engine('hbs', expressHbs());     // expressHbs() returns an initialized view engine
// app.engine('hbs', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs' }));
// app.set('view engine', 'hbs');
// app.set('views', 'views');

/*
    EJS
    like pug it is supported out of the box.
*/
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use((req, res, next) => {
    // html file
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    
    // pug, hbs, ejs file
    res.status(404).render('404', {pageTitle: 'Error Page'});
});

app.listen(4000);

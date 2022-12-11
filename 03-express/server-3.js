const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// to serve static files which are under public folder, we need to tell that to express
app.use(express.static(path.join(__dirname, 'public')));
// this serves file statically. i.e, not handled by express router or other middleware but instead directly forwarded to the file system.


const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
// order of importing routes doesn't matter

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin',adminRoutes);  // funnelling requests through routes based on path.
app.use(shopRoutes);
app.use((req, res, next) => {           // catch all middleware to handle 404 error page.
    // res.status(404).send('<h1>Page Not Found!</h1>');
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
// order of using routes matter!

app.listen(4000);
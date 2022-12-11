const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', (req, res, next) => {
    console.log('This always runs based on order and !');
    next();
});

app.post('/add-product', (req, res, next) => {
    console.log('add-product middleware');
    res.send(`
        <form action="/product" method="POST">
            <input type="text" name="title">
            <button type="submit">Add Product</button>
        </form>
    `);
});

app.use('/product', (req, res) => {
    // unlike node JS were we need to use Buffer.concat(collectedArrDataStream).toString() to access req data,
    // express adds the property body to our req object for simplicity.
    // but unless you use body-parser or 3rd party packages, this would be undefined.
    console.log(req.body);
    res.redirect('/');   // redirect to home page
});

// middleware that executes for a particular path
app.use("/", (req, res, next) => {
    console.log('In another middleware');
    res.send('<h1>Hello World!</h1>');
});
// now the above middleware will be executed for both '/' as well '/..........' since the later one also starts with /
// To avoid this keep a middleware on top of '/' for '/..........' and don't use next()

// The order of middlewares and whether we call next or not matters a lot.


app.listen(4000);
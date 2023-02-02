// module imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// routes Import
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
// controller Imports
const errorController = require('./controllers/error');



const app = express();



// setting global configuration values
app.set('view engine', 'ejs');
app.set('views', 'views');


// configuring middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));


// Using Routes
app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use(errorController.get404);



app.listen(4000);

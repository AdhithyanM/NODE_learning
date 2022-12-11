const http = require('http');

const express = require('express');

// create an express application
const app = express();

/*
express.js is all about middleware.
middleware means the incoming req is funnelled through a bunch of functions by express js.
request -> middleware1  next() -> middleware2  next()  -> response
*/

// use method allows us to add middleware

// app.use((req, res, next) => {
//     console.log('In the middleware');
//     // next is actually a function that will be passed to above function by express js.
//     next();   // allows the req to continue to the next middleware in line. i.e, below this
// });      

// (req, res, next) => {}

// app.use((req, res, next) => {
//     console.log('In another middleware');
//     res.send('<h1>Hello from Express!</h1>');
// })

// The order of middleware execution is top to bottom through the file, through all the middleware functions but only if we call next()
// If we don't call next(), it just dies. 
// If next() is not called, we should send response because otherwise the request can't continue its journey, so it will never reach a place where we might send response.


// app is also a valid requestHandler

// const server = http.createServer(app);
// server.listen(4000);

// or we can start the server by just app.listen which does the above 2 line execution for us.

app.listen(4000);
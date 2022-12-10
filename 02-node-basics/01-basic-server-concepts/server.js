/*
  using require we import necessary modules
  starting with ./ is relative path to that file
  starting with / is absolute path to that file
  if just name is mentioned, its inbuild module 
*/

// const http = require('./http'); // looks for http.js from this folder locally
const http = require('http');    // we now imported http object from http module.
const fs = require('fs');        // fs allows us to work with file system.

// function reqListener(req, res) {}

// http.createServer(reqListener);                 // we are passing the function here not invoking and passing the data it returns.
// createServer takes in a requestListener as arg
// requestListener - A function that will execute for every incoming request. It has request, response as args
// It is called back whenever nodeJS recieves a request.

// createServer method returns a Server which should be stored

// we can also write it in this way
const server1 = http.createServer((req, res) => {
    /*
        NodeJS uses Event Driven architecture.
        we tell node if x happens do Y.
    */
    // console.log(req);
    console.log(req.url, req.method, req.headers);
    // process.exit();   // quits the server. - won't be used in production.

    // set the response content type in the response header
    res.setHeader('Content-Type','text/html');
    // you can write response in chunks
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello World!</h1></body>');
    res.write('</html>');
});

// Routing
const server2 = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    // const data = req.data;    // won't work that way to receive incoming data.
    if(url === '/') {
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(
            `<body>
                <form action="/message" method="POST">
                    <input type="text">
                    <button type="submit">Send</button>
                </form>
            </body>`
        );
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'DUMMY');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello World!</h1></body>');
    res.write('</html>');
    return res.end();
});

// parsing data
/*
    incoming data in the request is send as a stream of data 
    the request is simply read by node in chunks.

    The problem with our code, we can't arbitrarily try to work with these chunks.
    Instead to organize these incoming chunks we use buffer.

    analogy:
    bus-stop (buffer) where buses will stop for users (data-chunks is cummulated for accessing)

    buffer is a construct which allows you to hold multiple chunks and work with them before they are released.
*/
const server3 = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(
            `<body>
                <form action="/message" method="POST">
                    <input type="text" name="message">
                    <button type="submit">Send</button>
                </form>
            </body>`
        );
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST') {
        const reqBody = [];
        // on method in request allows us to listen for certain events.
        // data event is triggered whenever a new chunk is ready to be read (buffer thing)
        req.on('data', (chunk) => {
            console.log(chunk);
            reqBody.push(chunk);
        });
        // end event is triggered when the incoming data receiving is done.
        req.on('end', () => {
            // Buffer.concat(reqBody) returns a Buffer which holds all the received chunks.
            const parsedBody = Buffer.concat(reqBody).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
            console.log(parsedBody);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});


/*
   we can register code functions which run sometime in the future, but not necessarily right now.
*/
const server4 = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(
            `<body>
                <form action="/message" method="POST">
                    <input type="text" name="message">
                    <button type="submit">Send</button>
                </form>
            </body>`
        );
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST') {
        const reqBody = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            reqBody.push(chunk);
        });
        // the server when receives the request for /message url, simply registers these 2 events and the listener functions.
        // until the request data is fully read and processed, the response is not returned.
        // now this is a BLOCKING CODE !!!  other requests can't be served until this completes.

        // req.on('end', () => {
        //     const parsedBody = Buffer.concat(reqBody).toString();
        //     const message = parsedBody.split('=')[1];
        //     fs.writeFileSync('message.txt', message);
        //     console.log(parsedBody);
        //     res.statusCode = 302;
        //     res.setHeader('Location', '/');
        //     return res.end();                   
        // });
        
        // right way to write the code

        return req.on('end', () => {
            const parsedBody = Buffer.concat(reqBody).toString();
            const message = parsedBody.split("=")[1];
            console.log(parsedBody);
            fs.writeFile('message.txt', message, err => {
                // do file operation asynchronously and return the response once it is done.
                // err handling can be done if needed.
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }
})


// tell nodeJS to make the server listen to requests coming to the port 4000
server1.listen(4001);
server2.listen(4002);
server3.listen(4003);
server4.listen(4004);

/*
NodeJS has event driven architecture where you basically tell nodeJS that
do something and it will then go ahead and offload that process to the WorkerPool (OS) which does use multi-threading and so on
and will then continue its event loop to listen for event callbacks and always just dispatch tiny actions like that
to never block the code execution and then always just come back once an operation is done by the OS.

It never blocks the code, sever. Hence it has High-Performance.
*/
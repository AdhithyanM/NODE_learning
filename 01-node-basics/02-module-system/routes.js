const fs = require('fs');

const requestHandler = (req,res) => {
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

        return req.on('end', () => {
            const parsedBody = Buffer.concat(reqBody).toString();
            const message = parsedBody.split("=")[1];
            console.log(parsedBody);
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }
}


//How to export our requestHandler to other modules?

/*
using module.exports
module - keyword or object which is exposed globally to us by nodeJS which has exports property and we can assign value to this.
*/
// module.exports = requestHandler;

//multiple exports can be done using any of the below ways
// module.exports = {
//     handler : requestHandler,
//     randomText : 'some random text exported'
// }

// module.exports.handler = requestHandler;
// module.exports.randomText = 'some random text exported';

// modern JS has shorter syntax for module.exports which is just exports
exports.handler = requestHandler;
exports.randomText = 'some random text exported';
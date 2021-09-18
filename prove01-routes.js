const fs = require('fs');
const { request } = require('http');

// we write a function called requestHandler like this:
// function requestHandler(req, res){}
// but we don't use that. We use shorthand to write the same function like this with ES6:
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method; // parses the method because later we require the method === POST and we need it to look for the method used (GET or POST).
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end(); //putting 'return' in front of res.end() will cause it to exit the anonymous function and not continue executing code.
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!<h1></body>');
    res.write('</html>');
    res.end();
};

    module.exports = requestHandler;
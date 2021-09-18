const fs = require('fs');
const { request } = require('http');

// we write a function called requestHandler like this:
// function requestHandler(req, res){}
// but we don't use that. We use shorthand to write the same function like this with ES6:
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method; // parses the method because later we require the method === POST and we need it to look for the method used (GET or POST).
   // const users = ['soccer', 'basketball', 'football', 'swimming'];
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Prove01</title><head>');
        res.write('<body>');
        res.write('<h1>Welcome to Prove01 for CSE341</h1>');
        res.write ('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Add User</button></form>');
        res.write ('</body>');
        res.write('</html>');
        return res.end(); //putting 'return' in front of res.end() will cause it to exit the anonymous function and not continue executing code.
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html');
        res.write('<head><title>Prove01 Users</title></head>');
        res.write('<body><ul><li>Mike</li><li>Bill</li></ul></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = []; // this [] means an empty array
        // The following line uses the 'on' method to listen for certain events for the request. We are setting it to listen for the 'data' event.
        // the 'data' event will be fired whenever a new 'chunk' is ready to be read. '(chunk) =>' is the shorthand way of writing a function. i.e. function(chunk)
        req.on('data', (chunk) => {
            console.log(chunk); // Shows us in the console what's in the chunk and how often it pushes a chunk.
            body.push(chunk); // This line means we are modifying the data in the array defined by 'const body = [];' so it pushes the chunk data into the array.
        });
        // The following is another function that will buffer all the chunks stored in the 'body' array. Then we can interact with them. A buffer is like a bus stop.
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString(); // This line creates a constant 'parsedBody' which takes all the chunks in the Buffer (Buffer is built into Node.js) and concatenates them into one piece and converts it to a string.
            console.log(parsedBody.split('=')[1]); // this will output the contents of 'const parsedBody' to the console so we can see what we have.
            const message = parsedBody.split('=')[1]; // this splits parsedBody on the = sign and takes array element index 1 [1] which is the element that was on the right of the = sign (it's our message).
            // fs.writeFileSync('message.txt', message); // this writes the content of the 'message' const to a file called message.txt BUT it uses synchrounous mode which blocks code execution. That's why we've rewritten with the following code:
            // The following is the correct way to handle file writing. The 3rd argument, 'err', would handle errors.
            /* fs.writeFile('message.txt', message, err => {
            res.statusCode = 302; // the 302 will be in the header and it means 'redirect'. We will be redirected to localhost
            res.setHeader('Location', '/');
            return res.end();
            }); */
            res.statusCode = 302; // the 302 will be in the header and it means 'redirect'. We will be redirected to localhost
            res.setHeader('Location', '/');
            return res.end();
        });

    }
};

exports.handler = requestHandler;
exports.someText = 'A quick server test in terminal';
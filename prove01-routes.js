const fs = require('fs');
const { request } = require('http');
const { runInNewContext } = require('vm');


const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method; // parses the method because later we require the method === POST and we need it to look for the method used (GET or POST).
    let users = ['Mike', 'Phil'];
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Prove01</title><head>');
        res.write('<body>');
        res.write('<h1>Welcome to Prove01 for CSE341</h1>');
        res.write ('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Add User</button></form>');
        res.write ('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html');
        res.write('<head><title>Prove01 Users</title></head>');
      //  res.write('<body><ul><li>Mike</li><li>Bill</li></ul></body>'); // this was how I originally created my list
        res.write('<ul>');
        for (const user of users) {
            res.write(`<li>${user}</li>`);
        }
        res.write('</ul>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = []; 
        req.on('data', (chunk) => {
            console.log(chunk); // Shows us in the console what's in the chunk and how often it pushes a chunk.
            body.push(chunk); // This line means we are modifying the data in the array defined by 'const body = [];' so it pushes the chunk data into the array.
        });
        // The following is another function that will buffer all the chunks stored in the 'body' array. Then we can interact with them. A buffer is like a bus stop.
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString(); // This line creates a constant 'parsedBody' which takes all the chunks in the Buffer (Buffer is built into Node.js) and concatenates them into one piece and converts it to a string.
           // console.log(parsedBody.split('=')[1]); // this will output the contents of 'const parsedBody' to the console so we can see what we have.
            const newUser = parsedBody.split('=')[1]; // this splits parsedBody on the = sign and takes array element index 1 [1] which is the element that was on the right of the = sign (it's our user).
            console.log(newUser);
            users.push(newUser);

            res.statusCode = 302; // the 302 will be in the header and it means 'redirect'. We will be redirected to localhost
            res.setHeader('Location', '/');
            return res.end();
        });

    }
};

exports.handler = requestHandler;
exports.someText = 'A quick server test in terminal';
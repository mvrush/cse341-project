const http = require('http');

const routes = require('./prove01-routes'); // since this is not a global module we add the local path to routes.js with ./ and you can also drop the .js from routes.

console.log(routes.someText);

const server = http.createServer(routes.handler); // tells Node to just execute the function stored in the const = routes.

server.listen(3000);
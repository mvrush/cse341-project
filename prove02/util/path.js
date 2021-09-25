const path = require('path'); // brings in the path module that helps us create paths and navigate our files

// dirname() returns the directory name of a path. We then use 'process' which is a global variable available everywhere.
// 'mainModule' refers to the main module (or file, in this case 'app.js') that started our application.
// 'filename' finds the name of the file that is our mainModule, or which spun up this application. I this case, app.js
// we can then use 'dirname' to specify the starting path or root path if you will.
module.exports = path.dirname(process.mainModule.filename);
// This is the portion of the shop that users will see.

const path = require('path'); // require('path') is the 'path' core module in Express. We assign it to the constant names 'path'.

const express = require('express'); // Again we require express to be used on this page.

const rootDir = require('../util/path'); // The constant 'rootDir' is enabled by the 'path.js' file found in the 'util' folder. We use it to specify our root directory.

const adminData = require('./admin'); // we import 'adminData' by pulling it from the 'admin.js' file as specified by 'require('./admim');'.

const router = express.Router(); // We create the router constant to hold the 'express.Router()' function. Router() is an Express function that routes things.

// even though I have the less specific '/' before the more specific 'add-product' this middleware uses 'next()' to pass along to the next middleware. So it won't stop here.
// the middlewares that use 'next()' to add functionality need to be placed before those that send a response of they'll never be reached.
// the 'app' constant was changed to the 'router' constant so I switced from 'app' to 'router'. I am also using 'get' instead of 'use' so it only watched 'get' commands (although I could use 'use' instead and that's ok).
router.get('/', (req, res, next) => {
    console.log('This always runs because it ends in a next() and is placed before the responses');
    next();
});

/***** This is what we were using before switching to our templating engine. It was for testing.
router.get ('/', (req, res, next) => {
    console.log('shop.js', adminData.products); // this logs what we have in our 'products' array. Using 'adminData' it finds our admin.js file and also sees the products array const there. It first logs the dummy text 'shop.js' to show where it's coming from displayed in the console.
     // using the 'path' const we use the express core module named 'path' to define our path. __dirname (two underscores then dirname) sets it to the absolute path on our operating system to this project folder. In this case it's the 'routes' folder. 
     // So, __dirname is the starting path in the routes folder, '../ means go up a folder level, views is the folder we want from that level, and shop.html is the file. That is our path. 'path.join' concatenates the whole path into something like ../views/shop.html and path.join does that automatically.
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});
*****************************/

router.get ('/', (req, res, next) => {
    const products = adminData.products; // this will inject our array values into our template.
    // this response says to render a view using the shop.ejs template file that's the 1st argument. The 2nd argument {} is a javascript object and it's filled with JavaScript wariables.
    // In the JavaScript object we map it to a key name which we can then use in the template to refer to a keyname to refer to the data we are passing in.
    // in the first line we use 'prods' as the keyword for the data from the 'products' const.
    res.render('shop', {
        prods: products, // keyname is 'prods' for the value of our 'products' array. All the rest follow the same syntax.
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0, // checks our 'products' const array and if it's length is greater than 0 that means it has products.
        activeShop: true, // the shop page will be active so our CSS highlights the page link
        productCSS: true
    }); 
});

module.exports = router; // This exports our express module named 'router'. 'router' is a const defined above which holds the 'express.Router()' module.
// This is the route that handles the creation of products which the admin of our shop can do.

const path = require('path'); // require('path') is the 'path' core module in Express. We assign it to the constant names 'path'. It allows us to specify file paths and will even translate them for the users os whether that be Linux or Windows.

const express = require('express'); // Again we require express to be used on this page.

const rootDir = require('../util/path'); // The constant 'rootDir' is enabled by the 'path.js' file found in the 'util' folder. We use it to specify our root directory.

const router = express.Router(); // We create the router constant to hold the 'express.Router()' function. Router() is an Express function that routes things.

const products = []; // This will be our products array. The const is the array itself which means we can add and delete elements inside the array.

// you always have to have the more specific middleware (i.e. '/add-product') before the less specific middleware (i.e. '/') because '/' will be true on all path requests.
// since we defined the 'router' const above, we now use 'router.use' instead of 'app.use'. Also the same arguments can be used such as 'use', 'post', 'get' or others.
// since we only want to use 'get' requests in this first one we use 'router.get'.
// The implied path for the following line is '/admin/add-product => GET' because we added the /admin path on the app.js page.
router.get('/add-product', (req, res, next) => {
    // res.render tells router.get to render our 'add-product.ejs' page. Then it gives it a JavaScript object filled with keynames that have data assigned to them.
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product', // this is the path the user types in the browser address
        formsCSS: true, // uses the CSS for forms
        productCSS: true, // uses the CSS for product
        activeAddProduct: true // when on this page the link in nav shows as active
    });
});

// we use 'app.post' instead of 'app.use' because 'app.post' will only parse post requests. 'app.use' will parse both 'get' and 'post' requests. You can also use 'app.get' to parse only 'get' requests.
// The implied path for the following line is '/admin/add-product => POST' because we added the /admin path on the app.js page.
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title, price: req.body.price, desc: req.body.desc}); // this will push a new object into the array. It puts the 'title' into the array and it pulls it from the 'reqested' 'body' from the 'title' field of said 'body'.
    console.log(products); // lets me see in the console what is in the array.
    res.redirect('/'); // this redirects the user to '/' after extracting their input. redirect() is a built-in express function.
});

// The following two lines uses the express module 'exports' to export our 'router' and 'products' constants defined above.
exports.routes = router;
exports.products = products;